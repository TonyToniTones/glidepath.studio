import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const auth = request.headers.get('authorization')

  const username = process.env.AUTH_USERNAME || ''
  const password = process.env.AUTH_PASSWORD || ''
  const expectedAuth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')

  if (auth === expectedAuth) {
    return NextResponse.next()
  }

  return new Response('🔒 Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="glidepath.studio"',
    },
  })
}