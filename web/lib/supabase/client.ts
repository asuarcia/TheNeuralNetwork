import { createBrowserClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "./env";

// Browser (Client Component) Supabase client.
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
