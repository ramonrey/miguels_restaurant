// Single source of truth for NAP, hours, and business metadata.
// Used by BaseLayout (SEO/JSON-LD), Header, Footer, and the Contact page.

export interface DayHours {
  day: string;
  /** null = closed */
  open: string | null;
  close: string | null;
}

export const business = {
  name: "Miguel's Mexican Dining",
  shortName: "Miguel's",
  legalName: "Miguel's Mexican Dining",
  tagline: 'Family-owned Mexican cocina in Stockton since 1985',
  foundedYear: 1985,
  description:
    "Family-owned since 1985, Miguel's Mexican Dining serves scratch-made Mexican cocina, generous combo plates, and a full bar in Stockton, California.",
  cuisine: 'Mexican',
  priceRange: '$$',

  address: {
    street: '7555 Pacific Ave, Suite 135',
    city: 'Stockton',
    state: 'CA',
    zip: '95207',
    country: 'US',
  },

  // Approximate (city-corridor level) coordinates for Pacific Ave, Stockton CA.
  // TODO: replace with the exact rooftop geocode for 7555 Pacific Ave Suite 135
  // (e.g. via Google Maps > right-click > coordinates) before relying on this
  // for anything beyond a soft JSON-LD hint.
  geo: {
    lat: 38.0011,
    lng: -121.3222,
  },

  phone: {
    display: '(209) 208-2200',
    e164: '+12092082200',
  },

  email: null as string | null,

  hours: [
    { day: 'Sunday', open: '08:00', close: '20:00' },
    { day: 'Monday', open: '10:00', close: '20:00' },
    { day: 'Tuesday', open: '10:00', close: '20:00' },
    { day: 'Wednesday', open: '10:00', close: '20:00' },
    { day: 'Thursday', open: '10:00', close: '20:00' },
    { day: 'Friday', open: '10:00', close: '21:00' },
    { day: 'Saturday', open: '08:00', close: '21:00' },
  ] satisfies DayHours[],

  amenities: [
    'Full bar — beer, wine & margaritas',
    'Dine-in, takeout & delivery',
    'Wheelchair accessible',
    'Family-owned & operated since 1985',
  ],

  // Live 3rd-party ordering widget already running on the current site.
  // We link out to it rather than rebuilding checkout/payments.
  orderOnlineUrl: 'https://miguelsmexicandiningca.com/miguels-mexican-dining/',

  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Miguel%27s+Mexican+Dining+7555+Pacific+Ave+Suite+135+Stockton+CA+95207',
  mapsEmbedSrc:
    'https://www.google.com/maps?q=7555+Pacific+Ave+Suite+135,+Stockton,+CA+95207&output=embed',

  social: {
    facebook: 'https://www.facebook.com/MiguelsMexicanDining/',
    instagram: null as string | null,
  },

  // Contact form endpoint — swap in a real Formspree (or equivalent) form ID.
  // Sign up free at https://formspree.io, create a form, and replace YOUR_FORM_ID.
  formEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',
} as const;

export function formatHoursLabel(hours: DayHours): string {
  if (!hours.open || !hours.close) return 'Closed';
  return `${to12h(hours.open)} – ${to12h(hours.close)}`;
}

function to12h(time: string): string {
  const [hStr, mStr] = time.split(':');
  const h = Number(hStr);
  const period = h >= 12 ? 'pm' : 'am';
  const displayHour = h % 12 === 0 ? 12 : h % 12;
  return mStr === '00' ? `${displayHour}${period}` : `${displayHour}:${mStr}${period}`;
}
