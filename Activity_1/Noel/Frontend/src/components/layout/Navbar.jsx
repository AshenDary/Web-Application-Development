import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Search, ShoppingBag, Sparkles, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const nav = [['/marketplace', 'Marketplace'], ['/hot-drops', 'Hot drops'], ['/rewards', 'Rewards']];

export default function Navbar() {
	const { user, logout } = useAuth();
	const { items } = useCart();
	const navigate = useNavigate();
	const location = useLocation();
	const inputRef = useRef(null);
	const [searchOpen, setSearchOpen] = useState(false);
	const [query, setQuery] = useState('');
	const count = items.reduce((total, item) => total + item.qty, 0);

	useEffect(() => { if (searchOpen) inputRef.current?.focus(); }, [searchOpen]);
	useEffect(() => { if (location.pathname !== '/marketplace') closeSearch(); }, [location.pathname]);
	useEffect(() => {
		if (!searchOpen || !query.trim()) return undefined;
		const timeout = window.setTimeout(() => navigate(`/marketplace?q=${encodeURIComponent(query.trim())}`), 250);
		return () => window.clearTimeout(timeout);
	}, [query, searchOpen, navigate]);

	function closeSearch() { setSearchOpen(false); setQuery(''); }

	return <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
		<div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 sm:px-6 lg:px-8">
			<Link to="/marketplace" onClick={closeSearch} className="flex items-center gap-2.5 font-semibold tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-ui border border-amber-300/30 bg-amber-300/10 text-sm font-black text-amber-100">S</span><span>STASH</span></Link>
			<nav className="order-3 flex w-full items-center gap-1 overflow-x-auto text-sm sm:order-none sm:w-auto">{nav.map(([to, label]) => <NavLink key={to} to={to} onClick={closeSearch} className={({ isActive }) => `rounded-ui px-3 py-2 whitespace-nowrap transition ${isActive ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-white'}`}>{label}</NavLink>)}</nav>
			<div className="ml-auto flex items-center gap-2 sm:gap-3"><button type="button" aria-label="Search asset database" aria-expanded={searchOpen} className={`rounded-ui border p-2 transition ${searchOpen ? 'border-amber-300/30 bg-amber-300/10 text-amber-100' : 'border-transparent text-zinc-400 hover:border-zinc-800 hover:text-zinc-100'}`} onClick={() => setSearchOpen((open) => !open)}><Search size={18}/></button><Link to="/cart" onClick={closeSearch} aria-label="Cart" className="relative rounded-ui p-2 text-zinc-300 transition hover:bg-zinc-900 hover:text-white"><ShoppingBag size={19}/>{count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-amber-200 px-1 text-[11px] font-bold text-zinc-950">{count}</span>}</Link>{user ? <><div className="hidden text-right text-sm sm:block"><p className="font-medium text-zinc-100">{user.name}</p><p className="font-mono text-xs text-amber-200">{user.points} points</p></div>{user.role === 'admin' && <Link onClick={closeSearch} className="hidden rounded-ui border border-zinc-800 px-3 py-2 text-sm hover:border-zinc-600 sm:block" to="/admin/products">Admin</Link>}<button aria-label="Log out" className="rounded-ui p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white" onClick={() => { closeSearch(); logout().then(() => navigate('/marketplace')); }}><LogOut size={18}/></button></> : <><Link onClick={closeSearch} className="hidden px-3 py-2 text-sm text-zinc-300 hover:text-white sm:block" to="/login">Log in</Link><Link onClick={closeSearch} className="btn-primary px-3 py-2 sm:px-4" to="/register"><Sparkles size={16}/><span className="hidden sm:inline">Create account</span><span className="sm:hidden">Join</span></Link></>}</div>
			{searchOpen && <div className="order-4 w-full border-t border-zinc-800 pt-3"><div className="relative"><Search className="pointer-events-none absolute left-3.5 top-3 text-zinc-500" size={17}/><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') closeSearch(); }} placeholder="Search for a product" className="w-full border border-zinc-800 bg-zinc-950 px-10 py-2.5 font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-300/40" /><button type="button" aria-label="Close search" onClick={closeSearch} className="absolute right-2 top-1.5 rounded-ui p-1.5 text-zinc-500 hover:text-zinc-100"><X size={17}/></button></div></div>}
		</div>
	</header>;
}
