-- my-first-web: PostgreSQL schema (recommended)
-- Requires pgcrypto for gen_random_uuid()

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- users (authors)
-- Note: For Supabase it's common to use `auth.users` for authentication
-- and a separate `profiles` table to store user metadata. Below we
-- provide a `profiles` table and keep a `users` table example for
-- non-Supabase setups.

-- profiles (recommended for Supabase projects)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT,
  avatar_url TEXT,
  role TEXT
);

-- legacy users example (kept for reference)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  role VARCHAR(50) NOT NULL DEFAULT 'author',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- posts
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- comments (optional)
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_name VARCHAR(255),
  author_email VARCHAR(255),
  content TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- tags + join table for many-to-many
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS post_tags (
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Indexes
-- Indexes (simple)
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);

-- SELECT p.* FROM posts p JOIN users u ON p.user_id = u.id WHERE u.email = 'author@example.com';
-- - Use transactions when creating posts + tags + post_tags to ensure consistency.
