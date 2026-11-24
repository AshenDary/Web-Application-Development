import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { Button, ErrorMessage, PageHeader, Spinner } from '../components/ui';
import { PixelPrinter } from '../components/ui/PixelIcons';
import { formatPeso } from '../lib/currency';

const receiptCode = (id = '') => `TRX-${id.slice(-5).toUpperCase()}-BLK`;
const sampleReceipt = {
  _id: 'sample', transactionId: 'TRX-8849A-BLK', brokerId: 'BRK-71C4D9', status: 'completed',
  paymentStatus: 'confirmed', fulfillmentStatus: 'scheduled', createdAt: '2026-11-20T09:30:00.000Z',
  estimatedDeliveryAt: '2026-11-23T09:30:00.000Z', pointsEarned: 184, subtotal: 17980,
  brokerageFee: 449.5, total: 18429.5,
  items: [{ product: 'sample-daytona', name: 'Unlisted Provenance Vintage Daytona', status: 'OFF-MARKET', unitPrice: 17980, qty: 1 }],
};

function ReceiptPrinter() {
  return (
    <div className="receipt-printer" aria-hidden="true">
      <div className="receipt-printer-face">
        <span><PixelPrinter size={24} /> STASH Receipt Printer</span>
        <div className="receipt-printer-vents" />
        <span className="receipt-printer-light" />
      </div>
      <div className="receipt-printer-slot" />
    </div>
  );
}

function Receipt({ id }) {
  const isSample = id === 'sample';
  const [order, setOrder] = useState(isSample ? sampleReceipt : null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isSample) return;
    const request = new AbortController();
    api(`/orders/${id}`, { signal: request.signal })
      .then(({ order: result }) => {
        if (!result) throw new Error('Unable to retrieve receipt.');
        setOrder(result);
      })
      .catch((requestError) => {
        if (!request.signal.aborted) setError(requestError.message || 'Unable to retrieve receipt.');
      });
    return () => request.abort();
  }, [id, isSample]);

  if (error) return <><PageHeader title="Transfer receipt" eyebrow="Acquisition ledger" /><ErrorMessage>{error}</ErrorMessage><Link className="btn-secondary" to="/orders">Back to transfers</Link></>;
  if (!order) return <Spinner label="Retrieving receipt…" />;

  const items = order.items ?? [];
  const subtotal = Number(order.subtotal ?? items.reduce((sum, item) => sum + Number(item.unitPrice || 0) * Number(item.qty || 0), 0));
  const brokerageFee = Number(order.brokerageFee ?? Math.max(0, Number(order.total || 0) - subtotal));
  const cleared = order.status === 'completed';

  return (
    <div className="receipt-page">
      <PageHeader title="Transfer receipt" eyebrow={isSample ? 'Sample receipt' : 'Cleared acquisition'}>
        <div className="receipt-actions">
          <Link className="btn-secondary" to="/orders">Back to ledger</Link>
          <Button type="button" onClick={() => window.print()}><PixelPrinter size={17} /> Print receipt</Button>
        </div>
      </PageHeader>
      {isSample && <p className="receipt-sample mb-5 border border-amber-300/25 bg-amber-300/5 p-3 font-mono text-xs text-black">SAMPLE RECEIPT — FOR INTERFACE PREVIEW ONLY. NOT A PAYMENT CONFIRMATION.</p>}
      <div className="receipt-station">
        <ReceiptPrinter />
        <div className="receipt-paper">
          <article className="card receipt-article">
            <div className="border-b border-zinc-800 px-4 py-5 sm:px-8 sm:py-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs tracking-[0.16em] text-black">PRIVATE BROKER TERMINAL</p>
                  <h2 className="mt-2 font-mono text-xl font-semibold text-black">{order.transactionId || receiptCode(order._id)}</h2>
                </div>
                <p className={`border px-3 py-2 font-mono text-xs tracking-wider ${cleared ? 'border-emerald-400/30 text-black' : 'border-amber-300/30 text-black'}`}>
                  TRANSFER STATUS: {cleared ? 'SUCCESSFUL' : String(order.status || 'PENDING').toUpperCase()}
                </p>
              </div>
              <div className="mt-6 grid gap-4 border-t border-zinc-800 pt-5 font-mono text-xs text-black sm:grid-cols-3">
                <p>TIMESTAMP<span className="mt-1 block text-black">{order.createdAt ? new Date(order.createdAt).toLocaleString() : '—'}</span></p>
                <p>BROKER ID<span className="mt-1 block text-black">{order.brokerId || `BRK-${order._id.slice(-6).toUpperCase()}`}</span></p>
                <p>PAYMENT<span className="mt-1 block text-black">{String(order.paymentStatus || 'pending').toUpperCase()}</span></p>
              </div>
            </div>
            <div className="px-4 py-5 sm:px-8">
              <div className="receipt-line mb-3 border-b border-zinc-800 pb-3 font-mono text-[11px] tracking-wider text-black">
                <span>ASSET / STATUS</span><span>QTY</span><span>VALUE</span>
              </div>
              {items.map((item, index) => (
                <div key={`${item.product || item.name}-${index}`} className="receipt-line border-b border-zinc-800 py-4 text-sm">
                  <div>
                    <p className="font-medium text-black">{item.name || 'Unnamed asset'}</p>
                    <p className="mt-1 font-mono text-[11px] text-black">{item.status || 'VERIFIED'}</p>
                  </div>
                  <p className="font-mono text-black">×{item.qty || 1}</p>
                  <p className="font-mono text-black">{formatPeso(Number(item.unitPrice || 0) * Number(item.qty || 1))}</p>
                </div>
              ))}
              <p className="mt-5 border-l-2 border-amber-300/70 pl-3 font-mono text-xs text-black">DELIVERY: <span className="text-black">{String(order.fulfillmentStatus || 'awaiting').toUpperCase()}{order.estimatedDeliveryAt ? ` · ${new Date(order.estimatedDeliveryAt).toLocaleDateString()}` : ''}</span></p>
              <div className="ml-auto mt-6 max-w-xs space-y-3 font-mono text-sm">
                <div className="flex justify-between text-black"><span>SUBTOTAL</span><span>{formatPeso(subtotal)}</span></div>
                <div className="flex justify-between text-black"><span>BROKERAGE FEES</span><span>{formatPeso(brokerageFee)}</span></div>
                <div className="flex justify-between border-t border-zinc-700 pt-3 font-semibold text-black"><span>TOTAL</span><span>{formatPeso(order.total)}</span></div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default function OrderReceipt({ sample = false }) {
  const { id } = useParams();
  return <Receipt key={sample ? 'sample' : id} id={sample ? 'sample' : id} />;
}
