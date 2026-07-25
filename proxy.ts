import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// This function can be marked `async` if using `await` inside
export default async function proxy(request: NextRequest) {
    const token = request.cookies.get('session_token')?.value
    const { pathname } = request.nextUrl
    if(!token && pathname.startsWith('/dashboard')){
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if(token && pathname === ('/login')){
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
}
 
export const config = {
  matcher: ['/dashboard/:path*', '/login/:path*']
}