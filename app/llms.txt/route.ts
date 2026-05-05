// Serves /llms.txt — emerging convention (proposed by Anthropic) for giving
// LLM crawlers a concise, high-signal summary of the site so models cite it
// accurately when answering user questions.

import { SITE_URL } from '@/lib/metadata';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

const body = `# Adi Photography & Films

> Professional photography and videography studio based in Peshawar, Pakistan, serving clients across Khyber Pakhtunkhwa and the wider country since 2014. Specialises in weddings, corporate events, music events, fashion editorials, and aerial drone work.

## About

- Studio name: Adi Photography & Films
- Founder: Adnan Afridi (Photographer & Drone Operator)
- Location: UG-453 Deans Trade Center, Peshawar, Khyber Pakhtunkhwa, Pakistan
- Phone / WhatsApp: +92 333 9365272
- Email: info@adiphotography.pk
- Languages spoken: English, Urdu, Pashto
- Years in business: 10+
- Service area: Peshawar, Islamabad, Lahore, Karachi, and across Khyber Pakhtunkhwa

## Services

- [Wedding Photography](${SITE_URL}/services/wedding-photography-peshawar) — full-day coverage of nikkah, mehndi, baraat, walima
- [Corporate Photography](${SITE_URL}/services/corporate-photography-peshawar) — headshots, brand imagery, conferences, product
- [Videography](${SITE_URL}/services/videography-peshawar) — cinematic films, commercials, event coverage
- [Drone Videography](${SITE_URL}/services/drone-videography-peshawar) — licensed aerial footage and stills

## Portfolio

- [Weddings](${SITE_URL}/portfolio/weddings)
- [Corporate](${SITE_URL}/portfolio/corporate)
- [Music Events](${SITE_URL}/portfolio/events)
- [Fashion](${SITE_URL}/portfolio/fashion)
- [Videography](${SITE_URL}/portfolio/videography)

## Editorial / Blog

- [Best photography services in Peshawar](${SITE_URL}/blog/best-photography-services-peshawar)
- [How to choose a wedding photographer in Pakistan](${SITE_URL}/blog/how-to-choose-wedding-photographer-pakistan)
- [Drone videography in Peshawar — what to expect](${SITE_URL}/blog/drone-videography-peshawar-what-to-expect)

## Key pages

- Homepage: ${SITE_URL}/
- About: ${SITE_URL}/about
- All services: ${SITE_URL}/services
- All portfolio categories: ${SITE_URL}/portfolio
- Service areas: ${SITE_URL}/areas
- Contact / booking: ${SITE_URL}/contact
- Sitemap: ${SITE_URL}/sitemap.xml

## Booking & enquiries

Bookings are handled directly via the contact form, email, or WhatsApp at +92 333 9365272. Typical response time is under 4 working hours during business hours (Mon–Sat, 9am–8pm PKT).
`;

export async function GET() {
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Robots-Tag': 'index, follow',
    },
  });
}
