export type HolidayPackage = {
  id: string;
  title: string;
  category: 'custom' | 'group';
  image: string;
  description: string;
  href: string;
};

export const holidayPackages: HolidayPackage[] = [
  {
    id: 'dubai',
    title: 'Dubai',
    category: 'custom',
    image: 'holiday-dubai',
    description: 'Experience the glitz and glamour of the city of gold.',
    href: '/holiday-packages/dubai'
  },
  {
    id: 'thailand',
    title: 'Thailand',
    category: 'custom',
    image: 'holiday-thailand',
    description: 'Explore tropical beaches, opulent palaces and ancient ruins.',
    href: '/holiday-packages/thailand'
  },
  {
    id: 'europe',
    title: 'Europe',
    category: 'custom',
    image: 'holiday-europe',
    description: 'Discover the rich history, art, and culture of the old continent.',
    href: '/holiday-packages/europe'
  },
  {
    id: 'maldives',
    title: 'Maldives',
    category: 'custom',
    image: 'holiday-maldives',
    description: 'Relax in paradise with overwater bungalows and turquoise lagoons.',
    href: '/holiday-packages/maldives'
  },
  {
    id: 'singapore',
    title: 'Singapore',
    category: 'custom',
    image: 'holiday-singapore',
    description: 'A vibrant city-state with a blend of Asian and European cultures.',
    href: '/holiday-packages/singapore'
  },
  {
    id: 'turkey',
    title: 'Turkey',
    category: 'custom',
    image: 'holiday-turkey',
    description: 'Where east meets west, a land of ancient wonders and vibrant bazaars.',
    href: '/holiday-packages/turkey'
  },
  {
    id: 'driving-tours',
    title: 'Your Driving Tours',
    category: 'group',
    image: 'driving-tours-promo',
    description: 'Curated self-drive and guided adventures around the world.',
    href: '/tours'
  },
  {
    id: 'jordan-group',
    title: 'Jordan Group Tours',
    category: 'group',
    image: 'expedition-jordan',
    description: 'Join a group to explore the ancient wonders of Jordan.',
    href: '/holiday-packages/jordan-group'
  },
  {
    id: 'europe-group',
    title: 'Europe Group Packages',
    category: 'group',
    image: 'holiday-europe',
    description: 'Discover Europe with like-minded travellers on a guided tour.',
    href: '/holiday-packages/europe-group'
  }
];
