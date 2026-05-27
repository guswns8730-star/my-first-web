-- 1. Row Level Security 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 2. SELECT: 누구나 읽기 가능
CREATE POLICY "Anyone can select posts"
ON posts FOR SELECT
USING (true);

-- 3. INSERT: 로그인한 사용자만 본인의 user_id로 작성 가능
CREATE POLICY "Authenticated users can insert their own posts"
ON posts FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 4. UPDATE: 작성자만 본인의 글을 수정 가능 (수정 후에도 user_id 유지)
CREATE POLICY "Authors can update their own posts"
ON posts FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 5. DELETE: 작성자만 본인의 글을 삭제 가능
CREATE POLICY "Authors can delete their own posts"
ON posts FOR DELETE
USING (auth.uid() = user_id);
