import { ArrowRight, Flame, ShieldAlert, Sparkles } from 'lucide-react';
import { categories, featuredDeals } from '../mockData';

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <section className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(124,255,158,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(185,148,255,0.12),transparent_30%),linear-gradient(135deg,#0d1017_0%,#0b0d13_42%,#111827_100%)] p-6 shadow-neon md:p-8">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:36px_36px]" />

        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-300">
              <Flame className="h-3.5 w-3.5" />
              Live Fence Feed
            </div>

            <h1 className="max-w-xl text-4xl font-black tracking-tight text-white md:text-6xl">
              Hot Items, <span className="text-emerald-300">Literally.</span>
            </h1>

            <p className="mt-4 max-w-lg text-base text-slate-300 md:text-lg">
              Untraceable goods at unbeatable street prices.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_28px_rgba(124,255,158,0.45)] transition duration-200 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(124,255,158,0.6)]">
                Explore the Stash
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

              <button className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-violet-400/40 hover:text-violet-200">
                View Vault
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-violet-400/20 bg-[#0b0d15]/80 p-5 shadow-purple backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-violet-300">Heat Index</p>
              <Sparkles className="h-4 w-4 text-violet-300" />
            </div>

            <div className="space-y-4">
              {[
                { label: 'Front Door', value: 'Low', tone: 'bg-emerald-400' },
                { label: 'Stolen Gold', value: 'Medium', tone: 'bg-violet-400' },
                { label: 'Luxury Art', value: 'High', tone: 'bg-red-500' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
                    <span>{item.label}</span>
                    <span className="text-white">{item.value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full ${item.tone}`}
                      style={{ width: item.label === 'Front Door' ? '35%' : item.label === 'Stolen Gold' ? '62%' : '86%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-red-400" />
            <h2 className="text-xl font-bold text-white">Fence Radar</h2>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Daily Deals</span>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featuredDeals.map((deal) => (
            <article
              key={deal.id}
              className="group min-w-[270px] flex-1 rounded-3xl border border-white/10 bg-[#101722]/90 p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-neon"
            >
              <div className={`mb-5 rounded-2xl border border-white/10 bg-gradient-to-br ${deal.accent} p-4`}>
                <div className="mb-8 flex items-center justify-between">
                  <span className="rounded-full border border-red-400/30 bg-red-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-red-300">
                    {deal.badge}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-300">High Heat</span>
                </div>

                <div className="h-20 rounded-xl border border-white/10 bg-black/20" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">{deal.title}</h3>
                <p className="text-sm text-slate-400">{deal.subtitle}</p>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-2xl font-black text-emerald-300">{deal.price}</span>
                <button className="rounded-full border border-red-400/40 bg-red-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-300 transition hover:bg-red-500/15">
                  Grab it
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Black Market Categories</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Curated</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className="group rounded-2xl border border-violet-400/20 bg-[#0f1220]/80 p-4 text-left transition duration-200 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-purple"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/10 text-violet-200">
                <Sparkles className="h-5 w-5" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-white">{category.name}</span>
                <ArrowRight className="h-4 w-4 text-violet-300 transition group-hover:translate-x-1" />
              </div>

              <p className="mt-3 text-sm text-slate-400">Fresh stash, clean handoff, zero noise.</p>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
