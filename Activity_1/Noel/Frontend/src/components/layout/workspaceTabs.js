import { PixelCart, PixelClipboard, PixelFile, PixelFlame, PixelFolder, PixelGear, PixelStore } from '../ui/PixelIcons';
import PixelStar from '../ui/PixelStar';

export const workspaceTabs = {
  marketplace: { title: 'Marketplace', icon: PixelFolder },
  'hot-drops': { title: 'Hot Drops', icon: PixelFlame },
  rewards: { title: 'Rewards', icon: PixelStar },
  cart: { title: 'Shopping Cart', icon: PixelCart },
  products: { title: 'Product Details', icon: PixelFile },
  orders: { title: 'My Purchases', icon: PixelClipboard },
  admin: { title: 'Admin Console', icon: PixelGear },
  seller: { title: 'Seller Center', icon: PixelStore },
};
