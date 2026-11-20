import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button, EmptyState, ErrorMessage, PageHeader } from '../components/ui';

export default function Cart() {
	const { items, update, clear } = useCart();
	const { user } = useAuth();
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

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
				<div className="flex-1"><p>{item.name}</p><p className="text-sm text-zinc-400">${item.price}</p></div>
				<Button variant="secondary" onClick={() => update(item._id, item.qty - 1)} aria-label={`Remove one ${item.name}`}>-</Button>
				<span>{item.qty}</span>
				<Button variant="secondary" onClick={() => update(item._id, item.qty + 1)} aria-label={`Add one ${item.name}`}>+</Button>
			</div>)}</div>
			<aside className="card h-fit p-5">
				<p className="text-zinc-400">Order total</p>
				<p className="my-4 text-2xl font-semibold">${total.toLocaleString()}</p>
				{user ? <Button onClick={order}>Place order</Button> : <>
					<p className="mb-3 text-sm text-zinc-400">Sign in to complete your purchase.</p>
					<Link className="btn-primary inline-flex" to="/login" state={{ from: '/cart' }}>Log in to checkout</Link>
				</>}
			</aside>
		</div>}
	</>;
}
