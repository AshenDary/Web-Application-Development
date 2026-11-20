import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { api, activity } from '../lib/api';
import { useCart } from '../context/CartContext';
import { EmptyState, ErrorMessage, Input, ProductCard, Select, Spinner } from '../components/ui';

const categories = ['Tech', 'Jewelry', 'Watches', 'Vehicles', 'Fashion', 'Companions'];

export default function Marketplace() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [data, setData] = useState(null);
	const [error, setError] = useState('');
	const [q, setQ] = useState(searchParams.get('q') || '');
	const [category, setCategory] = useState('');
	const [rarity, setRarity] = useState('');
	const [sort, setSort] = useState('newest');
	const { add } = useCart();

	useEffect(() => { const nextQuery = searchParams.get('q') || ''; if (nextQuery !== q) setQ(nextQuery); }, [searchParams, q]);
	useEffect(() => {
		const query = new URLSearchParams({ page: '1', limit: '12', sort });
		if (q) query.set('q', q);
		if (category) query.set('category', category);
		if (rarity) query.set('rarity', rarity);
		setData(null);
		api(`/products?${query}`).then(setData).catch((requestError) => setError(requestError.message));
	}, [q, category, rarity, sort]);

	function setQueryValue(value) { setQ(value); setSearchParams(value ? { q: value } : {}, { replace: true }); activity('search', { q: value }); }
	function clearFilters() { setQueryValue(''); setCategory(''); setRarity(''); setSort('newest'); }
	const recommendations = data?.products.filter((product) => product.stock > 0).slice(0, 4) ?? [];
	const railProducts = [...recommendations, ...recommendations];
	const hasFilters = Boolean(q || category || rarity || sort !== 'newest');

	return <><section className="mb-8 flex flex-wrap items-end justify-between gap-5 rounded-ui border border-zinc-800 bg-zinc-950/80 p-6 sm:p-9"><h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">Marketplace</h1><div className="rounded-ui border border-amber-300/20 bg-amber-300/5 px-4 py-3 font-mono text-sm text-amber-100"><span className="font-semibold">{data?.total ?? '—'}</span> assets</div></section>
		{railProducts.length > 0 && <section className="mb-10 overflow-hidden"><h2 className="mb-5 text-xl font-semibold tracking-tight">Recommendations</h2><div className="recommendation-mask"><div className="recommendation-rail">{railProducts.map((product, index) => <div key={`${product._id}-${index}`} className="w-72 shrink-0"><ProductCard product={product} onAdd={add}/></div>)}</div></div></section>}
		<section className="card mb-5 p-4"><div className="grid gap-3 lg:grid-cols-[minmax(0,1.8fr)_1fr_1fr_1fr_auto]"><label className="relative block"><Search className="pointer-events-none absolute left-3.5 top-3 text-zinc-500" size={18}/><Input aria-label="Search products" className="border-zinc-700 bg-zinc-900/50 pl-10 pr-10 focus:border-amber-300/50" placeholder="Search for a product" value={q} onChange={(event) => setQueryValue(event.target.value)}/>{q && <button type="button" aria-label="Clear search" onClick={() => setQueryValue('')} className="absolute right-2.5 top-2.5 rounded-ui p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100"><X size={16}/></button>}</label><Select aria-label="Category" value={category} onChange={(event) => { setCategory(event.target.value); activity('filter', { category: event.target.value }); }}><option value="">Category</option>{categories.map((item) => <option key={item}>{item}</option>)}</Select><Select aria-label="Rarity" value={rarity} onChange={(event) => setRarity(event.target.value)}><option value="">Availability</option>{['common', 'rare', 'limited', 'legendary'].map((item) => <option key={item}>{item}</option>)}</Select><Select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Newest</option><option value="price_asc">Price: low</option><option value="price_desc">Price: high</option></Select>{hasFilters && <button type="button" onClick={clearFilters} className="btn-secondary whitespace-nowrap px-3">Reset</button>}</div></section>
		<div className="mb-5 flex justify-end font-mono text-xs text-zinc-500">{data && <span>{data.products.length} shown</span>}</div>
		{error && <ErrorMessage>{error}</ErrorMessage>}{!data ? <Spinner /> : data.products.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{data.products.map((product) => <ProductCard key={product._id} product={product} onAdd={add}/>)}</div> : <EmptyState>No products match these filters.</EmptyState>}</>;
}
