import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://adcplxhzlytpbjycrxpo.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkY3BseGh6bHl0cGJqeWNyeHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxNDExMzUsImV4cCI6MjA1MjcxNzEzNX0.hh_86hVHkpa5L5wE0GHz54Av8pm6poReuXsRffKekH4"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase