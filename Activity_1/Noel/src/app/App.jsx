import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Marketplace from '../pages/Marketplace';
import LootBag from '../pages/LootBag';
import Vault from '../pages/Vault';
import Rewards from '../pages/Rewards';

export default function App() {
  const [currentView, setCurrentView] = useState('marketplace');

  const renderView = () => {
    switch (currentView) {
      case 'hotdrops':
        return <Marketplace />;
      case 'vault':
        return <Vault />;
      case 'rewards':
        return <Rewards />;
      case 'lootbag':
        return <LootBag />;
      case 'marketplace':
      default:
        return <Marketplace />;
    }
  };

  return (
    <div className="crt-overlay min-h-screen bg-black text-zinc-100">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">{renderView()}</main>
    </div>
  );
}
