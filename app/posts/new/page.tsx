"use client";

import PostForm from "@/components/PostForm";

export default function NewPostPage() {
  return (
    <main className="py-12">
      <h1 className="text-3xl font-bold mb-6">새 게시글 작성</h1>
      <PostForm />
    </main>
  );
}
