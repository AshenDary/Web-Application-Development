import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { workspaceTabs } from './workspaceTabs';
import { PixelBag } from '../ui/PixelIcons';

const nav = ['marketplace', 'hot-drops', 'rewards'];

export default function Navbar() {
	const { user, logout } = useAuth();
	const { items } = useCart();
	const navigate = useNavigate();
	const count = items.reduce((total, item) => total + item.qty, 0);

	return <header className="desktop-menubar sticky top-0 z-30">
		<div className="desktop-menubar-inner">
			<Link to="/marketplace" className="flex items-center gap-2.5 font-semibold tracking-tight"><span className="desktop-brand-mark">S</span><span className="desktop-wordmark">STASH</span></Link>
			<nav aria-label="Store pages" className="desktop-menu-tabs">
				{nav.map((page) => {
					const { title, icon: Icon } = workspaceTabs[page];
					return <NavLink key={page} to={`/${page}`} className="desktop-menu-link">
						<Icon size={18} />
						<span>{title}</span>
					</NavLink>;
				})}
			</nav>
			<div className="desktop-menu-tools"><Link to="/cart" aria-label="Cart" className="desktop-tool-button"><PixelBag size={19} />{count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center desktop-cart-count px-1 text-[11px] font-bold">{count}</span>}</Link>{user ? <><div className="hidden text-right text-sm sm:block"><p className="font-medium text-black">{user.name}</p><p className="font-mono text-xs text-black">{user.points} points</p></div>{user.role === 'admin' && <Link className="hidden rounded-ui border border-zinc-800 px-3 py-2 text-sm hover:border-zinc-600 sm:block" to="/admin/products">Admin</Link>}<button aria-label="Log out" className="desktop-tool-button" onClick={() => logout().then(() => navigate('/marketplace'))}><LogOut size={18}/></button></> : <><Link className="hidden px-3 py-2 text-sm text-black hover:text-zinc-100 sm:block" to="/login">Log in</Link><Link className="btn-primary px-3 py-2 sm:px-4" to="/register"><Sparkles size={16}/><span className="hidden sm:inline">Create account</span><span className="sm:hidden">Join</span></Link></>}</div>
		</div>
	</header>;
}
