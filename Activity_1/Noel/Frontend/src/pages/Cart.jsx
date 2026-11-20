import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button, EmptyState, ErrorMessage, PageHeader } from '../components/ui';
import { formatPeso } from '../lib/currency';

export default function Cart() {
	const { items, update, clear } = useCart();
	const { user } = useAuth();
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
	const brokerageFee = Math.round(subtotal * 0.025 * 100) / 100;
	const total = subtotal + brokerageFee;

	async function order() {
		try {
			await api('/orders', { method: 'POST', body: JSON.stringify({ items: items.map((item) => ({ productId: item._id, qty: item.qty })) }) });
			clear();
			navigate('/orders');
		} catch (requestError) {
			setError(requestError.message);
		}
	}

	return <>
		<PageHeader title="Cart" />
		{error && <ErrorMessage>{error}</ErrorMessage>}
		{!items.length ? <EmptyState>Your cart is empty.</EmptyState> : <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
			<div className="card divide-y divide-line">{items.map((item) => <div key={item._id} className="flex items-center gap-4 p-4">
				<img src={item.imageUrl} alt="" className="h-16 w-16 rounded-ui" />
				<div className="flex-1"><p>{item.name}</p><p className="text-sm text-zinc-400">{formatPeso(item.price)}</p></div>
				<Button variant="secondary" onClick={() => update(item._id, item.qty - 1)} aria-label={`Remove one ${item.name}`}>-</Button>
				<span>{item.qty}</span>
				<Button variant="secondary" onClick={() => update(item._id, item.qty + 1)} aria-label={`Add one ${item.name}`}>+</Button>
			</div>)}</div>
			<aside className="card h-fit p-5">
				<div className="space-y-2 font-mono text-sm"><div className="flex justify-between text-zinc-400"><span>Subtotal</span><span>{formatPeso(subtotal)}</span></div><div className="flex justify-between text-zinc-400"><span>Brokerage fee</span><span>{formatPeso(brokerageFee)}</span></div><div className="flex justify-between border-t border-zinc-800 pt-3 text-lg font-semibold text-zinc-100"><span>Total</span><span>{formatPeso(total)}</span></div></div>
				{user?.points >= 250 && <p className="mb-4 border-l-2 border-emerald-400/60 pl-3 text-xs leading-5 text-zinc-400"><span className="font-medium text-emerald-200">Silent Checkout profile active.</span> Saved preferences will be applied; required verification remains in place.</p>}
				{user ? <Button onClick={order}>Place order</Button> : <>
					<p className="mb-3 text-sm text-zinc-400">Sign in to complete your purchase.</p>
					<Link className="btn-primary inline-flex" to="/login" state={{ from: '/cart' }}>Log in to checkout</Link>
				</>}
			</aside>
		</div>}
	</>;
}
