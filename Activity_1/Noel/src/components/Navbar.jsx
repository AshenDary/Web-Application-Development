import { Bell, ShieldCheck, Search, ShoppingBag, Sparkles } from 'lucide-react';
import { navLinks, userProfile } from '../mockData';

export default function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07090d]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-500/10 shadow-neon">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
            </div>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-emerald-300/90">
                STASH
              </p>
              <p className="text-[10px] text-slate-400">Black Market Exchange</p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
            {navLinks.map((link) => (
              <button
                key={link}
                className="rounded-full px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-emerald-300"
              >
                {link}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-emerald-400/40 hover:text-emerald-300">
              <Search className="h-4 w-4" />
            </button>

            <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-violet-400/40 hover:text-violet-300">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                3
              </span>
            </button>

            <button className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-100 shadow-neon transition hover:scale-[1.02] hover:bg-emerald-500/15">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Loot Bag</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-400 px-1 text-[10px] font-bold text-slate-900">
                {userProfile.lootBagCount}
              </span>
            </button>

            <div className="hidden items-center gap-3 rounded-full border border-violet-400/30 bg-violet-500/10 px-2 py-1.5 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-emerald-300 text-xs font-bold text-slate-950">
                NV
              </div>
              <div className="text-left leading-tight">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Cred</p>
                <p className="text-sm font-semibold text-[#dbe6ff]">{userProfile.streetCred.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="fixed bottom-5 right-5 z-50">
        <div className="group relative">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl" />
          <button className="relative flex h-14 w-14 items-center justify-center rounded-full border border-emerald-300/30 bg-[#111827] text-2xl shadow-neon transition hover:scale-105 hover:shadow-purple">
            🦝
          </button>
          <div className="absolute bottom-16 right-0 hidden w-52 rounded-2xl border border-white/10 bg-[#0b0d15]/95 p-3 text-xs text-slate-200 shadow-2xl group-hover:block">
            <div className="mb-1 flex items-center gap-2 text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              Raccoon whisper
            </div>
            Need to offload some jewelry? I know a buyer with a soft spot for clean gold.
          </div>
        </div>
      </div>
    </>
  );
}
