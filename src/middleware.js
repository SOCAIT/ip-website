import { NextResponse } from 'next/server';

export function middleware(request) {
  // Protect admin routes in production
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    // Check if we're in production
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction) {
      // Check for admin password in environment variable
      const adminPassword = process.env.ADMIN_PASSWORD;
      
      // Get password from cookie or header
      const authCookie = request.cookies.get('admin_auth')?.value;
      const authHeader = request.headers.get('x-admin-password');
      
      // If no password is set in env, allow access (for development)
      if (!adminPassword) {
        return NextResponse.next();
      }
      
      // Check if authenticated
      const isAuthenticated = authCookie === adminPassword || authHeader === adminPassword;
      
      if (!isAuthenticated) {
        // Redirect to login page
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

