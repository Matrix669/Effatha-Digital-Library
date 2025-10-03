import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kvwqbsticvwzbjpcygsw.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2d3Fic3RpY3Z3emJqcGN5Z3N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzOTIxMzQsImV4cCI6MjA3NDk2ODEzNH0.QuekF4xj8hX8hxzL3Nee5Lff8oWIiGHFMttmOb-Vzq8"

// change to env variables
// const supabaseUrl = import.meta.env.SUPABASE_URL
// const supabaseKey = import.meta.env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)
