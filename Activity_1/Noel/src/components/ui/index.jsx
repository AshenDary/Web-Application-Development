import { Link } from 'react-router-dom';
import { ArrowRight, PackageOpen } from 'lucide-react';

export const Button = ({ children, variant = 'primary', ...props }) => <button className={variant === 'primary' ? 'btn-primary' : 'btn-secondary'} {...props}>{children}</button>;
export const Input = (props) => <input className="control" {...props} />;
export const Select = ({ children, ...props }) => <select className="control" {...props}>{children}</select>;
export const Badge = ({ children, tone = 'default' }) => <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${tone === 'good' ? 'bg-emerald-400/10 text-emerald-200 ring-1 ring-inset ring-emerald-400/20' : tone === 'warn' ? 'bg-amber-400/10 text-amber-100 ring-1 ring-inset ring-amber-300/20' : 'bg-zinc-700/70 text-zinc-200'}`}>{children}</span>;
export const PageHeader = ({ title, eyebrow, children }) => <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div>{eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1></div>{children}</div>;
export const Spinner = () => <div className="py-16 text-center text-zinc-400"><span className="inline-block h-7 w-7 animate-spin rounded-full border-2 border-zinc-600 border-t-accent"/><p className="mt-3 text-sm">Loading products…</p></div>;
export const EmptyState = ({ children = 'Nothing to show.' }) => <div className="card grid min-h-48 place-items-center p-8 text-center"><div><PackageOpen className="mx-auto mb-3 text-zinc-500" size={32}/><p className="text-zinc-400">{children}</p></div></div>;
export const ErrorMessage = ({ children }) => <p className="mb-5 rounded-ui border border-red-400/20 bg-red-950/50 p-3.5 text-sm text-red-200">{children}</p>;

export const ProductCard = ({ product, onAdd }) => {
  const stockText = product.stock === 0 ? 'Out of stock' : product.stock < 5 ? `${product.stock} left` : 'In stock';
  const stockTone = product.stock === 0 || product.stock < 5 ? 'warn' : 'good';
  return <article className="card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-zinc-500 hover:shadow-cardHover">
    <Link to={`/products/${product._id}`} className="relative block overflow-hidden bg-ink"><img className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" src={product.imageUrl} alt={product.name}/><span className="absolute left-3 top-3 rounded-full bg-ink/75 px-2.5 py-1 text-xs font-medium capitalize text-zinc-100 backdrop-blur">{product.rarity}</span></Link>
    <div className="flex flex-1 flex-col p-5"><div className="mb-2 flex items-start justify-between gap-3"><div><p className="text-xs font-medium text-zinc-500">{product.category}</p><Link to={`/products/${product._id}`} className="mt-1 block font-semibold leading-tight text-zinc-100 hover:text-accent">{product.name}</Link></div><span className="whitespace-nowrap text-base font-semibold">${product.price.toLocaleString()}</span></div><p className="mb-5 line-clamp-2 text-sm leading-6 text-zinc-400">{product.description}</p><div className="mt-auto flex items-center justify-between gap-3"><Badge tone={stockTone}>{stockText}</Badge><Button disabled={!product.stock} onClick={() => onAdd(product)}>Add <ArrowRight size={15}/></Button></div></div>
  </article>;
};
