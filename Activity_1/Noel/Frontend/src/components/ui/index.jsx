import { Link } from 'react-router-dom';
import { PackageOpen, ShoppingCart } from 'lucide-react';
import { formatPeso } from '../../lib/currency';
import { PixelFile } from './PixelIcons';
import { imageSrc } from '../../lib/api';

export const Button = ({ children, variant = 'primary', ...props }) => <button className={variant === 'primary' ? 'btn-primary' : 'btn-secondary'} {...props}>{children}</button>;
export const Input = (props) => <input className="control" {...props} />;
export const Select = ({ children, ...props }) => <select className="control" {...props}>{children}</select>;
export const Badge = ({ children, tone = 'default' }) => <span className="desktop-label" data-tone={tone}>{children}</span>;
export const PageHeader = ({ title, eyebrow, icon: Icon, children }) => <div className="desktop-page-heading"><div>{eyebrow && <p className="eyebrow mb-1">{eyebrow}</p>}<h1 className="flex items-center gap-2 text-3xl font-semibold">{Icon && <Icon size={24} aria-hidden="true" />}{title}</h1></div>{children}</div>;
export const Spinner = ({ label = 'Loading products…' }) => <div className="py-16 text-center text-black"><span className="inline-block h-7 w-7 desktop-loader animate-spin border-2"/><p className="mt-3 text-sm">{label}</p></div>;
export const EmptyState = ({ children = 'Nothing to show.' }) => <div className="card grid min-h-48 place-items-center p-8 text-center"><div><PackageOpen className="mx-auto mb-3 text-black" size={32}/><p className="text-black">{children}</p></div></div>;
export const ErrorMessage = ({ children }) => <p className="mb-5 desktop-error p-3.5 text-sm">{children}</p>;

export const ProductCard = ({ product, onAdd, children, featured = false }) => {
  const stockText = product.stock === 0 ? 'Out of stock' : product.stock < 5 ? `${product.stock} left` : 'In stock';
  const stockTone = product.stock === 0 || product.stock < 5 ? 'warn' : 'good';
  const heatTone = 'text-black';
  return (
    <article className="card product-card">
      <div className="product-card-titlebar">
        <PixelFile size={15} />
        <Link to={`/products/${product._id}`} className="product-card-link">{product.name}</Link>
      </div>
      <div className="product-card-photo">
        <img src={imageSrc(product.imageUrl)} alt={product.name} />
        {featured && <span className="product-pick-sticker"><span><strong>STASH PICK!</strong></span></span>}
      </div>
      <div className="product-card-copy">
        <div className="product-card-meta">
          <span>{product.category} · <span className="capitalize">{product.rarity}</span></span>
          <strong>{formatPeso(product.price)}</strong>
        </div>
        <p className="product-card-condition">
          <span>{product.status ?? 'VERIFIED'}</span>
          {typeof product.heat === 'number' && <span className={heatTone}>HEAT {product.heat}</span>}
        </p>
        <p className="line-clamp-2 text-sm leading-5 text-black">{product.description}</p>
        {product.seller && <p className="text-sm text-black">Sold by {product.seller.name}</p>}
        {children}
      </div>
      <div className="product-card-status">
        <Badge tone={stockTone}>{stockText}</Badge>
        <Button disabled={!product.stock || product.isOwner} onClick={() => onAdd(product)}><ShoppingCart size={15} aria-hidden="true" /> {product.isOwner ? 'Your listing' : 'Add'}</Button>
      </div>
    </article>
  );
};
