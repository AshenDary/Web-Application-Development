import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useCart } from '../context/CartContext';
import { EmptyState, ErrorMessage, PageHeader, ProductCard, Spinner } from '../components/ui';

const endTime = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function HotDrops() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const { add } = useCart();

  useEffect(() => {
    let controller;
    const fetchDrops = (background = false) => {
      controller?.abort();
      controller = new AbortController();
      if (!background) setError('');
      api('/products/hot-drops', { signal: controller.signal })
        .then(({ products }) => { if (!controller.signal.aborted) setItems(products); })
        .catch((requestError) => {
          if (!background && !controller.signal.aborted) setError(requestError.message);
        });
    };
    const refresh = () => { if (!document.hidden) fetchDrops(true); };
    fetchDrops();
    const timer = window.setInterval(refresh, 60000);
    document.addEventListener('visibilitychange', refresh);
    return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', refresh); controller?.abort(); };
  }, []);

  return (
    <>
      <PageHeader title="Hot drops" />
      {error ? <div role="alert"><ErrorMessage>{error}</ErrorMessage></div>
        : !items ? <Spinner label="Loading hot drops…" />
        : items.length === 0 ? <EmptyState>No active drops right now.</EmptyState>
        : (
          <div className="hot-drops-marquee" aria-label="Continuously scrolling hot drops">
            <ul className="hot-drops-track">
              {[...items, ...items].map((product, index) => (
              <li key={`${product._id}-${index}`} className="hot-drops-card min-w-0" aria-hidden={index >= items.length || undefined}>
                <ProductCard product={product} onAdd={add}>
                  <p className="mb-4 border-t border-zinc-800 pt-3 text-sm text-black">
                    Ends <time dateTime={product.dropEndsAt}>{endTime.format(new Date(product.dropEndsAt))}</time>
                  </p>
                </ProductCard>
              </li>
            ))}
            </ul>
          </div>
        )}
    </>
  );
}
