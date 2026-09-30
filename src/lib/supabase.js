import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase = null

if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  console.warn('⚠️ Supabase credentials missing or invalid. Auth features disabled.')
  console.warn('Expected VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env')
}

export { supabase }