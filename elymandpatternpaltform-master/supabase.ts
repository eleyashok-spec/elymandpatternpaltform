
import { createClient } from '@supabase/supabase-js';

// If you are using your own Supabase project, replace these strings with your Project URL and Anon Key 
// found in Project Settings > API.
const supabaseUrl = process.env.SUPABASE_URL || 'https://bynyerbadascsbdrjgdn.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5bnllcmJhZGFzY3NiZHJqZ2RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNTA2OTgsImV4cCI6MjA4NDcyNjY5OH0.L4uifpnj0oclBMeiMrpgDl0SAPAChvFqSTdtBLJQNk8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
