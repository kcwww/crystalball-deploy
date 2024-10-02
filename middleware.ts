import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/auth/signin')) {
    return NextResponse.redirect(new URL('/', req.url)); // 원하는 경로로 리디렉션
  }

  return NextResponse.next();
}

// matcher 설정
export const config = {
  matcher: ['/api/auth/signin'],
};
