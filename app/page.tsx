export default function Home() {
  const posts = [
    {
      id: 1,
      title: "첫 번째 블로그 포스트",
      preview: "이것은 첫 번째 블로그 포스트의 내용 미리보기입니다. 더 자세한 내용은 전체 게시글을 확인해주세요.",
      author: "신현준",
      date: "2025-01-01",
    },
    {
      id: 2,
      title: "Next.js 시작하기",
      preview: "Next.js를 처음 시작하는 개발자를 위한 기초 가이드입니다. 이 포스트에서는 프로젝트 설정부터 기본 개념까지 다룹니다.",
      author: "신현준",
      date: "2025-01-05",
    },
    {
      id: 3,
      title: "React 컴포넌트 설계 패턴",
      preview: "효율적인 React 컴포넌트 설계를 위한 다양한 패턴과 모범 사례를 소개합니다. 실무에서 자주 사용되는 기법들을 정리했습니다.",
      author: "신현준",
      date: "2025-01-10",
    },
  ];

  return (
    <>
      <header className="border-b border-gray-200 mb-8">
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-4xl font-bold mb-4">My Blog</h1>
          <nav>
            <ul className="flex gap-6">
              <li><a href="/" className="text-blue-600 hover:text-blue-800">홈</a></li>
              <li><a href="/about" className="text-blue-600 hover:text-blue-800">소개</a></li>
              <li><a href="/contact" className="text-blue-600 hover:text-blue-800">연락처</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <h2 className="text-lg font-bold mb-3">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.preview}</p>
              <div className="flex justify-between items-center">
                <span className="font-medium">{post.author}</span>
                <span className="text-sm text-gray-400">{post.date}</span>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-8 py-6">
        <div className="max-w-4xl mx-auto p-4">
          <p className="text-center text-gray-600">&copy; 2025 My Blog. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
