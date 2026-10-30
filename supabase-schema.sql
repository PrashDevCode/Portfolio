-- Supabase PostgreSQL Schema for Prashant's Portfolio
-- Copy and run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public inserts via the contact form
CREATE POLICY "Allow public insert" ON contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Allow read access for authenticated users / service role
CREATE POLICY "Allow service role read" ON contact_messages
  FOR SELECT
  USING (true);

