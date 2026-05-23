import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development-only';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Verify against environment variables for simple secure admin login
    const validUsername = process.env.ADMIN_USER || process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (!validUsername || !validPassword) {
      console.error('Admin credentials are not configured in environment variables.');
      return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
    }

    if (username === validUsername && password === validPassword) {
      // Create JWT
      const secret = new TextEncoder().encode(JWT_SECRET);
      const token = await new SignJWT({ role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(secret);

      // Set HTTP-only cookie
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
