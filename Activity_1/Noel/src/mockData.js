export const navLinks = ['Marketplace', 'Hot Drops', 'Vault', 'Rewards'];

export const userProfile = {
  name: 'Nyx Voss',
  streetCred: 18450,
  lootBagCount: 3,
};

export const categories = [
  { id: 'tech', name: 'Tech', accent: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30' },
  { id: 'art', name: 'Art', accent: 'bg-violet-500/15 text-violet-300 border-violet-400/30' },
  { id: 'jewelry', name: 'Jewelry', accent: 'bg-pink-500/15 text-pink-300 border-pink-400/30' },
  { id: 'classified', name: 'Classified', accent: 'bg-red-500/15 text-red-300 border-red-400/30' },
];

export const featuredDeals = [
  {
    id: 'deal-1',
    title: 'Bespoke Cartier Shadow',
    subtitle: 'Backdoor private sale',
    price: '$4,200',
    badge: 'Hot Drop',
    accent: 'from-emerald-500/30 via-emerald-500/10 to-transparent',
  },
  {
    id: 'deal-2',
    title: 'Ghost-Phone X9',
    subtitle: 'Scrubbed and silent',
    price: '$2,980',
    badge: 'Flash Buy',
    accent: 'from-violet-500/30 via-violet-500/10 to-transparent',
  },
  {
    id: 'deal-3',
    title: 'Midnight Monalisa',
    subtitle: 'Collector-grade forgery',
    price: '$8,400',
    badge: 'Rare',
    accent: 'from-red-500/30 via-red-500/10 to-transparent',
  },
];

export const products = [
  {
    id: 'prod-1',
    name: 'Rolex Submariner',
    category: 'Jewelry',
    streetPrice: 4200,
    marketValue: 6800,
    heat: 78,
    rarity: 'High',
    status: 'Available',
    description: 'Unregistered, polished, and quietly expensive.',
    accent: 'from-amber-500/40 via-orange-500/20 to-transparent',
  },
  {
    id: 'prod-2',
    name: 'Ghost-Phone X9',
    category: 'Tech',
    streetPrice: 2980,
    marketValue: 5400,
    heat: 92,
    rarity: 'Ultra',
    status: 'Hot',
    description: 'Zero trace, dual SIM, and a very convincing lie.',
    accent: 'from-emerald-500/40 via-cyan-500/20 to-transparent',
  },
  {
    id: 'prod-3',
    name: 'Holo-Lantern Drake',
    category: 'Art',
    streetPrice: 3150,
    marketValue: 6200,
    heat: 64,
    rarity: 'Rare',
    status: 'Fresh',
    description: 'Custom art theft with a surprisingly clean chain.',
    accent: 'from-violet-500/40 via-fuchsia-500/20 to-transparent',
  },
  {
    id: 'prod-4',
    name: 'Night Ledger Vault',
    category: 'Classified',
    streetPrice: 9800,
    marketValue: 14300,
    heat: 96,
    rarity: 'Legend',
    status: 'Priority',
    description: 'A briefcase of secrets and several very nervous clients.',
    accent: 'from-red-500/40 via-rose-500/20 to-transparent',
  },
  {
    id: 'prod-5',
    name: 'Pearl Cut Diamond Set',
    category: 'Jewelry',
    streetPrice: 5600,
    marketValue: 9150,
    heat: 73,
    rarity: 'High',
    status: 'Limited',
    description: 'A matched set that glimmers in the wrong light.',
    accent: 'from-pink-500/40 via-purple-500/20 to-transparent',
  },
  {
    id: 'prod-6',
    name: 'Obsidian Drone Mk.2',
    category: 'Tech',
    streetPrice: 5100,
    marketValue: 7600,
    heat: 88,
    rarity: 'Ultra',
    status: 'Hot',
    description: 'Stealth flyer with an excellent escape route.',
    accent: 'from-cyan-500/40 via-emerald-500/20 to-transparent',
  },
];

export const rewards = [
  {
    id: 'badge-1',
    name: 'Master Pickpocket',
    points: 1250,
    unlocked: true,
    description: 'Handled 250 clean swaps.',
  },
  {
    id: 'badge-2',
    name: 'Art Connoisseur',
    points: 2600,
    unlocked: true,
    description: 'Curated 20 rare masterpieces.',
  },
  {
    id: 'badge-3',
    name: 'Untraceable',
    points: 4200,
    unlocked: false,
    description: 'Complete 12 silent transactions.',
  },
  {
    id: 'badge-4',
    name: 'Crowd Favorite',
    points: 3100,
    unlocked: false,
    description: 'Keep your inventory moving fast.',
  },
];
