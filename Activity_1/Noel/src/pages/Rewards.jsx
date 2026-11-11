import { rewards } from '../data/mockData';

export default function Rewards() {
  const streetCred = 18450;

  return (
    <div className="space-y-6">
      <section className="border border-zinc-800 bg-zinc-950 p-4">
        <div className="flex flex-col gap-3 border-b border-zinc-800 pb-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-red-400">Street Cred</p>
            <h1 className="mt-2 text-3xl font-black uppercase tracking-[0.08em] text-zinc-100">Rewards Terminal</h1>
          </div>

          <div className="border border-emerald-500/50 bg-black px-4 py-3 text-right">
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400">TOTAL</p>
            <p className="mt-1 font-mono text-3xl font-black text-emerald-300">{streetCred.toLocaleString()}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {rewards.map((reward) => (
          <article
            key={reward.title}
            className={`border p-4 ${
              reward.status === 'UNLOCKED'
                ? 'border-emerald-500/60 bg-emerald-500/10'
                : 'border-zinc-800 bg-zinc-950'
            }`}
          >
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-zinc-700 pb-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-300">Case File</span>
              <span className={`text-[10px] uppercase tracking-[0.22em] ${reward.status === 'UNLOCKED' ? 'text-emerald-300' : 'text-red-300'}`}>
                {reward.status}
              </span>
            </div>

            <h2 className="text-xl font-black uppercase tracking-[0.08em] text-zinc-100">{reward.title}</h2>
            <p className="mt-3 font-mono text-sm text-zinc-400">POINTS: {reward.points.toLocaleString()}</p>
            <div className="mt-4 h-2 border border-zinc-700 bg-black">
              <div
                className={`h-full ${reward.status === 'UNLOCKED' ? 'bg-emerald-400' : 'bg-red-500'}`}
                style={{ width: reward.status === 'UNLOCKED' ? '100%' : '62%' }}
              />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
