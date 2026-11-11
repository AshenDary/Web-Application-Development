import { Bell, Search, ShoppingBag, UserRound } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView }) {
  const links = ['Marketplace', 'Hot Drops', 'Vault', 'Rewards'];

  return (
    <header className="border-b border-emerald-500/40 bg-black/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border border-emerald-500/50 bg-emerald-500/10 text-sm font-bold text-emerald-300">
            S
          </div>
          <div className="leading-none">
            <p className="text-[10px] uppercase tracking-[0.35em] text-emerald-300">STASH</p>
            <p className="mt-1 text-xs text-zinc-300">Black Market Exchange</p>
          </div>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const normalized = link.toLowerCase().replace(/\s+/g, '');
            const active = currentView === normalized || (currentView === 'marketplace' && link === 'Marketplace');

            return (
              <button
                key={link}
                onClick={() => setCurrentView(normalized)}
                className={`border px-3 py-2 text-[11px] uppercase tracking-[0.2em] transition ${
                  active
                    ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-200'
                }`}
              >
                {link}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="flex h-9 w-9 items-center justify-center border border-zinc-800 bg-zinc-950 text-zinc-200 transition hover:border-emerald-500/50 hover:text-emerald-300">
            <Search className="h-4 w-4" />
          </button>

          <button className="relative flex h-9 w-9 items-center justify-center border border-zinc-800 bg-zinc-950 text-zinc-200 transition hover:border-red-500/60 hover:text-red-300">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-none bg-red-600 px-1 text-[9px] font-bold text-white">
              3
            </span>
          </button>

          <button
            onClick={() => setCurrentView('lootbag')}
            className="flex items-center gap-2 border border-emerald-500/50 bg-emerald-500/10 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-emerald-200 transition hover:bg-emerald-500/15"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Loot Bag</span>
            <span className="flex h-5 min-w-5 items-center justify-center border border-emerald-400 bg-emerald-300 px-1 text-[9px] font-bold text-black">
              3
            </span>
          </button>

          <div className="flex items-center gap-2 border border-violet-500/40 bg-violet-500/10 px-2 py-1.5 text-left">
            <div className="flex h-8 w-8 items-center justify-center border border-violet-400/50 bg-zinc-950 text-[10px] font-bold text-violet-200">
              NV
            </div>
            <div className="leading-tight">
              <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-400">CRED</p>
              <p className="text-xs font-bold text-zinc-100">18,450</p>
            </div>
            <UserRound className="h-4 w-4 text-zinc-300" />
          </div>
        </div>
      </div>
    </header>
  );
}
