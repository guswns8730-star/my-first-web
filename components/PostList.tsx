"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import type { Post } from "@/lib/posts";
import { useAuth } from "@/contexts/AuthContext";

interface PostListProps {
  initialPosts: Post[];
}

export default function PostList({ initialPosts }: PostListProps) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [keyword, setKeyword] = useState("");
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(keyword.toLowerCase()) ||
      post.content.toLowerCase().includes(keyword.toLowerCase())
  );

  const handleDelete = async (id: string, userId: string) => {
    if (!user || user.id !== userId) {
      alert("삭제 권한이 없습니다.");
      return;
    }

    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;

    try {
      setDeletingIds((prev) => new Set(prev).add(id));
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        alert(data?.error || "삭제 중 오류가 발생했습니다.");
        return;
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err) {
      console.error(err);
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setDeletingIds((prev) => {
        const s = new Set(prev);
        s.delete(id);
        return s;
      });
    }
  };

  return (
    <div>
      <SearchBar value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200 animate-in fade-in zoom-in duration-700">
          <div className="text-6xl mb-6">📝</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">아직 작성된 글이 없습니다</h3>
          <p className="text-gray-500 mb-8 max-w-xs text-center">멋진 소식이나 생각을 가장 먼저 공유해 보세요!</p>
          <Link href="/posts/new">
            <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl active:scale-95">
              첫 게시글 작성하기
            </button>
          </Link>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm animate-in fade-in duration-500">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-xl font-medium text-gray-900 mb-2">검색 결과가 없습니다</p>
          <p className="text-gray-500">다른 키워드로 검색해 보시겠어요?</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="border border-gray-200 rounded-2xl p-6 flex flex-col hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-white group relative">
              <div className="flex justify-between items-start mb-3 z-10">
                <Link href={`/posts/${post.id}`} className="block flex-grow pr-4 group-hover:text-blue-600 transition-colors">
                  <h2 className="text-xl font-bold leading-tight">
                    {post.title}
                  </h2>
                </Link>
                {user?.id === post.user_id && (
                  <button
                    onClick={() => handleDelete(post.id, post.user_id)}
                    aria-label="게시글 삭제"
                    title="삭제"
                    className="text-gray-300 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg transition-colors flex-shrink-0"
                  >
                    {deletingIds.has(post.id) ? (
                      <svg className="animate-spin h-4 w-4 text-red-500" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
              
              <Link href={`/posts/${post.id}`} className="flex-grow flex flex-col">
                <p className="text-gray-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
                  {post.content}
                </p>
                <div className="text-sm font-medium text-gray-400 mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
                    {post.profiles?.username || '익명'} · 자세히 보기 →
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
