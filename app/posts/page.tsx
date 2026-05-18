import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string | null;
  user_id: string | null;
};

export default async function PostsPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return <div className="py-6">환경변수가 설정되어 있지 않습니다.</div>;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase
      .from<Post>("posts")
      .select("id, title, content, created_at, user_id")
      .order("created_at", { ascending: false });

    if (error) {
      return <div className="py-6">오류: {error.message}</div>;
    }

    if (!data || data.length === 0) {
      return <div className="py-6">게시글이 없습니다.</div>;
    }

    return (
      <div className="py-6">
        <ul className="space-y-4">
          {data.map((p) => (
            <li key={p.id} className="p-4 border rounded">
              <Link href={`/posts/${p.id}`} className="text-lg font-semibold text-blue-600 hover:underline">
                {p.title}
              </Link>
              <div className="text-sm text-gray-600">{p.created_at ? new Date(p.created_at).toLocaleDateString() : ""}</div>
              <p className="mt-2 text-gray-700 line-clamp-3">{p.content}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (e: any) {
    return <div className="py-6">오류가 발생했습니다.</div>;
  }
}
