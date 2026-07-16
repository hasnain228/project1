-- Create a public profiles table linked to system user accounts
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  full_name TEXT,
  avatar_url TEXT,
  billing_tier TEXT DEFAULT 'free'
);

-- Enable Row-Level Security explicitly for the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Define access policies using secure execution contexts
CREATE POLICY "Allow public read access to profiles" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Allow individual users update access to own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Create a secure PostgreSQL function to handle automatic user registration profiling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, billing_tier)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    'free'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind the trigger execution to your Supabase Authentication layer events
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();