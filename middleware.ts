import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.next()
  }

  // NextRequest.cookies.getAll() -> [{ name, value }]
  const getAll = () => req.cookies.getAll().map((c) => ({ name: c.name, value: c.value }))

  // setAll은 미들웨어 환경에서는 기본적으로 noop으로 둔다.
  const setAll = async (_cookies: Array<{ name: string; value: string; options?: any }>) => {
    // no-op: middleware에서 쿠키 설정은 제한적이므로 여기서는 처리하지 않습니다.
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, { cookies: { getAll, setAll } })

  // 현재 사용자 확인
  const { data } = await supabase.auth.getUser()
  const user = data?.user ?? null

  const { pathname } = req.nextUrl

  // 보호 경로 검사
  const protectPostNew = pathname === '/posts/new'

  if (protectPostNew && !user) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/posts/new'],
}
