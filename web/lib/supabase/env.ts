// Centralized Supabase environment access + a guard so the whole app keeps
// running before real keys are supplied (graceful degradation).

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// True only when both values are present and not the placeholder shipped in
// .env.local. Used everywhere to decide whether auth features are live.
export const isSupabaseConfigured =
  supabaseUrl.length > 0 &&
  supabaseAnonKey.length > 0 &&
  !supabaseUrl.includes("REPLACE_ME") &&
  !supabaseAnonKey.includes("REPLACE_ME");
