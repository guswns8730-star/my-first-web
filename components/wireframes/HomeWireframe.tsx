"use client";

import Link from "next/link";
import { useState } from "react";
import type { Post } from "@/lib/posts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HomeWireframeProps {
  initialPosts?: Post[];
}

export default function HomeWireframe({ initialPosts = [] }: HomeWireframeProps) {
  const [query, setQuery] = useState("");

  const filtered = initialPosts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) || p.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="py-8">
      <header className="max-w-4xl mx-auto px-4 mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">최신 포스트</h1>
        <p className="text-sm text-muted-foreground mt-1">간결하고 읽기 좋은 포스트들을 확인하세요.</p>
      </header>

      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex gap-3">
            <Input
              placeholder="제목 또는 내용으로 검색"
              value={query}
              onChange={(e: any) => setQuery(e.target.value)}
              className="rounded-xl h-12 shadow-sm"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground bg-gray-50 rounded-2xl border-2 border-dashed">
            검색 결과가 없습니다. 첫 글을 작성해 보세요!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((post) => (
              <Card key={post.id} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group rounded-2xl">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="group-hover:text-blue-600 transition-colors leading-tight">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4">
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {post.content}
                  </p>
                </CardContent>
                <CardFooter className="px-6 py-6 border-t border-gray-50 flex justify-between items-center bg-gray-50/30">
                  <Link href={`/posts/${post.id}`} className="text-sm font-bold text-blue-600 hover:underline">
                    계속 읽기 →
                  </Link>
                  <div className="text-xs text-gray-400 font-medium">
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
