import { NextResponse } from 'next/server';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // --- Site-wide password gate ---
  const sitePassword = process.env.SITE_PASSWORD;
  if (sitePassword) {
    const isAllowed =
      pathname === '/site-login' ||
      pathname === '/api/site-auth' ||
      pathname.startsWith('/_next') ||
      pathname.startsWith('/favicon') ||
      pathname === '/socait.ico' ||
      pathname === '/manifest.json' ||
      pathname === '/robots.txt' ||
      /\.(png|jpg|jpeg|gif|svg|ico|webp|avif|css|js|woff|woff2|ttf)$/.test(pathname);

    if (!isAllowed) {
      const siteAuthCookie = request.cookies.get('site_auth')?.value;
      if (siteAuthCookie !== sitePassword) {
        return NextResponse.redirect(new URL('/site-login', request.url));
      }
    }
    // No early return here: the admin checks below must still run when the
    // site password is set.
  }

  // --- Admin-only auth ---
  const isAdminPage = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');

  if (isAdminPage || isAdminApi) {
    const hostname = request.nextUrl.hostname;
    const isLocalRequest = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';

    if (!isLocalRequest) {
      if (isAdminApi) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      return NextResponse.redirect(new URL('/', request.url));
    }

    const isLoginRoute = pathname === '/admin/login' || pathname === '/api/admin/auth';
    const isProduction = process.env.NODE_ENV === 'production';
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!isLoginRoute && isProduction && adminPassword) {
      const authCookie = request.cookies.get('admin_auth')?.value;
      const authHeader = request.headers.get('x-admin-password');
      const isAuthenticated = authCookie === adminPassword || authHeader === adminPassword;

      if (!isAuthenticated) {
        if (isAdminApi) {
          return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
  }

  const response = NextResponse.next();
  if (sitePassword) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|socait.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif|css|js|woff|woff2|ttf)$).*)',
  ],
};
