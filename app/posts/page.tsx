import { getPosts } from "@/lib/posts";
import HomeWireframe from "@/components/wireframes/HomeWireframe";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="py-6">
      <HomeWireframe initialPosts={posts} />
    </div>
  );
}
