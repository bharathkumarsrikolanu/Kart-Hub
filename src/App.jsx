import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';

import { Header } from './components/Header.jsx';
import { SubHeader } from './components/SubHeader.jsx';
import { Footer } from './components/Footer.jsx';

import { HomePage } from './pages/HomePage.jsx';
import { ProductPage } from './pages/ProductPage.jsx';
import { CategoryPage } from './pages/CategoryPage.jsx';
import { CartPage } from './pages/CartPage.jsx';
import { CheckoutPage } from './pages/CheckoutPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { AccountPage } from './pages/AccountPage.jsx';
import { OrdersPage } from './pages/OrdersPage.jsx';
import { OrderSuccessPage } from './pages/OrderSuccessPage.jsx';
import { AdminPage } from './pages/AdminPage.jsx';
import { SearchPage } from './pages/SearchPage.jsx';
import { DealsPage } from './pages/DealsPage.jsx';
import { WishlistPage } from './pages/WishlistPage.jsx';

function parseHash(hash) {
  const clean = hash.replace(/^#/, '') || '/';
  const [path, queryString] = clean.split('?');
  const query = {};
  if (queryString) {
    new URLSearchParams(queryString).forEach((val, key) => {
      query[key] = val;
    });
  }
  return { path, query };
}

export function App() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      setRoute(parseHash(window.location.hash));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (newPath) => {
    window.location.hash = newPath;
  };

  const renderContent = () => {
    const { path, query } = route;

    if (path === '/') return <HomePage navigate={navigate} />;
    if (path === '/cart') return <CartPage navigate={navigate} />;
    if (path === '/checkout') return <CheckoutPage navigate={navigate} />;
    if (path === '/login') return <LoginPage query={query} navigate={navigate} />;
    if (path === '/account') return <AccountPage navigate={navigate} />;
    if (path === '/orders') return <OrdersPage navigate={navigate} />;
    if (path === '/deals') return <DealsPage navigate={navigate} />;
    if (path === '/wishlist') return <WishlistPage navigate={navigate} />;
    if (path === '/admin') return <AdminPage navigate={navigate} />;
    if (path === '/search') return <SearchPage query={query} navigate={navigate} />;

    if (path.startsWith('/product/')) {
      const id = path.replace('/product/', '');
      return <ProductPage params={{ id }} navigate={navigate} />;
    }

    if (path.startsWith('/category/')) {
      const name = path.replace('/category/', '');
      return <CategoryPage params={{ name }} query={query} navigate={navigate} />;
    }

    if (path.startsWith('/order-success/')) {
      const id = path.replace('/order-success/', '');
      return <OrderSuccessPage params={{ id }} navigate={navigate} />;
    }

    return <HomePage navigate={navigate} />;
  };

  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <div className="karthub-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header navigate={navigate} currentRoute={route.path} />
            <SubHeader navigate={navigate} currentRoute={route.path} />
            <main style={{ flex: 1 }}>
              {renderContent()}
            </main>
            <Footer navigate={navigate} />
          </div>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
