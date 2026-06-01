import PostForm from "@/components/PostForm";
import { getPostById } from "@/lib/posts";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);

  if (!post) {
    return (
      <div className="py-24 text-center">
        <p className="text-lg">게시글을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <main className="py-12">
      <h1 className="text-3xl font-bold mb-6">게시글 수정</h1>
      {/* PostForm will use PUT to /api/posts/[id] when initial.id is provided */}
      <PostForm initial={{ id: post.id, title: post.title, content: post.content }} />
    </main>
  );
}
 
