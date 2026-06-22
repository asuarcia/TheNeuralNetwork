/* eslint-disable @typescript-eslint/no-explicit-any */
// Lazy, single-instance Pyodide loader. Pyodide (~6MB) is fetched from the CDN
// on first use and reused for the rest of the session. Browser-only module.

const PYODIDE_VERSION = "v0.27.7";
const INDEX_URL = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`;
// SHA-384 of pyodide.js at the pinned version above. Recompute when upgrading:
// PowerShell: (Invoke-WebRequest <url>).Content | SHA-384 → base64
const PYODIDE_JS_INTEGRITY = "sha384-90so5tCKvl0xs9agU29IMKlAVzhfzFX7QO//YxQkRhJG58bBZrFN+2ZTRB026X5X";

let pyodidePromise: Promise<any> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-pyodide]`)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.integrity = PYODIDE_JS_INTEGRITY;
    script.crossOrigin = "anonymous";
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
