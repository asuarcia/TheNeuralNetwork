/* eslint-disable @typescript-eslint/no-explicit-any */
// Lazy, single-instance Pyodide loader. Pyodide (~6MB) is fetched from the CDN
// on first use and reused for the rest of the session. Browser-only module.

const PYODIDE_VERSION = "v0.27.7";
const INDEX_URL = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`;

let pyodidePromise: Promise<any> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-pyodide]`)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.dataset.pyodide = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load the Python runtime."));
    document.head.appendChild(script);
  });
}

export function getPyodide(): Promise<any> {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      await loadScript(`${INDEX_URL}pyodide.js`);
      const loader = (globalThis as any).loadPyodide;
      return loader({ indexURL: INDEX_URL });
    })();
  }
  return pyodidePromise;
}

export interface RunResult {
  ok: boolean;
  output: string;
  error?: string;
}

export async function runPython(code: string): Promise<RunResult> {
  const pyodide = await getPyodide();
  let buffer = "";
  const append = (s: string) => {
    buffer += s.endsWith("\n") ? s : s + "\n";
  };
  pyodide.setStdout({ batched: append });
  pyodide.setStderr({ batched: append });

  try {
    // Auto-load any imported packages bundled with Pyodide (e.g. numpy).
    await pyodide.loadPackagesFromImports(code);
    await pyodide.runPythonAsync(code);
    return { ok: true, output: buffer };
  } catch (e: any) {
    return { ok: false, output: buffer, error: String(e?.message ?? e) };
  }
}
