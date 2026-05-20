import Link from "next/link";
import { getPostById } from "@/lib/posts";
import { notFound } from "next/navigation";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await getPostById(id);

  if (!post) {
    return (
      <div className="py-24 text-center flex flex-col items-center">
        <div className="bg-gray-100 p-4 rounded-full mb-6">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">게시글을 찾을 수 없습니다</h1>
        <p className="text-gray-500 mb-8 max-w-xs">삭제되었거나 잘못된 경로일 수 있습니다.</p>
        <Link
          href="/posts"
          className="px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          전체 목록 보기
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-screen-md mx-auto py-12 px-4 animate-in fade-in duration-700">
      <header className="mb-12 pb-8 border-b border-gray-100">
        <Link href="/posts" className="text-blue-600 font-semibold mb-6 inline-block hover:underline">
          ← 블로그 홈
        </Link>
        <h1 className="text-5xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight">{post.title}</h1>
        <div className="flex items-center gap-3 text-gray-500 font-medium">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs">
            {post.profiles?.username?.[0]?.toUpperCase() || "A"}
          </div>
          <span>{post.profiles?.username || "익명"}</span>
          <span className="text-gray-300">•</span>
          <time dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString()}</time>
        </div>
      </header>

      <section className="prose prose-lg prose-blue max-w-none mb-16">
        <div className="whitespace-pre-wrap text-xl text-gray-700 leading-relaxed font-serif">
          {post.content}
        </div>
      </section>

      <footer className="mt-16 pt-10 border-t border-gray-100">
        <div className="bg-gray-50 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-grow text-center md:text-left">
            <h3 className="font-bold text-lg mb-1">작성자: {post.profiles?.username || "익명"}</h3>
            <p className="text-gray-500 text-sm">이 블로그의 소중한 필자입니다.</p>
          </div>
          <Link
            href="/posts"
            className="whitespace-nowrap px-6 py-2 bg-white border border-gray-200 rounded-lg font-bold hover:bg-gray-50 transition shadow-sm"
          >
            모든 글 보기
          </Link>
        </div>
      </footer>
    </article>
  );
}
