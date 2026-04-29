"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import type { Post } from "@/lib/posts";

interface PostListProps {
  initialPosts: Post[];
}

export default function PostList({ initialPosts }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [keyword, setKeyword] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(keyword.toLowerCase()) ||
      post.description.toLowerCase().includes(keyword.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }
  };

  return (
    <div>
      <SearchBar value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">검색어와 일치하는 게시글이 없습니다.</p>
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
                <button
                  onClick={() => handleDelete(post.id)}
                  aria-label="게시글 삭제"
                  title="삭제"
                  className="text-gray-300 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg transition-colors flex-shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              
              <Link href={`/posts/${post.id}`} className="flex-grow flex flex-col">
                <p className="text-gray-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
                  {post.description}
                </p>
                <div className="text-sm font-medium text-gray-400 mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span>{post.date}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
                    자세히 보기 →
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
