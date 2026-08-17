import { ROUTE_HOROSCOPE } from '../../screens/App/constants';

export type ZodiacSign = {
  id: number;
  title: string;
  slug: string;
  from: string;
  to: string;
};

export type ZodiacSignUrlPattern = {
  daily: string;
  yearly: string;
};

export const ZODIAC_SIGNS_DATA = [
  {
    id: 1,
    title: 'Widder',
    slug: 'widder',
    from: '21. März',
    to: '19. April',
  },
  {
    id: 2,
    title: 'Stier',
    slug: 'stier',
    from: '20. April',
    to: '20. Mai',
  },
  {
    id: 3,
    title: 'Zwillinge',
    slug: 'zwillinge',
    from: '21. Mai',
    to: '20. Juni',
  },
  {
    id: 4,
    title: 'Krebs',
    slug: 'krebs',
    from: '21. Juni',
    to: '22. Juli',
  },
  {
    id: 5,
    title: 'Löwe',
    slug: 'lowe',
    from: '23. Juli',
    to: '22. August',
  },
  {
    id: 6,
    title: 'Jungfrau',
    slug: 'jungfrau',
    from: '23. August',
    to: '22. September',
  },
  {
    id: 7,
    title: 'Waage',
    slug: 'waage',
    from: '23. September',
    to: '22. Oktober',
  },
  {
    id: 8,
    title: 'Skorpion',
    slug: 'skorpion',
    from: '23. Oktober',
    to: '21. November',
  },
  {
    id: 9,
    title: 'Schütze',
    slug: 'schutze',
    from: '22. November',
    to: '21. Dezember',
  },
  {
    id: 10,
    title: 'Steinbock',
    slug: 'steinbock',
    from: '22. Dezember',
    to: '19. Januar',
  },
  {
    id: 11,
    title: 'Wassermann',
    slug: 'wassermann',
    from: '20. Januar',
    to: '18. Februar',
  },
  {
    id: 12,
    title: 'Fische',
    slug: 'fische',
    from: '19. Februar',
    to: '20. März',
  },
];

export const getZodiacSign = (zodiacSlug: string) => {
  const zodiacSign = ZODIAC_SIGNS_DATA.find(({ slug }) => slug === zodiacSlug);

  return zodiacSign || null;
};

export const getZodiacSignIcon = (slug: string) => {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
};

export const getZodiacSignUrls = (slug = ''): ZodiacSignUrlPattern => {
  return {
    daily: `/${ROUTE_HOROSCOPE}/tageshoroskop/${slug}`,
    yearly: `/${ROUTE_HOROSCOPE}/jahreshoroskop/${slug}`,
  };
};

export default ZODIAC_SIGNS_DATA;
