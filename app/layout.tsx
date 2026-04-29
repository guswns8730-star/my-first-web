import "./globals.css";
import Link from "next/link";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "내 블로그",
  description: "간단한 소개 문구",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={cn("font-sans", geist.variable)}>
      <body className="flex flex-col min-h-screen">
        <nav className="bg-gray-800 text-white p-4 sticky top-0 shadow-md z-10 text-sm md:text-base">
          <div className="max-w-screen-md mx-auto flex items-center justify-between">
            <Link href="/" className="font-bold text-xl tracking-tight hover:text-gray-300 transition-colors">
              내 블로그
            </Link>
            <div className="flex items-center gap-6 font-medium">
              <Link href="/" className="hover:text-gray-300 transition-colors">
                홈
              </Link>
              <Link href="/posts" className="hover:text-gray-300 transition-colors">
                블로그
              </Link>
              <Link href="/posts/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm shadow-sm">
                새 글 쓰기
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-grow max-w-screen-md mx-auto w-full p-6">
          {children}
        </main>
        <footer className="bg-gray-50 border-t border-gray-200 text-center text-gray-500 py-6 text-sm">
          © 2026 내 블로그
        </footer>
      </body>
    </html>
  );
}
