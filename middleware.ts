import { auth } from './src/auth';
import { NextResponse } from 'next/server';

export default auth((req: any) => {
    const isAdminRoute = req.nextUrl.pathname.includes('/admin');

    if (isAdminRoute && !req.auth) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}) as any;

export const config = {
    // Match only internationalized pathnames
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'
    ]
};
