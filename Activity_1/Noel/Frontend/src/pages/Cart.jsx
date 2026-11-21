import { useState } from 'react';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button, EmptyState, ErrorMessage, PageHeader } from '../components/ui';
import { formatPeso } from '../lib/currency';

function CartItem({ item, disabled, onSelect, onUpdate, onRemove }) {
  const quantityLimit = Math.min(item.stock, 20);

  return (
    <li className="cart-row">
      <div className="cart-product">
        <input type="checkbox" aria-label={`Select ${item.name}`} checked={item.selected !== false} disabled={disabled} onChange={(event) => onSelect([item._id], event.target.checked)} />
        <Link to={`/products/${item._id}`} className="cart-product-link">
          <img src={item.imageUrl} alt="" />
          <span><strong>{item.name}</strong><small>{item.category}</small></span>
        </Link>
      </div>
      <div className="cart-price"><span className="cart-mobile-label">Unit price</span>{formatPeso(item.price)}</div>
      <div className="cart-quantity">
        <span className="cart-mobile-label">Quantity</span>
        <div className="cart-stepper">
          <button type="button" aria-label={`Remove one ${item.name}`} disabled={disabled || item.qty <= 1} onClick={() => onUpdate(item._id, item.qty - 1)}><Minus size={15} aria-hidden="true" /></button>
          <span>{item.qty}</span>
          <button type="button" aria-label={`Add one ${item.name}`} disabled={disabled || item.qty >= quantityLimit} onClick={() => onUpdate(item._id, item.qty + 1)}><Plus size={15} aria-hidden="true" /></button>
        </div>
      </div>
      <div className="cart-line-total"><span className="cart-mobile-label">Total</span>{formatPeso(item.price * item.qty)}</div>
      <button type="button" className="cart-remove" aria-label={`Remove ${item.name} from cart`} disabled={disabled} onClick={() => onRemove([item._id])}>
        <Trash2 size={16} aria-hidden="true" /> Remove
      </button>
    </li>
  );
}

export default function Cart() {
  const { items, update, selectItems, removeItems } = useCart();
  const { user, loading } = useAuth();
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const selected = items.filter((item) => item.selected !== false);
  const selectedCount = selected.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = selected.reduce((sum, item) => sum + item.price * item.qty, 0);
  const brokerageFee = Math.round(subtotal * 0.025 * 100) / 100;
  const total = subtotal + brokerageFee;
  const allSelected = selected.length === items.length;

  async function order() {
    if (pending || !user || !selected.length) return;
    setError('');
    setPending(true);
    try {
      await api('/orders', {
        method: 'POST',
        body: JSON.stringify({ items: selected.map((item) => ({ productId: item._id, qty: item.qty })) }),
      });
      removeItems(selected.map((item) => item._id));
      navigate('/orders');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="shopping-cart">
      <PageHeader title="Shopping cart">
        <Link className="cart-continue" to="/marketplace"><ArrowLeft size={16} aria-hidden="true" /> Continue shopping</Link>
      </PageHeader>
      {items.length === 0 ? <EmptyState>Your cart is empty.</EmptyState> : (
        <>
          <div className="card cart-row cart-column-headings" aria-hidden="true">
            <span>Product</span><span>Unit price</span><span>Quantity</span><span>Total price</span><span>Actions</span>
          </div>
          <ul className="card cart-items" aria-label="Products in cart">
            {items.map((item) => <CartItem key={item._id} item={item} disabled={pending} onSelect={selectItems} onUpdate={update} onRemove={removeItems} />)}
          </ul>
          <section className="card cart-checkout" aria-label="Checkout summary" aria-busy={pending}>
            {error && <div role="alert"><ErrorMessage>{error}</ErrorMessage></div>}
            <div className="cart-checkout-row">
              <div className="cart-bulk-actions">
                <label>
                  <input type="checkbox" checked={allSelected} ref={(field) => { if (field) field.indeterminate = selected.length > 0 && !allSelected; }} disabled={pending} onChange={(event) => selectItems(items.map((item) => item._id), event.target.checked)} />
                  Select all ({items.length})
                </label>
                <button type="button" className="cart-remove" disabled={pending || !selected.length} onClick={() => removeItems(selected.map((item) => item._id))}>Remove selected</button>
              </div>
              <div className="cart-totals" aria-live="polite">
                <p>Total ({selectedCount} {selectedCount === 1 ? 'item' : 'items'}) <strong>{formatPeso(total)}</strong></p>
                <p className="cart-fee">Brokerage fee included: {formatPeso(brokerageFee)}</p>
                {user?.points >= 250 && <p className="cart-fee">Silent Checkout active</p>}
              </div>
              {user || loading || !selected.length
                ? <Button type="button" disabled={pending || loading || !selected.length} onClick={order}>{pending ? 'Placing order…' : 'Check out'}</Button>
                : <Link className="btn-primary" to="/login" state={{ from: '/cart' }}>Log in to checkout</Link>}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
