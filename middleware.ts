import { NextRequest, NextResponse } from 'next/server';

// Returns 410 Gone for legacy URLs that linger in Google's index from the
// pre-Next.js WordPress site. 410 tells Google to drop them faster than 404.
const LEGACY_PATTERNS: RegExp[] = [
  /\.phtml$/i,
  /^\/author(\/|$)/i,
  /^\/attachment(\/|$)/i,
  /^\/category(\/|$)/i,
  /^\/comments\/feed(\/|$)/i,
  /^\/embed(\/|$)/i,
  /^\/wp-(admin|content|includes|json|login)(\/|$)/i,
  /^\/feed(\/|$)/i,
  /^\/page\/\d+(\/|$)/i,
  /^\/rss(\/|$)/i,
  /^\/tag(\/|$)/i,
  /^\/trackback(\/|$)/i,
  /^\/xmlrpc\.php$/i,
  /^\/\d{4}\/\d{2}(?:\/\d{2})?(\/|$)/,
];

const GONE_BODY =
  '<!doctype html><html><head><meta name="robots" content="noindex"><title>Gone</title></head><body><h1>410 Gone</h1><p>This URL is no longer available. <a href="/">Visit the homepage</a>.</p></body></html>';

function goneResponse() {
  return new NextResponse(GONE_BODY, {
    status: 410,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'public, max-age=0, s-maxage=86400',
    },
  });
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (LEGACY_PATTERNS.some((re) => re.test(pathname))) {
    return goneResponse();
  }

  // ?feed=rss / ?feed=atom legacy WP query params
  if (search) {
    const params = new URLSearchParams(search);
    if (
      params.has('attachment_id') ||
      params.has('feed') ||
      params.has('p') ||
      params.has('page_id') ||
      params.has('replytocom') ||
      params.has('rest_route')
    ) {
      return goneResponse();
    }
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next internals + static assets so middleware stays cheap.
  matcher: [
    '/((?!_next/|_vercel/|favicon\\.ico|robots\\.txt|sitemap.*\\.xml|image-sitemap.*\\.xml|manifest\\.json|images/|fonts/).*)',
  ],
};
