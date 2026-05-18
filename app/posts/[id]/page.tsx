import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string | null;
  user_id: string | null;
};

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="py-20 text-center">환경변수가 설정되어 있지 않습니다.</div>
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from<Post>("posts")
    .select("id, title, content, created_at, user_id")
    .eq("id", id)
    .single();

  if (error || !data) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">게시글을 찾을 수 없습니다.</h1>
        <Link
          href="/posts"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const post = data;

  return (
    <article className="max-w-screen-md py-8">
      <header className="mb-10 pb-6 border-b border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{post.title}</h1>
        <div className="text-gray-500">
          작성일: <time dateTime={post.created_at ?? ""}>{post.created_at ? new Date(post.created_at).toLocaleDateString() : ""}</time>
        </div>
      </header>

      <section className="prose prose-lg prose-gray max-w-none mb-12">
        <p className="text-lg text-gray-700 leading-relaxed">{post.content}</p>
      </section>

      <footer className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
        <Link
          href="/posts"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 border border-gray-200 px-5 py-2.5 rounded-lg transition-colors bg-white font-medium shadow-sm hover:shadow-md"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          목록으로 돌아가기
        </Link>
      </footer>
    </article>
  );
}
