import { next } from '@vercel/functions';

// EU/EEA + UK + Switzerland + Brazil (LGPD)
const CONSENT_REQUIRED_COUNTRIES = new Set([
  // EU member states
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  // EEA (non-EU)
  'IS', 'LI', 'NO',
  // UK
  'GB',
  // Switzerland
  'CH',
  // Brazil (LGPD)
  'BR',
]);

export default function middleware(request: Request) {
  const country = request.headers.get('x-vercel-ip-country') || '';
  const needsConsent = CONSENT_REQUIRED_COUNTRIES.has(country);

  return next({
    headers: {
      'Set-Cookie': `cc_geo=${needsConsent ? '1' : '0'}; Path=/; SameSite=Lax; Secure; Max-Age=86400`,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_astro|_vercel|images|fonts|favicon\\.ico).*)'],
};
