
-- ELYMAND PRODUCTION DATABASE SCHEMA (Idempotent Version)

-- 1. TABLES SETUP
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  profile_image TEXT,
  is_suspended BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE UNIQUE,
  subscription_id TEXT,
  plan_name TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'unpaid')),
  current_period_end TIMESTAMP WITH TIME ZONE,
  is_cancelled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS download_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  asset_id TEXT NOT NULL,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('pattern', 'motion')),
  ip TEXT DEFAULT '0.0.0.0',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS patterns (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  status TEXT DEFAULT 'Published',
  thumbnail TEXT,
  download_url TEXT,
  formats TEXT[],
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS motion_videos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  duration TEXT,
  resolution TEXT,
  fps TEXT,
  format TEXT,
  thumbnail TEXT,
  preview_url TEXT,
  download_url TEXT,
  is_looping BOOLEAN DEFAULT TRUE,
  has_alpha BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ENABLE RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE motion_videos ENABLE ROW LEVEL SECURITY;

-- 3. POLICIES CLEANUP & CREATION

-- Patterns Policies
DROP POLICY IF EXISTS "Public patterns access" ON patterns;
CREATE POLICY "Public patterns access" ON patterns FOR SELECT USING (status = 'Published');

DROP POLICY IF EXISTS "Admins can manage patterns" ON patterns;
CREATE POLICY "Admins can manage patterns" ON patterns FOR ALL TO authenticated USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Motion Policies
DROP POLICY IF EXISTS "Public motion access" ON motion_videos;
CREATE POLICY "Public motion access" ON motion_videos FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Admins can manage motion" ON motion_videos;
CREATE POLICY "Admins can manage motion" ON motion_videos FOR ALL TO authenticated USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Profiles Policies
DROP POLICY IF EXISTS "Users view own profile" ON profiles;
CREATE POLICY "Users view own profile" ON profiles FOR SELECT TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users update own profile" ON profiles;
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins view all profiles" ON profiles;
CREATE POLICY "Admins view all profiles" ON profiles FOR SELECT TO authenticated USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

DROP POLICY IF EXISTS "Admins update all profiles" ON profiles;
CREATE POLICY "Admins update all profiles" ON profiles FOR UPDATE TO authenticated USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Subscriptions Policies
DROP POLICY IF EXISTS "Users view own subscription" ON subscriptions;
CREATE POLICY "Users view own subscription" ON subscriptions FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins view all subscriptions" ON subscriptions;
CREATE POLICY "Admins view all subscriptions" ON subscriptions FOR SELECT TO authenticated USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Download Logs Policies
DROP POLICY IF EXISTS "Users view own logs" ON download_logs;
CREATE POLICY "Users view own logs" ON download_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own logs" ON download_logs;
CREATE POLICY "Users insert own logs" ON download_logs FOR INSERT TO authenticated WITH CHECK (
  auth.uid() = user_id AND (SELECT is_suspended FROM profiles WHERE id = auth.uid()) = FALSE
);

DROP POLICY IF EXISTS "Admins view all logs" ON download_logs;
CREATE POLICY "Admins view all logs" ON download_logs FOR SELECT TO authenticated USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- 4. STORAGE POLICIES
-- NOTE: These must be run against storage.objects
DROP POLICY IF EXISTS "Authenticated users can select from masters" ON storage.objects;
CREATE POLICY "Authenticated users can select from masters"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'masters' AND (SELECT is_suspended FROM profiles WHERE id = auth.uid()) = FALSE);

DROP POLICY IF EXISTS "Public access to previews" ON storage.objects;
CREATE POLICY "Public access to previews"
ON storage.objects FOR SELECT USING (bucket_id = 'previews');

-- 5. AUTH TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
