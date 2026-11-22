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
    const controller = new AbortController();
    api('/products/hot-drops', { signal: controller.signal })
      .then(({ products }) => setItems(products))
      .catch((requestError) => {
        if (!controller.signal.aborted) setError(requestError.message);
      });
    return () => controller.abort();
  }, []);

  return (
    <>
      <PageHeader title="Hot drops" />
      {error ? <div role="alert"><ErrorMessage>{error}</ErrorMessage></div>
        : !items ? <Spinner label="Loading hot drops…" />
        : items.length === 0 ? <EmptyState>No active drops right now.</EmptyState>
        : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((product) => (
              <li key={product._id} className="min-w-0">
                <ProductCard product={product} onAdd={add}>
                  <p className="mb-4 border-t border-zinc-800 pt-3 text-sm text-zinc-300">
                    Ends <time dateTime={product.dropEndsAt}>{endTime.format(new Date(product.dropEndsAt))}</time>
                  </p>
                </ProductCard>
              </li>
            ))}
          </ul>
        )}
    </>
  );
}
