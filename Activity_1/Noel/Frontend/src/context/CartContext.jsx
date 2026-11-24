import { createContext, useCallback, useContext, useState } from 'react';
import CartNotice from '../components/ui/CartNotice';
import { activity, api } from '../lib/api';

const Cart = createContext(null);
export const useCart = () => useContext(Cart);

export function CartProvider({ children }) {
	const [items, setItems] = useState([]);
	const [notice, setNotice] = useState('');

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

	const selectItems = (ids, selected) => {
		const selection = new Set(ids);
		setItems((current) => current.map((item) => selection.has(item._id) ? { ...item, selected } : item));
	};

	const removeItems = (ids) => {
		const removal = new Set(ids);
		setItems((current) => current.filter((item) => !removal.has(item._id)));
	};

	const refreshStocks = useCallback(async (signal) => {
		const currentItems = items;
		const refreshedStocks = await Promise.all(currentItems.map(async (item) => {
			try {
				const { product } = await api(`/products/${item._id}`, { signal });
				return [item._id, product.stock];
			} catch {
				return null;
			}
		}));
		if (signal?.aborted) return;
		const stockById = new Map(refreshedStocks.filter(Boolean));
		setItems((current) => current.map((item) => stockById.has(item._id) ? { ...item, stock: stockById.get(item._id) } : item));
	}, [items]);

	return <Cart.Provider value={{ items, add, update, selectItems, removeItems, refreshStocks }}>
		{children}
		{notice && <CartNotice message={notice} onDismiss={() => setNotice('')} />}
	</Cart.Provider>;
}
