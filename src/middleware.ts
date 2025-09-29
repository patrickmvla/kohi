// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const realm = 'kohi-admin'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  // Only protect admin areas
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return NextResponse.next()
  }

  const user = process.env.ADMIN_USER
  const pass = process.env.ADMIN_PASS
  if (!user || !pass) {
    return new NextResponse('Admin disabled: missing ADMIN_USER/ADMIN_PASS', { status: 503 })
  }

  const auth = req.headers.get('authorization') || ''
  const [, encoded] = auth.split(' ')
  if (!encoded) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': `Basic realm="${realm}"` },
    })
  }
  const [u, p] = Buffer.from(encoded, 'base64').toString().split(':')
  if (u !== user || p !== pass) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': `Basic realm="${realm}"` },
    })
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}