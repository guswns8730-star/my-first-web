export interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
}

export const posts: Post[] = [
  {
    id: "1",
    title: "첫 번째 블로그 포스트",
    description: "Next.js 앱 라우터를 활용한 블로그 만들기 시작!",
    date: "2026-04-06",
  },
  {
    id: "2",
    title: "Tailwind CSS 스타일링",
    description: "Tailwind CSS를 사용하여 아름다운 UI를 빠르게 구축하는 방법.",
    date: "2026-04-07",
  },
  {
    id: "3",
    title: "TypeScript와 함께하는 개발",
    description: "TypeScript를 도입하여 안정적인 프론트엔드 코드 작성하기.",
    date: "2026-04-08",
  },
];

export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=12", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch posts");

    const json = await res.json();
    return json.map((p: any) => ({
      id: p.id.toString(),
      title: p.title,
      description: p.body,
      date: new Date().toISOString().split("T")[0],
    }));
  } catch (error) {
    console.error("getPosts 오류, 로컬 더미 사용:", error);
    return posts;
  }
}

export async function getPostById(id: string): Promise<Post | undefined> {
  // 1) 로컬 더미 확인
  const local = posts.find((p) => p.id === id);
  if (local) return local;

  // 2) 외부 API로 시도
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) return undefined;
    const json = await res.json();
    if (!json || Object.keys(json).length === 0) return undefined;
    return {
      id: json.id.toString(),
      title: json.title,
      description: json.body,
      date: new Date().toISOString().split("T")[0],
    };
  } catch (e) {
    console.error("getPostById 오류:", e);
    return undefined;
  }
}
