import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Production strict hostname allowlist
export const PRODUCTION_ALLOWED_HOSTS = new Set([
  'www.ashifek.in',
  'ashifek.in',
  'lab.ashifek.in',
  'words.ashifek.in',
  'journal.ashifek.in',
]);

// Helper to determine and validate host
function getValidatedHost(rawHost: string | null): string | null {
  if (!rawHost) return null;
  // Normalize hostname: strip port (e.g. :3000) and trim trailing dot
  const host = rawHost.split(':')[0].toLowerCase().replace(/\.$/, '');

  if (process.env.NODE_ENV !== 'production') {
    // Permit local development and loopback addresses
    if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.localhost')) {
      return host;
    }
  }

  if (PRODUCTION_ALLOWED_HOSTS.has(host)) {
    return host;
  }

  return null;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Static asset and internal bypass guard
  // Do NOT intercept or rewrite Next.js internals, API routes, or static files
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/manifest.json' ||
    pathname === '/preview.jpeg' ||
    pathname === '/profile-icon.jpg' ||
    /\.(?:jpg|jpeg|gif|png|webp|svg|ico|css|js|woff|woff2|ttf|eot|pdf|txt|xml|json|mp4|webm)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 2. Strict Hostname Validation
  const rawHost = request.headers.get('host');
  const validatedHost = getValidatedHost(rawHost);

  if (!validatedHost) {
    return new NextResponse('Invalid Host Header', { status: 400 });
  }

  // 3. Security Boundary: Subdomain Admin Lockout
  // Only www.ashifek.in (and apex) may access admin routes, login page, or auth endpoints
  const isMainHost =
    validatedHost === 'www.ashifek.in' ||
    validatedHost === 'ashifek.in' ||
    validatedHost === 'localhost' ||
    validatedHost === '127.0.0.1';

  if (!isMainHost && (pathname.startsWith('/admin') || pathname === '/login')) {
    // Completely hide admin surface from subdomains
    return new NextResponse('Not Found', { status: 404 });
  }

  // 4. Admin JWT Authentication Check (for allowed main hosts)
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (process.env.NODE_ENV === 'production' && !JWT_SECRET) {
      console.error('JWT_SECRET environment variable is not defined in production.');
      return NextResponse.redirect(new URL('/login', request.url));
    }
    const SECRET_KEY = JWT_SECRET || 'fallback-secret-for-development-only';

    try {
      const secret = new TextEncoder().encode(SECRET_KEY);
      await jwtVerify(token, secret);
    } catch {
      // Invalid or expired token — clear the cookie and redirect
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }

    // Authenticated admin on main host
    return NextResponse.next();
  }

  // 5. Hostname-Based Internal Rewrites
  // Construct internal request headers with verified host
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-verified-host', validatedHost);

  // Creative Lab Subdomain (lab.ashifek.in)
  if (validatedHost === 'lab.ashifek.in' || validatedHost === 'lab.localhost') {
    if (pathname === '/' || pathname === '/creative-lab') {
      const targetUrl = new URL(`/creative-lab${request.nextUrl.search}`, request.url);
      return NextResponse.rewrite(targetUrl, {
        request: { headers: requestHeaders },
      });
    }
    // Deep links under lab (e.g., if future nested routes are added)
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // Favorite Words / Lexicon Subdomain (words.ashifek.in)
  if (validatedHost === 'words.ashifek.in' || validatedHost === 'words.localhost') {
    if (pathname === '/' || pathname === '/lexicon') {
      const targetUrl = new URL(`/lexicon${request.nextUrl.search}`, request.url);
      return NextResponse.rewrite(targetUrl, {
        request: { headers: requestHeaders },
      });
    }
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // Engineering Journal Subdomain (journal.ashifek.in)
  if (validatedHost === 'journal.ashifek.in' || validatedHost === 'journal.localhost') {
    // Root journal index
    if (pathname === '/' || pathname === '/blog') {
      const targetUrl = new URL(`/blog${request.nextUrl.search}`, request.url);
      return NextResponse.rewrite(targetUrl, {
        request: { headers: requestHeaders },
      });
    }

    // Article slug requested directly without /blog prefix: /slug -> /blog/slug
    if (!pathname.startsWith('/blog/')) {
      const targetUrl = new URL(`/blog${pathname}${request.nextUrl.search}`, request.url);
      return NextResponse.rewrite(targetUrl, {
        request: { headers: requestHeaders },
      });
    }

    // Article slug requested with /blog prefix: /blog/slug -> pass through to /blog/slug
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // Default: Main Portfolio (www.ashifek.in, ashifek.in, or localhost)
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  // Apply matcher across all application routes, excluding static assets
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|preview.jpeg|profile-icon.jpg|.*\\.(?:jpg|jpeg|gif|png|webp|svg|ico|css|js|woff|woff2|ttf|eot|pdf|txt|xml|json|mp4|webm)$).*)',
  ],
};
