// Open-redirect guard. Only allow same-origin absolute paths: a single leading
// "/", but not "//" or "/\" (protocol-relative) and not containing a scheme.
// Anything else falls back to the given default. Used wherever a user-supplied
// `next`/redirect target is honored (auth actions + OAuth callback).
export function safeNext(value: unknown, fallback = "/dashboard"): string {
  const v = typeof value === "string" ? value : "";
  return /^\/(?!\/|\\)/.test(v) ? v : fallback;
}
