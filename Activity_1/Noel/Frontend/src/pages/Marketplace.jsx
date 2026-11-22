import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, FolderOpen, Pause, Play, Search, X } from 'lucide-react';
import { api, activity } from '../lib/api';
import { useCart } from '../context/CartContext';
import { EmptyState, ErrorMessage, Input, ProductCard, Select, Spinner } from '../components/ui';

const categories = ['Tech', 'Jewelry', 'Watches', 'Vehicles', 'Fashion', 'Companions'];

function moveByCard(list, direction) {
	const cardWidth = list.firstElementChild.getBoundingClientRect().width;
	list.scrollBy({ left: direction * (cardWidth + parseFloat(getComputedStyle(list).columnGap)) });
}

function Recommendations({ products, onAdd }) {
	const rail = useRef(null);
	const shelf = useRef(null);
	const [scroll, setScroll] = useState({ left: false, right: false });
	const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
	const canScroll = scroll.left || scroll.right;

	function updateScroll() {
		const list = rail.current;
		if (!list) return;
		setScroll({ left: list.scrollLeft > 1, right: list.scrollWidth - list.clientWidth - list.scrollLeft > 1 });
	}

	useEffect(() => {
		const observer = new ResizeObserver(updateScroll);
		observer.observe(rail.current);
		updateScroll();
		return () => observer.disconnect();
	}, [products.length]);

	useEffect(() => {
		if (!playing || !canScroll) return;
		const timer = window.setInterval(() => {
			const list = rail.current;
			if (!list || document.hidden || shelf.current.matches(':hover, :focus-within')) return;
			const remaining = list.scrollWidth - list.clientWidth - list.scrollLeft;
			if (remaining <= 1) list.scrollTo({ left: 0 });
			else moveByCard(list, 1);
		}, 3200);
		return () => window.clearInterval(timer);
	}, [playing, canScroll]);

	return (
		<section className="marketplace-shelf" aria-labelledby="recommendations-title" ref={shelf}>
			<div className="workspace-panel-bar">
				<h2 id="recommendations-title"><FolderOpen size={17} aria-hidden="true" /> Recommendations</h2>
				<div className="shelf-actions">
					<button type="button" aria-label="Previous recommendation" disabled={!scroll.left} onClick={() => moveByCard(rail.current, -1)}><ChevronLeft size={17} aria-hidden="true" /></button>
					<button type="button" aria-label={playing ? 'Pause recommendations' : 'Play recommendations'} disabled={!canScroll} onClick={() => setPlaying((active) => !active)}>
						{playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
					</button>
					<button type="button" aria-label="Next recommendation" disabled={!scroll.right} onClick={() => moveByCard(rail.current, 1)}><ChevronRight size={17} aria-hidden="true" /></button>
				</div>
			</div>
			<ul className="recommendation-rail" ref={rail} onScroll={updateScroll}>
				{products.map((product) => <li className="recommendation-item" key={product._id}><ProductCard product={product} onAdd={onAdd} featured /></li>)}
			</ul>
		</section>
	);
}

export default function Marketplace() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [data, setData] = useState(null);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);
	const [retry, setRetry] = useState(0);
	const [q, setQ] = useState(searchParams.get('q') || '');
	const [category, setCategory] = useState('');
	const [rarity, setRarity] = useState('');
	const [sort, setSort] = useState('newest');
	const { add } = useCart();

	useEffect(() => { const nextQuery = searchParams.get('q') || ''; if (nextQuery !== q) setQ(nextQuery); }, [searchParams, q]);
	useEffect(() => {
		const controller = new AbortController();
		const query = new URLSearchParams({ page: '1', limit: '12', sort });
		if (q) query.set('q', q);
		if (category) query.set('category', category);
		if (rarity) query.set('rarity', rarity);
		setData(null);
		setError('');
		setLoading(true);
		api(`/products?${query}`, { signal: controller.signal })
			.then((result) => {
				if (!Array.isArray(result.products)) throw new Error('Unable to load products. Please try again.');
				if (!controller.signal.aborted) setData(result);
			})
			.catch((requestError) => {
				if (!controller.signal.aborted) setError(requestError.message);
			})
			.finally(() => {
				if (!controller.signal.aborted) setLoading(false);
			});
		return () => controller.abort();
	}, [q, category, rarity, sort, retry]);

	function setQueryValue(value) { setQ(value); setSearchParams(value ? { q: value } : {}, { replace: true }); activity('search', { q: value }); }
	function clearFilters() { setQueryValue(''); setCategory(''); setRarity(''); setSort('newest'); }
	const recommendations = data?.products.filter((product) => product.stock > 0).slice(0, 4) ?? [];
	const hasFilters = Boolean(q || category || rarity || sort !== 'newest');

	return <><h1 className="sr-only">Marketplace</h1>
		<section className="card mb-5 p-4"><div className="grid gap-3 lg:grid-cols-[minmax(0,1.8fr)_1fr_1fr_1fr_auto]"><label className="relative block"><Search className="pointer-events-none absolute left-3.5 top-3 text-zinc-500" size={18}/><Input aria-label="Search products" className="control pl-10 pr-10" placeholder="Search for a product" value={q} onChange={(event) => setQueryValue(event.target.value)}/>{q && <button type="button" aria-label="Clear search" onClick={() => setQueryValue('')} className="absolute right-2.5 top-2.5 rounded-ui p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100"><X size={16}/></button>}</label><Select aria-label="Category" value={category} onChange={(event) => { setCategory(event.target.value); activity('filter', { category: event.target.value }); }}><option value="">Category</option>{categories.map((item) => <option key={item}>{item}</option>)}</Select><Select aria-label="Rarity" value={rarity} onChange={(event) => setRarity(event.target.value)}><option value="">Availability</option>{['common', 'rare', 'limited', 'legendary'].map((item) => <option key={item}>{item}</option>)}</Select><Select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Newest</option><option value="price_asc">Price: low</option><option value="price_desc">Price: high</option></Select>{hasFilters && <button type="button" onClick={clearFilters} className="btn-secondary whitespace-nowrap px-3">Reset</button>}</div></section>
		{!hasFilters && recommendations.length > 0 && <Recommendations products={recommendations} onAdd={add} />}
		<div className="workspace-panel-bar marketplace-results"><h2><FolderOpen size={17} aria-hidden="true" /> Products</h2>{data && <span>{data.products.length} shown</span>}</div>
		{loading ? <Spinner /> : error ? <div role="alert"><ErrorMessage>{error}</ErrorMessage><button type="button" className="btn-secondary" onClick={() => setRetry((value) => value + 1)}>Try again</button></div> : data?.products.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{data.products.map((product) => <ProductCard key={product._id} product={product} onAdd={add}/>)}</div> : <EmptyState>No products match these filters.</EmptyState>}</>;
}
