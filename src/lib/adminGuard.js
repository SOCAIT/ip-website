import { NextResponse } from 'next/server';

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1', '[::1]']);

// Same rules as the admin branch of middleware.js, repeated here so a route
// handler stays safe even if the middleware matcher ever changes.
function denyReason(request) {
  if (!LOCAL_HOSTS.has(request.nextUrl.hostname)) {
    return { status: 404, error: 'Not found' };
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (process.env.NODE_ENV === 'production' && adminPassword) {
    const cookie = request.cookies.get('admin_auth')?.value;
    const header = request.headers.get('x-admin-password');
    if (cookie !== adminPassword && header !== adminPassword) {
      return { status: 401, error: 'Not authenticated' };
    }
  }

  // Browsers always send Origin on cross-site writes, so this stops another
  // website from driving the admin API through a running dev server.
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const origin = request.headers.get('origin');
    if (origin && origin !== request.nextUrl.origin) {
      return { status: 403, error: 'Cross-origin request refused' };
    }
  }

  return null;
}

// Wraps a route handler: rejects non-admin requests and turns thrown errors
// into JSON responses (error.status, default 500).
export function adminRoute(handler) {
  return async (request, context) => {
    const denied = denyReason(request);
    if (denied) {
      return NextResponse.json({ error: denied.error }, { status: denied.status });
    }
    try {
      return await handler(request, context);
    } catch (error) {
      return NextResponse.json(
        { error: error.message || 'Request failed' },
        { status: error.status || 500 }
      );
    }
  };
}

export function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}
