import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 응답 객체를 초기화합니다.
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // 쿠키를 request에 먼저 세팅합니다.
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          
          // 그 다음 response를 새로 생성합니다.
          supabaseResponse = NextResponse.next({
            request,
          });
          
          // 생성된 response에도 토큰 등 갱신된 쿠키를 세팅합니다.
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 서버 사이드에서 안전하게 세션을 확인합니다.
  const { data } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isProtectedPath = 
    pathname.startsWith("/posts/new") || 
    pathname.includes("/edit");

  // 유저가 없고 보호된 경로에 접근할 경우 로그인 페이지로 리다이렉트
  if (!data.user && isProtectedPath) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * 모든 요청 경로에 대해 미들웨어를 실행하지만 다음 파일 확장자는 제외:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - svg, png, jpg, jpeg, gif, webp (images)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
