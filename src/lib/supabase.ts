
import { createClient } from '@supabase/supabase-js';

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Log the current environment variables for debugging
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Key is present' : 'Key is missing');

// Ensure we have valid credentials before creating the client
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials not found. Please connect your project to Supabase using the green button in the top right corner.'
  );
  
  // Prevent client creation if credentials are missing
  throw new Error('Supabase credentials are required');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
