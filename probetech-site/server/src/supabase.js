import { createClient } from "@supabase/supabase-js";

// Uses the SERVICE ROLE key — server-side only, never expose this in frontend code.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let client = null;

if (supabaseUrl && supabaseKey) {
  client = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn("⚠️  SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing — storage disabled until set.");
}

// Always export a usable object. If Supabase isn't configured, calls return a
// clear error instead of crashing the whole server at startup.
export const supabase = client || {
  from() {
    return {
      insert: async () => ({ error: { message: "Supabase not configured" } }),
    };
  },
};

export const supabaseReady = Boolean(client);
