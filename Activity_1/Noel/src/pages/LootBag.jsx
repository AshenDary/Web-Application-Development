import { cartItems, heatVectors } from '../data/mockData';

export default function LootBag() {
  const totalValue = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const critical = totalValue > 12000;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="border border-zinc-800 bg-zinc-950 p-4">
        <div className="mb-5 border-b border-zinc-800 pb-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-red-400">Laundering Queue</p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-[0.08em] text-zinc-100">Loot Bag</h1>
        </div>

        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3 border border-zinc-800 bg-black p-3">
              <div className="h-16 w-16 border border-zinc-700 bg-zinc-800" />

              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400">ITEM</p>
                <p className="mt-1 text-lg font-bold uppercase text-zinc-100">{item.name}</p>
                <p className="mt-1 font-mono text-sm text-emerald-300">${item.price.toLocaleString()}</p>
              </div>

              <div className="flex items-center gap-2 border border-zinc-700 bg-zinc-950 px-2 py-1">
                <button className="h-7 w-7 border border-zinc-700 bg-black text-lg text-zinc-200">-</button>
                <span className="min-w-5 text-center font-mono text-sm text-zinc-100">{item.quantity}</span>
                <button className="h-7 w-7 border border-zinc-700 bg-black text-lg text-zinc-200">+</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className={`${critical ? 'border-red-500 bg-red-950/80 animate-pulse' : 'border-zinc-800 bg-zinc-950'} p-4`}>
        <div className="mb-5 border-b border-inherit pb-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-red-400">HEAT INDEX</p>
          <h2 className="mt-2 text-2xl font-black uppercase text-zinc-100">Risk Vector</h2>
        </div>

        <div className="space-y-4">
          {heatVectors.map((vector) => (
            <div key={vector.label}>
              <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-zinc-300">
                <span>{vector.label}</span>
                <span>{vector.value}%</span>
              </div>
              <div className="h-2.5 border border-zinc-700 bg-black">
                <div className={`h-full ${vector.tone}`} style={{ width: `${vector.value}%` }} />
              </div>
            </div>
          ))}
        </div>

        {critical && (
          <div className="mt-5 border border-red-500 bg-red-500/10 p-3 text-sm font-bold uppercase tracking-[0.18em] text-red-200">
            WARNING: HEAT LEVEL CRITICAL. FEDS DISPATCHED.
          </div>
        )}

        <div className="mt-6 border border-zinc-700 bg-black p-3">
          <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400">TOTAL VALUE</p>
          <p className="mt-2 font-mono text-3xl font-black text-emerald-300">${totalValue.toLocaleString()}</p>
        </div>

        <button className="mt-6 w-full border border-red-500 bg-red-500/10 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.28em] text-red-200 transition hover:bg-red-500/20">
          LAUNDER FUNDS &amp; ACQUIRE
        </button>
      </aside>
    </div>
  );
}
