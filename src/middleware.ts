import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Paths that don't require authentication
const publicPaths = ['/', '/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password', '/auth/otp-confirmation', '/registration-complete'];

// Function to check if a path is public
const isPublicPath = (path: string) => {
  return publicPaths.some(publicPath => 
    path === publicPath || 
    path.startsWith('/api/') || 
    path.startsWith('/_next/') ||
    path.startsWith('/images/') ||
    path.startsWith('/favicon')
  );
};

// Function to check if a path is an auth path
const isAuthPath = (path: string) => {
  return path.startsWith('/auth/');
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check if the user is authenticated by looking for access_token
  const accessToken = request.cookies.get('access_token')?.value;
  const isAuthenticated = !!accessToken;

  // Always allow access to static assets
  if (
    path.startsWith('/_next/') || 
    path.startsWith('/images/') || 
    path.startsWith('/favicon') ||
    path.match(/\.(png|jpg|jpeg|svg|ico)$/)
  ) {
    return NextResponse.next();
  }
  
  // If user is authenticated, prevent access to auth pages
  if (isAuthenticated && isAuthPath(path)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // If user is not authenticated, only allow access to public paths
  if (!isAuthenticated) {
    if (!isPublicPath(path) && !isAuthPath(path)) {
      // Store the intended path to redirect back after login
      const redirectUrl = new URL('/auth/login', request.url);
      redirectUrl.searchParams.set('from', path);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

// Configure matcher to run middleware only on specific paths
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
