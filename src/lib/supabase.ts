import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Production-ready, client-side safe data accessor client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
