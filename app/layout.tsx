import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";

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
    <html lang="ko">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Header />
          <main className="flex-grow max-w-screen-md mx-auto w-full p-6">
            {children}
          </main>
          <footer className="bg-gray-50 border-t border-gray-200 text-center text-gray-500 py-6 text-sm">
            © 2026 내 블로그
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
