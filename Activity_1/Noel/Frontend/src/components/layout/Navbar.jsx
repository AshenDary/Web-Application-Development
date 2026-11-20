import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogOut, ShoppingBag, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const nav = [['/marketplace', 'Marketplace'], ['/hot-drops', 'Hot drops'], ['/rewards', 'Rewards']];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const count = items.reduce((total, item) => total + item.qty, 0);

  return <header className="sticky top-0 z-30 border-b border-line/80 bg-ink/85 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 sm:px-6 lg:px-8">
      <Link to="/marketplace" className="flex items-center gap-2.5 font-semibold tracking-tight">
        <span className="grid h-9 w-9 place-items-center rounded-ui bg-accent text-sm font-black text-ink">S</span>
        <span>STASH</span>
      </Link>
      <nav className="order-3 flex w-full items-center gap-1 overflow-x-auto text-sm sm:order-none sm:w-auto">
        {nav.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => `rounded-ui px-3 py-2 whitespace-nowrap transition ${isActive ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'}`}>{label}</NavLink>)}
      </nav>
      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <Link to="/cart" aria-label="Cart" className="relative rounded-ui p-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"><ShoppingBag size={19}/>{count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-ink">{count}</span>}</Link>
        {user ? <><div className="hidden text-right text-sm sm:block"><p className="font-medium text-zinc-100">{user.name}</p><p className="text-xs text-accent">{user.points} points</p></div>{user.role === 'admin' && <Link className="hidden rounded-ui border border-line px-3 py-2 text-sm hover:border-accent sm:block" to="/admin/products">Admin</Link>}<button aria-label="Log out" className="rounded-ui p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white" onClick={() => logout().then(() => navigate('/marketplace'))}><LogOut size={18}/></button></> : <><Link className="hidden px-3 py-2 text-sm text-zinc-300 hover:text-white sm:block" to="/login">Log in</Link><Link className="btn-primary px-3 py-2 sm:px-4" to="/register"><Sparkles size={16}/><span className="hidden sm:inline">Create account</span><span className="sm:hidden">Join</span></Link></>}
      </div>
    </div>
  </header>;
}
