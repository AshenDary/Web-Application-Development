import { vaultInventory } from '../data/mockData';

export default function Vault() {
  return (
    <div className="border border-zinc-800 bg-zinc-950 p-4">
      <div className="mb-5 border-b border-zinc-800 pb-3">
        <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-300">Storage Unit</p>
        <h1 className="mt-2 text-3xl font-black uppercase tracking-[0.08em] text-zinc-100">Vault Inventory</h1>
      </div>

      <div className="overflow-hidden border border-zinc-800 bg-black">
        <div className="grid grid-cols-4 border-b border-zinc-800 bg-zinc-900 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
          <span>Item</span>
          <span>Class</span>
          <span>Location</span>
          <span>Condition</span>
        </div>

        {vaultInventory.map((entry) => (
          <div key={entry.item} className="grid grid-cols-4 border-b border-zinc-800 px-3 py-3 text-sm text-zinc-200 last:border-b-0">
            <span className="font-bold uppercase text-zinc-100">{entry.item}</span>
            <span className="text-emerald-300">{entry.className}</span>
            <span>{entry.location}</span>
            <span className="text-red-300">{entry.condition}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
