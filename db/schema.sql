-- my-first-web: PostgreSQL schema (recommended)
-- Requires pgcrypto for gen_random_uuid()

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- users (authors)
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
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  summary TEXT,
  content JSONB NOT NULL, -- structured content (MD/HTML/AST)
  status VARCHAR(50) NOT NULL DEFAULT 'draft', -- draft | published | archived
  published_at TIMESTAMPTZ,
  cover_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  tsv tsvector
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
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_tsv ON posts USING GIN (tsv);

-- Trigger to populate tsvector for full-text search
CREATE OR REPLACE FUNCTION posts_tsv_trigger() RETURNS trigger AS $$
BEGIN
  NEW.tsv :=
    to_tsvector('simple', coalesce(NEW.title,'') || ' ' || coalesce(NEW.summary,'') || ' ' || coalesce(NEW.content::text,''));
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tsvectorupdate ON posts;
CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE ON posts
FOR EACH ROW EXECUTE PROCEDURE posts_tsv_trigger();

-- Optional: helper to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS set_timestamp ON posts;
CREATE TRIGGER set_timestamp BEFORE UPDATE ON posts
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Sample queries (examples)
-- SELECT * FROM posts WHERE status='published' ORDER BY published_at DESC LIMIT 10;
-- SELECT p.* FROM posts p JOIN users u ON p.author_id = u.id WHERE u.email = 'author@example.com';

-- Notes:
-- - `content` uses JSONB to allow rich editors (MD AST, blocks, or structured HTML).
-- - Use transactions when creating posts + tags + post_tags to ensure consistency.
