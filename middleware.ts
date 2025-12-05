import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  console.log('Middleware running for:', pathname)
  console.log('Token found:', !!token)

  // List of auth paths - logged-in users should be redirected away
  const authPaths = ['/sign-in', '/sign-up', '/forgot-password', '/reset-password', '/verify-code']

  // Check if current path is an auth path
  const isAuthPath = authPaths.some(path => pathname === path || pathname.startsWith(path + '/'))

  if (token && isAuthPath) {
    console.log('Redirecting authenticated user away from auth page')
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/sign-in/:path*',
    '/sign-up/:path*',
    '/forgot-password/:path*',
    '/reset-password/:path*',
    '/verify-code/:path*'
  ],
}
