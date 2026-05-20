import { getPosts } from "@/lib/posts";
import PostList from "@/components/PostList";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">블로그 포스트</h1>
          <p className="text-gray-500 mt-1">Supabase와 함께하는 최신 소식들</p>
        </div>
      </div>
      
      <PostList initialPosts={posts} />
    </div>
  );
}
