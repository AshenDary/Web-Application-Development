import { useMemo, useState } from 'react';
import { categories, products, riskLevels } from '../data/mockData';

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRisk, setSelectedRisk] = useState('All');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const riskMatch = selectedRisk === 'All' || product.risk === selectedRisk;
      return categoryMatch && riskMatch;
    });
  }, [selectedCategory, selectedRisk]);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="border border-zinc-800 bg-zinc-950 p-4">
        <div className="mb-5 border-b border-zinc-800 pb-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-red-400">Intel Panel</p>
          <h2 className="mt-2 text-xl font-black uppercase tracking-[0.1em] text-zinc-100">Filters</h2>
        </div>

        <div className="space-y-5">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-zinc-400">Categories</p>
            <div className="space-y-2">
              {['All', ...categories].map((category) => (
                <label key={category} className="flex items-center gap-3 text-sm text-zinc-200">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="h-4 w-4 border border-emerald-500 bg-black text-emerald-400 accent-emerald-500"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-zinc-400">Risk Level</p>
            <div className="space-y-2">
              {['All', ...riskLevels].map((risk) => (
                <label key={risk} className="flex items-center gap-3 text-sm text-zinc-200">
                  <input
                    type="radio"
                    name="risk"
                    checked={selectedRisk === risk}
                    onChange={() => setSelectedRisk(risk)}
                    className="h-4 w-4 border border-red-500 bg-black text-red-500 accent-red-500"
                  />
                  {risk}
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <section>
        <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-300">Live Inventory</p>
            <h1 className="mt-1 text-3xl font-black uppercase tracking-[0.08em] text-zinc-100">Marketplace</h1>
          </div>
          <div className="border border-emerald-500/50 bg-emerald-500/10 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-emerald-200">
            {filteredProducts.length} FILES
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group border border-zinc-800 bg-zinc-950 p-4 transition duration-150 hover:border-emerald-500/70 hover:bg-zinc-900"
            >
              <div className="mb-4 flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.2em]">
                <span className="border border-red-500/60 bg-red-500/10 px-2 py-1 text-red-300">{product.status}</span>
                <span className="text-zinc-400">{product.category}</span>
              </div>

              <div className="mb-4 overflow-hidden border border-zinc-700 bg-zinc-900 transition duration-150 group-hover:border-emerald-500/80"><img src={product.image} alt={`${product.name} product illustration`} loading="lazy" className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105" /></div>

              <div className="space-y-3 font-mono">
                <div className="flex items-center justify-between gap-2 border-b border-zinc-800 pb-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">ITEM</span>
                  <span className="text-sm font-bold uppercase text-zinc-100">{product.name}</span>
                </div>

                <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-zinc-400">
                  <span>Street Price</span>
                  <span className="text-base font-bold text-emerald-300">${product.price.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-zinc-400">
                  <span>Heat</span>
                  <span className="text-red-300">{product.heat}%</span>
                </div>

                <p className="text-xs leading-5 text-zinc-400">{product.description}</p>
              </div>

              <button className="mt-5 w-full border border-emerald-500/60 bg-black px-3 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-300 transition hover:bg-emerald-500/10">
                &gt; [ EXECUTE_BUY ]
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
