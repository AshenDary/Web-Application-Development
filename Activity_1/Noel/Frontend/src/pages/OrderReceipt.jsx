import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { ErrorMessage, PageHeader, Spinner } from '../components/ui';
import { formatPeso } from '../lib/currency';

const receiptCode = (id = '') => `TRX-${id.slice(-5).toUpperCase()}-BLK`;
const sampleReceipt = {
	_id: 'sample', transactionId: 'TRX-8849A-BLK', brokerId: 'BRK-71C4D9', status: 'completed', paymentStatus: 'confirmed', fulfillmentStatus: 'scheduled', createdAt: '2026-11-20T09:30:00.000Z', estimatedDeliveryAt: '2026-11-23T09:30:00.000Z', pointsEarned: 184, subtotal: 17980, brokerageFee: 449.5, total: 18429.5,
	items: [{ product: 'sample-daytona', name: 'Unlisted Provenance Vintage Daytona', status: 'OFF-MARKET', unitPrice: 17980, qty: 1 }],
};

export default function OrderReceipt() {
	const { id } = useParams();
	const [order, setOrder] = useState(null);
	const [error, setError] = useState('');
	const isSample = id === 'sample';

	useEffect(() => { if (isSample) { setOrder(sampleReceipt); return undefined; } api(`/orders/${id}`).then((result) => setOrder(result?.order ?? null)).catch((requestError) => setError(requestError.message || 'Unable to retrieve receipt.')); return undefined; }, [id, isSample]);
	if (error) return <><PageHeader title="Transfer receipt" eyebrow="Acquisition ledger" /><ErrorMessage>{error}</ErrorMessage><Link className="btn-secondary" to="/orders">Back to transfers</Link></>;
	if (!order) return <Spinner label="Retrieving receipt…" />;
	const subtotal = Number(order.subtotal ?? (order.items || []).reduce((sum, item) => sum + Number(item.unitPrice || 0) * Number(item.qty || 0), 0));
	const brokerageFee = Number(order.brokerageFee ?? Math.max(0, Number(order.total || 0) - subtotal));
	const cleared = order.status === 'completed';
	return <><PageHeader title="Transfer receipt" eyebrow={isSample ? 'Sample receipt' : 'Cleared acquisition'} ><Link className="btn-secondary" to="/orders">Back to ledger</Link></PageHeader>{isSample && <p className="mb-5 border border-amber-300/25 bg-amber-300/5 p-3 font-mono text-xs text-amber-100">SAMPLE RECEIPT — FOR INTERFACE PREVIEW ONLY. NOT A PAYMENT CONFIRMATION.</p>}<article className="card mx-auto max-w-3xl overflow-hidden"><div className="border-b border-zinc-800 px-6 py-6 sm:px-8"><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="font-mono text-xs tracking-[0.16em] text-zinc-500">PRIVATE BROKER TERMINAL</p><h2 className="mt-2 font-mono text-xl font-semibold text-zinc-100">{order.transactionId || receiptCode(order._id)}</h2></div><p className={`border px-3 py-2 font-mono text-xs tracking-wider ${cleared ? 'border-emerald-400/30 text-emerald-200' : 'border-amber-300/30 text-amber-100'}`}>TRANSFER STATUS: {cleared ? 'CLEARED' : String(order.status || 'PENDING').toUpperCase()}</p></div><div className="mt-6 grid gap-4 border-t border-zinc-800 pt-5 font-mono text-xs text-zinc-400 sm:grid-cols-3"><p>TIMESTAMP<br/><span className="mt-1 block text-zinc-200">{order.createdAt ? new Date(order.createdAt).toLocaleString() : '—'}</span></p><p>BROKER ID<br/><span className="mt-1 block text-zinc-200">{order.brokerId || `BRK-${order._id.slice(-6).toUpperCase()}`}</span></p><p>PAYMENT<br/><span className="mt-1 block text-emerald-200">{String(order.paymentStatus || 'pending').toUpperCase()}</span></p></div></div><div className="px-6 py-5 sm:px-8"><div className="mb-3 grid grid-cols-[1fr_auto_auto] gap-4 border-b border-zinc-800 pb-3 font-mono text-[11px] tracking-wider text-zinc-500"><span>ASSET / STATUS</span><span>QTY</span><span>VALUE</span></div>{(order.items || []).map((item, index) => <div key={`${item.product || item.name}-${index}`} className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-zinc-800 py-4 text-sm"><div><p className="font-medium text-zinc-100">{item.name || 'Unnamed asset'}</p><p className="mt-1 font-mono text-[11px] text-amber-100">{item.status || 'VERIFIED'}</p></div><p className="font-mono text-zinc-400">×{item.qty || 1}</p><p className="font-mono text-zinc-200">{formatPeso(Number(item.unitPrice || 0) * Number(item.qty || 1))}</p></div>)}<div className="mt-5 border-l-2 border-amber-300/70 pl-3 font-mono text-xs text-zinc-400">DELIVERY: <span className="text-zinc-200">{String(order.fulfillmentStatus || 'awaiting').toUpperCase()}{order.estimatedDeliveryAt ? ` · ${new Date(order.estimatedDeliveryAt).toLocaleDateString()}` : ''}</span></div><div className="ml-auto mt-6 max-w-xs space-y-3 font-mono text-sm"><div className="flex justify-between text-zinc-400"><span>SUBTOTAL</span><span>{formatPeso(subtotal)}</span></div><div className="flex justify-between text-zinc-400"><span>BROKERAGE FEES</span><span>{formatPeso(brokerageFee)}</span></div><div className="flex justify-between border-t border-zinc-700 pt-3 font-semibold text-zinc-100"><span>TOTAL</span><span>{formatPeso(order.total)}</span></div></div></div></article></>;
}
