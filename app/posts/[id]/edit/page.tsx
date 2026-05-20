import { getPostById } from "@/lib/posts";
import EditPostForm from "@/components/EditPostForm";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await getPostById(id);

  if (!post) {
    return notFound();
  }

  return (
    <div className="py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <EditPostForm post={post} />
    </div>
  );
}
