
import { createClient } from '@supabase/supabase-js';

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// In development, if the environment variables are not set,
// use dummy values to prevent the app from crashing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials not found. Using placeholder values. ' +
    'Please connect your project to Supabase using the green button in the top right corner.'
  );
  
  // These are placeholder values that allow the Supabase client to initialize
  // They won't connect to any actual Supabase project
  supabaseUrl = 'https://placeholder-project.supabase.co';
  supabaseAnonKey = 'placeholder-key-placeholder-key-placeholder-key';
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
