import PostList from "@/components/PostList";
import { getPosts } from "@/lib/posts";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="py-6">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">게시글 목록</h1>
        <p className="text-gray-500 text-lg">새로운 이야기들을 찾아보세요.</p>
      </header>
      
      <PostList initialPosts={posts} />
    </div>
  );
}
