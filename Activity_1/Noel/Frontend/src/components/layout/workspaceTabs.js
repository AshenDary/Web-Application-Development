import { PixelCart, PixelClipboard, PixelFile, PixelFlame, PixelFolder, PixelGear } from '../ui/PixelIcons';
import PixelStar from '../ui/PixelStar';

export const workspaceTabs = {
  marketplace: { title: 'Marketplace', icon: PixelFolder },
  'hot-drops': { title: 'Hot Drops', icon: PixelFlame },
  rewards: { title: 'Rewards', icon: PixelStar },
  cart: { title: 'Shopping Cart', icon: PixelCart },
  products: { title: 'Product Details', icon: PixelFile },
  orders: { title: 'Transfers', icon: PixelClipboard },
  admin: { title: 'Admin Console', icon: PixelGear },
};
