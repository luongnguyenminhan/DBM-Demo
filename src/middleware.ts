import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/', '/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password', '/auth/otp-confirmation', '/registration-complete'];

const isPublicPath = (path: string) => {
  return publicPaths.some(publicPath => 
    path === publicPath || 
    path.startsWith('/api/') || 
    path.startsWith('/_next/') ||
    path.startsWith('/images/') ||
    path.startsWith('/favicon')
  );
};

const isAuthPath = (path: string) => {
  return path.startsWith('/auth/');
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const accessToken = request.cookies.get('access_token')?.value;
  const isAuthenticated = !!accessToken;

  if (
    path.startsWith('/_next/') || 
    path.startsWith('/images/') || 
    path.startsWith('/favicon') ||
    path.match(/\.(png|jpg|jpeg|svg|ico)$/)
  ) {
    return NextResponse.next();
  }
  
  if (isAuthenticated && isAuthPath(path)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  if (!isAuthenticated) {
    if (!isPublicPath(path) && !isAuthPath(path)) {
      const redirectUrl = new URL('/auth/login', request.url);
      redirectUrl.searchParams.set('from', path);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
};
