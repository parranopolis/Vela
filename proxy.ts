import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export default async function proxy(request: NextRequest) {
    const token = request.cookies.get('session_token')?.value
    const { pathname } = request.nextUrl

    if(!token){
      console.log(`Blocked: ${pathname} — no session_token`)
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
}
 
export const config = {
    matcher: ['/dashboard/:path*', '/newentry/:path*', '/allentries/:path*','/userData/:path*','/profile/:path*','/']
}