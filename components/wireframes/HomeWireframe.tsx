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
    p.title.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="py-8">
      <header className="max-w-4xl mx-auto px-4 mb-8">
        <h1 className="text-3xl font-extrabold">최신 포스트</h1>
        <p className="text-sm text-muted-foreground mt-1">간결하고 읽기 좋은 포스트들을 확인하세요.</p>
      </header>

      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <label className="sr-only">검색</label>
          <div className="flex gap-3">
            <Input
              placeholder="제목 또는 내용으로 검색"
              value={query}
              onChange={(e: any) => setQuery(e.target.value)}
              className="rounded-lg"
            />
            <Button onClick={() => {}} className="whitespace-nowrap">검색</Button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">검색 결과가 없습니다.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((post) => (
              <Card key={post.id} className="p-0">
                <CardHeader className="p-4">
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{post.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{post.description}</p>
                </CardContent>
                <CardFooter className="justify-between">
                  <Link href={`/posts/${post.id}`} className="text-sm text-primary hover:underline">
                    읽기
                  </Link>
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
