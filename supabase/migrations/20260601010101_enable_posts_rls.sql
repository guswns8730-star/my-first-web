-- Enable Row Level Security for posts and create policies
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- SELECT: anyone can read posts
DROP POLICY IF EXISTS "Anyone can select posts" ON public.posts;
CREATE POLICY "Anyone can select posts"
ON public.posts FOR SELECT
USING (true);

-- INSERT: authenticated users can insert posts where auth.uid() = user_id
DROP POLICY IF EXISTS "Authenticated users can insert their own posts" ON public.posts;
CREATE POLICY "Authenticated users can insert their own posts"
ON public.posts FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- UPDATE: authors can update their own posts (and must keep user_id)
DROP POLICY IF EXISTS "Authors can update their own posts" ON public.posts;
CREATE POLICY "Authors can update their own posts"
ON public.posts FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- DELETE: authors can delete their own posts
DROP POLICY IF EXISTS "Authors can delete their own posts" ON public.posts;
CREATE POLICY "Authors can delete their own posts"
ON public.posts FOR DELETE
USING (auth.uid() = user_id);
