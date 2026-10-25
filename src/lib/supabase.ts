import { createClient } from '@supabase/supabase-js';

// Vansh Aviation Academy Production Supabase Credentials
// Fallback guarantees 100% cloud sync across laptops, mobile devices, Vercel & GitHub Pages
const DEFAULT_SUPABASE_URL = 'https://iinpblwmxpmveibtfzfd.supabase.co';
const DEFAULT_SUPABASE_KEY = 'sb_publishable_apT0tJD0b7ut2AswvbNn2g_iQgUurIE';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('your-project-id')
);

// Create Supabase client with persistent authentication & auto refresh
export const supabase = createClient(
  supabaseUrl || DEFAULT_SUPABASE_URL,
  supabaseAnonKey || DEFAULT_SUPABASE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
