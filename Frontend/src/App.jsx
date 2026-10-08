import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Notification from './components/Notification';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Sarees = lazy(() => import('./pages/EthnicSuits'));
const Dresses = lazy(() => import('./pages/CasualOuterwear'));
const FootwearAccessories = lazy(() => import('./pages/FootwearAccessories'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Project = lazy(() => import('./pages/Project'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const SearchResults = lazy(() => import('./pages/SearchResults'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-3 border-border border-t-burgundy rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-muted">Loading...</p>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory dark:bg-[#1A1614]">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sarees" element={<Sarees />} />
            <Route path="/dresses" element={<Dresses />} />
            <Route path="/footwear-accessories" element={<FootwearAccessories />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project" element={<Project />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="*" element={
              <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                  <h1 className="font-serif text-4xl text-burgundy mb-4">404</h1>
                  <p className="text-muted">Page not found</p>
                </div>
              </div>
            } />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
      <Notification />
    </div>
  );
}
