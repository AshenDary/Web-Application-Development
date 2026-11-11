export const navItems = ['Marketplace', 'Hot Drops', 'Vault', 'Rewards'];

export const categories = ['Tech', 'Art', 'Jewelry', 'Classified'];

export const riskLevels = ['Low', 'Medium', 'High', 'Critical'];

export const products = [
  {
    id: 'p-01',
    image: '/products/ghost-phone.svg',
    name: 'Ghost-Phone X9',
    category: 'Tech',
    price: 2980,
    heat: 92,
    risk: 'Critical',
    status: 'HOT',
    description: 'Clean IMEI, scrubbed storage, zero trace footprint.',
  },
  {
    id: 'p-02',
    image: '/products/midnight-monalisa.svg',
    name: 'Midnight Monalisa',
    category: 'Art',
    price: 8400,
    heat: 76,
    risk: 'High',
    status: 'RARE',
    description: 'Museum-grade fake, perfect for the wrong collector.',
  },
  {
    id: 'p-03',
    image: '/products/rolex-submariner.svg',
    name: 'Rolex Submariner',
    category: 'Jewelry',
    price: 4200,
    heat: 68,
    risk: 'Medium',
    status: 'FRESH',
    description: 'Grey-market bracelet. Polished, quiet, expensive.',
  },
  {
    id: 'p-04',
    image: '/products/night-ledger-vault.svg',
    name: 'Night Ledger Vault',
    category: 'Classified',
    price: 9800,
    heat: 96,
    risk: 'Critical',
    status: 'BLACK',
    description: 'A lacquered case full of names, codes, and debt.',
  },
  {
    id: 'p-05',
    image: '/products/obsidian-drone.svg',
    name: 'Obsidian Drone Mk.2',
    category: 'Tech',
    price: 5100,
    heat: 88,
    risk: 'High',
    status: 'HOT',
    description: 'Stealth aerial scout with an unusually quiet engine.',
  },
  {
    id: 'p-06',
    image: '/products/pearl-diamond-set.svg',
    name: 'Pearl Cut Diamond Set',
    category: 'Jewelry',
    price: 5600,
    heat: 71,
    risk: 'Medium',
    status: 'LIMITED',
    description: 'Glossy, heavy, and impossible to explain at customs.',
  },
];

export const cartItems = [
  { id: 'p-01', name: 'Ghost-Phone X9', quantity: 1, price: 2980 },
  { id: 'p-03', name: 'Rolex Submariner', quantity: 1, price: 4200 },
  { id: 'p-06', name: 'Pearl Cut Diamond Set', quantity: 1, price: 5600 },
];

export const heatVectors = [
  { label: 'Front Door', value: 35, tone: 'bg-emerald-400' },
  { label: 'Stolen Gold', value: 62, tone: 'bg-violet-400' },
  { label: 'Luxury Art', value: 86, tone: 'bg-red-500' },
];

export const rewards = [
  { title: 'Grand Larceny', status: 'UNLOCKED', points: 4200 },
  { title: 'Art Heist', status: 'CLASSIFIED', points: 3100 },
  { title: 'Silent Exit', status: 'UNLOCKED', points: 2500 },
  { title: 'Ghost Network', status: 'SEALED', points: 1800 },
];

export const vaultInventory = [
  { item: 'Ghost-Phone X9', className: 'TECH', location: 'BIN-04', condition: 'ACTIVE' },
  { item: 'Midnight Monalisa', className: 'ART', location: 'LOCKER-12', condition: 'STABLE' },
  { item: 'Rolex Submariner', className: 'JEWELRY', location: 'BIN-07', condition: 'HIDDEN' },
  { item: 'Night Ledger Vault', className: 'CLASSIFIED', location: 'SAFE-02', condition: 'SEALED' },
];
