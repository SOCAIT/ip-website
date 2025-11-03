import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    // If no admin password is set, deny access in production
    if (!adminPassword) {
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { error: 'Admin access not configured' },
          { status: 500 }
        );
      }
      // Allow in development
      return NextResponse.json({ success: true });
    }

    // Check password
    if (password === adminPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

