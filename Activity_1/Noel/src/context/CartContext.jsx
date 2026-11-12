import { createContext, useContext, useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { activity } from '../lib/api';

const Cart = createContext(null);
export const useCart = () => useContext(Cart);

export function CartProvider({ children }) {
	const [items, setItems] = useState([]);
	const [notice, setNotice] = useState('');

	useEffect(() => {
		if (!notice) return undefined;
		const timeout = window.setTimeout(() => setNotice(''), 3000);
		return () => window.clearTimeout(timeout);
	}, [notice]);

	const add = (product) => {
		setItems((currentItems) => {
			const found = currentItems.find((item) => item._id === product._id);
			return found
				? currentItems.map((item) => item._id === product._id ? { ...item, qty: item.qty + 1 } : item)
				: [...currentItems, { ...product, qty: 1 }];
		});
		setNotice(`${product.name} added to your order`);
		activity('add_to_cart', { productId: product._id });
	};

	const update = (id, qty) => setItems((currentItems) => (
		qty > 0
			? currentItems.map((item) => item._id === id ? { ...item, qty } : item)
			: currentItems.filter((item) => item._id !== id)
	));

	return <Cart.Provider value={{ items, add, update, clear: () => setItems([]) }}>
		{children}
		{notice && <div role="status" aria-live="polite" className="fixed bottom-5 right-5 z-50 flex max-w-[calc(100vw-2.5rem)] items-center gap-3 rounded-ui border border-emerald-400/30 bg-zinc-950/95 p-4 text-sm text-zinc-100 shadow-card">
			<CheckCircle2 aria-hidden="true" className="shrink-0 text-emerald-300" size={19}/>
			<span>{notice}</span>
		</div>}
	</Cart.Provider>;
}
