import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup'

    const token = request.cookies.get('token')?.value || ''

    // authenticated
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }
    // unauthenticated users
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))   
    }
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
    ],
}