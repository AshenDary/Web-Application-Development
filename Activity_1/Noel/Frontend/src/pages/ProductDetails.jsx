import { useEffect, useState } from 'react';
import { ArrowLeft, RotateCcw, ShoppingBag, Star, Truck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Badge, Button, ErrorMessage, Spinner } from '../components/ui';
import { useCart } from '../context/CartContext';
import { activity, api } from '../lib/api';
import { formatPeso } from '../lib/currency';

const sampleDetails = [
  { icon: Star, label: 'Buyer rating', value: '4.8 out of 5 · 24 reviews' },
  { icon: Truck, label: 'Estimated delivery', value: '3–5 business days' },
  { icon: RotateCcw, label: 'Returns', value: 'Within 7 days of delivery' },
];

function Product({ id }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const { add } = useCart();

  useEffect(() => {
    let controller;
    const fetchProduct = (background = false) => {
      controller?.abort();
      controller = new AbortController();
      if (!background) setError('');
      api(`/products/${id}`, { signal: controller.signal })
        .then(({ product: item }) => {
          if (controller.signal.aborted) return;
          setProduct(item);
          if (!background) activity('product_view', { productId: id });
        })
        .catch((requestError) => {
          if (!background && !controller.signal.aborted) setError(requestError.message);
        });
    };
    const refresh = () => { if (!document.hidden) fetchProduct(true); };
    fetchProduct();
    const timer = window.setInterval(refresh, 60000);
    document.addEventListener('visibilitychange', refresh);
    return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', refresh); controller?.abort(); };
  }, [id]);

  if (error) return <div role="alert"><ErrorMessage>{error}</ErrorMessage></div>;
  if (!product) return <Spinner label="Loading product…" />;

  return (
    <article className="card product-detail">
      <div className="product-detail-photo">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-detail-copy">
        <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
          <span>{product.category}</span>
          <Badge><span className="capitalize">{product.rarity}</span></Badge>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{product.name}</h1>
        <p className="mt-3 text-2xl font-semibold tabular-nums">{formatPeso(product.price)}</p>
        <p className="mt-5 leading-7 text-zinc-300">{product.description}</p>
        <section className="product-detail-preview" aria-labelledby="sample-details-heading">
          <h2 id="sample-details-heading">Sample shopping details</h2>
          <dl>
            {sampleDetails.map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <dt><Icon size={16} aria-hidden="true" /> {label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
        <div className="product-detail-actions">
          <Button type="button" disabled={!product.stock} onClick={() => add(product)}>
            <ShoppingBag size={17} aria-hidden="true" /> Add to cart
          </Button>
          <span className="text-sm text-zinc-400">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function ProductDetails() {
  const { id } = useParams();

  return (
    <div className="product-detail-shell">
      <Link to="/marketplace" className="product-detail-back">
        <ArrowLeft size={16} aria-hidden="true" /> Marketplace
      </Link>
      <Product key={id} id={id} />
    </div>
  );
}
