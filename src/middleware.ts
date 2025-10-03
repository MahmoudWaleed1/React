import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({req: request})
  if (token?.token) {
    return NextResponse.next()
  }
  else{
    const loginURL = new URL('/auth/login', request.url)
    loginURL.searchParams.set('callbackUrl', request.nextUrl.pathname + request.nextUrl.search)   
    return NextResponse.redirect(loginURL)
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
   matcher: ['/cart', '/allorders'],
}