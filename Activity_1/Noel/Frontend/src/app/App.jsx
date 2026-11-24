import { BrowserRouter, Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { PanelsTopLeft, ShoppingCart } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import WindowTitle from '../components/layout/WindowTitle';
import WindowStatus from '../components/layout/WindowStatus';
import { workspaceTabs } from '../components/layout/workspaceTabs';
import useWindowMotion from '../components/layout/useWindowMotion';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { CartProvider, useCart } from '../context/CartContext';
import { AdminRoute, ProtectedRoute, SellerRoute } from '../components/Routes';
import ErrorBoundary from '../components/ErrorBoundary';
import Marketplace from '../pages/Marketplace';
import HotDrops from '../pages/HotDrops';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Orders from '../pages/Orders';
import OrderReceipt from '../pages/OrderReceipt';
import Rewards from '../pages/Rewards';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Admin from '../pages/Admin';
import SellerDashboard from '../pages/SellerDashboard';
import SellerProductForm from '../pages/SellerProductForm';

function Home() {
  const { user, loading } = useAuth();
  if (loading) return <Login />;
  return user ? <Navigate to="/marketplace" replace /> : <Login />;
}

function ShopLayout() {
  const { pathname } = useLocation();
  const frame = useWindowMotion(pathname);
  const { items } = useCart();
  const [, page, detail] = pathname.split('/');
  const { title, icon } = workspaceTabs[page] ?? { title: 'STASH' };
  const centered = ['products', 'hot-drops', 'cart', 'seller'].includes(page) || (page === 'orders' && !detail);

  return (
    <div className={centered ? 'shop-layout shop-layout-centered' : 'shop-layout'}>
      <Navbar />
      <main className="shell">
        <div className="desktop-window" ref={frame}>
          <WindowTitle title={title} icon={icon} />
          <div className="desktop-window-content"><Outlet /></div>
          <WindowStatus>
            <span><PanelsTopLeft size={14} aria-hidden="true" /> STASH / {title}</span>
            {page !== 'cart' && (
              <Link to="/cart"><ShoppingCart size={14} aria-hidden="true" /> Cart ({items.reduce((total, item) => total + item.qty, 0)})</Link>
            )}
          </WindowStatus>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ShopLayout />}>
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/hot-drops" element={<HotDrops />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/:id" element={<OrderReceipt />} />
                </Route>
                <Route element={<AdminRoute />}>
                  <Route path="/admin/:section" element={<Admin />} />
                </Route>
                <Route element={<SellerRoute />}>
                  <Route path="/seller" element={<SellerDashboard />} />
                  <Route path="/seller/new" element={<SellerProductForm />} />
                  <Route path="/seller/:id/edit" element={<SellerProductForm />} />
                </Route>
              </Route>
              <Route path="*" element={<Navigate to="/marketplace" replace />} />
            </Routes>
          </ErrorBoundary>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
