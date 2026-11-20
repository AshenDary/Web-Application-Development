import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { EmptyState, ErrorMessage, PageHeader, Spinner } from '../components/ui';
import { formatPeso } from '../lib/currency';

const receiptCode = (id = '') => `TRX-${id.slice(-5).toUpperCase()}-BLK`;

export default function Orders() {
	const [data, setData] = useState(null);
	const [error, setError] = useState('');

	useEffect(() => {
		let active = true;
		api('/orders/mine').then((result) => {
			if (active) setData({ orders: Array.isArray(result?.orders) ? result.orders : [] });
		}).catch((requestError) => {
			if (active) setError(requestError.message || 'Unable to load transfers.');
		});
		return () => { active = false; };
	}, []);

	return <><PageHeader title="Transfers" eyebrow="Acquisition ledger"><Link className="btn-secondary" to="/orders/sample">View sample receipt</Link></PageHeader>
		{error && <ErrorMessage>{error}</ErrorMessage>}
		{!data && !error ? <Spinner label="Loading transfer ledger…" /> : data?.orders?.length ? <section className="card overflow-hidden"><div className="hidden grid-cols-[1fr_auto_auto_auto] gap-6 border-b border-zinc-800 px-6 py-3 font-mono text-[11px] tracking-wider text-zinc-500 sm:grid"><span>TRANSACTION</span><span>DATE</span><span>VALUE</span><span>STATUS</span></div><div className="divide-y divide-zinc-800">{data.orders.map((order) => <Link key={order._id} to={`/orders/${order._id}`} className="grid gap-2 px-6 py-5 transition hover:bg-zinc-900/60 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center sm:gap-6"><div><p className="font-medium text-zinc-100">{receiptCode(order._id)}</p><p className="mt-1 text-sm text-zinc-500">{Array.isArray(order.items) ? `${order.items.length} asset${order.items.length === 1 ? '' : 's'}` : 'Asset details unavailable'}</p></div><p className="font-mono text-xs text-zinc-400">{order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Timestamp unavailable'}</p><p className="font-mono text-sm text-zinc-200">{formatPeso(order.total)}</p><p className="font-mono text-xs text-emerald-200">{order.status === 'completed' ? 'CLEARED' : String(order.status || 'PENDING').toUpperCase()}</p></Link>)}</div></section> : <EmptyState>NO ACTIVE TRANSFERS. AWAITING ACQUISITION.</EmptyState>}</>;
}
