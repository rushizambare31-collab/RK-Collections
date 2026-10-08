import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore, getCartCount } from '../store/StoreContext';
import { searchProducts } from '../data/products';
import { useDebounce, useBodyLock, useMediaQuery } from '../hooks/useUtils';
import ThemeToggle from './ThemeToggle';
import {
  Menu, X, Search, Heart, ShoppingBag, User, Sun, Moon,
  ChevronDown, ArrowRight, Phone, MapPin
} from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/ethnic-suits', label: 'Ethnic & Suits' },
  { path: '/casual-outerwear', label: 'Casual & Outerwear' },
  { path: '/footwear-accessories', label: 'Footwear & Accessories' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/project', label: 'Project' },
];

export default function Header() {
  const { state, dispatch } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1023px)');

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const searchRef = useRef(null);
  const accountRef = useRef(null);

  const cartCount = getCartCount(state.cart);
  const wishlistCount = state.wishlist.length;

  useBodyLock(state.mobileMenuOpen);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      setSearchResults(searchProducts(debouncedSearch).slice(0, 6));
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    dispatch({ type: 'CLOSE_MOBILE_MENU' });
    setSearchOpen(false);
    setSearchQuery('');
    setAccountMenuOpen(false);
  }, [location.pathname, dispatch]);

  // Click outside handlers
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-ivory dark:bg-[#1A1614]">
      {/* ANNOUNCEMENT BAR */}
      <div className="bg-burgundy text-white text-center py-2 px-4 text-xs sm:text-sm font-sans tracking-wide">
        <span className="opacity-90">FREE DELIVERY ON ORDERS ABOVE ₹2,000</span>
        <span className="mx-2 opacity-50">|</span>
        <span className="opacity-90 hidden sm:inline">AUTHENTIC INDIAN MENSWEAR</span>
        <span className="opacity-90 sm:hidden">AUTHENTIC MENSWEAR</span>
      </div>

      {/* MAIN HEADER */}
      <div className="border-b border-border bg-ivory dark:bg-[#1A1614]">
        <div className="container-main flex items-center justify-between h-16 md:h-20">
          {/* LEFT: Menu + Search (mobile) */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            {isTablet && (
              <button
                onClick={() => dispatch({ type: 'TOGGLE_MOBILE_MENU' })}
                className="p-2 text-dark hover:text-burgundy transition-colors"
                aria-label="Toggle menu"
                id="menu-toggle"
              >
                {state.mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            )}
            {!isTablet && (
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-dark hover:text-burgundy transition-colors"
                aria-label="Search"
                id="search-toggle"
              >
                <Search size={20} />
              </button>
            )}
          </div>

          {/* CENTER: Logo */}
          <Link to="/" className="flex flex-col items-center flex-shrink-0 group">
            <span className="font-serif text-lg md:text-2xl font-bold text-burgundy tracking-wider group-hover:text-maroon transition-colors">
              ABHI & ABHAY
            </span>
            <span className="text-[9px] md:text-[11px] tracking-[0.3em] text-muted font-sans uppercase -mt-0.5">
              Collections
            </span>
          </Link>

          {/* RIGHT: Icons */}
          <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
            {isMobile && (
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-dark hover:text-burgundy transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            )}

            <button
              onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
              className="p-2 text-dark hover:text-burgundy transition-colors hidden sm:block"
              aria-label="Toggle theme"
              id="theme-toggle"
            >
              {state.theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
            </button>

            <Link
              to="/wishlist"
              className="p-2 text-dark hover:text-burgundy transition-colors relative"
              aria-label="Wishlist"
              id="wishlist-nav"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-burgundy text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART_DRAWER' })}
              className="p-2 text-dark hover:text-burgundy transition-colors relative"
              aria-label="Cart"
              id="cart-toggle"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-burgundy text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account Dropdown */}
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="p-2 text-dark hover:text-burgundy transition-colors hidden sm:block"
                aria-label="Account"
                id="account-toggle"
              >
                <User size={20} />
              </button>
              {accountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-[#231F1B] rounded-lg shadow-xl border border-border py-2 animate-slide-down z-50">
                  {state.isLoggedIn ? (
                    <>
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-sm font-medium text-dark">{state.user?.name || 'User'}</p>
                        <p className="text-xs text-muted">{state.user?.email || ''}</p>
                      </div>
                      <Link to="/account" className="block px-4 py-2.5 text-sm text-dark hover:bg-cream transition-colors">My Profile</Link>
                      <Link to="/orders" className="block px-4 py-2.5 text-sm text-dark hover:bg-cream transition-colors">My Orders</Link>
                      <Link to="/wishlist" className="block px-4 py-2.5 text-sm text-dark hover:bg-cream transition-colors">Wishlist</Link>
                      <button
                        onClick={() => { dispatch({ type: 'LOGOUT' }); setAccountMenuOpen(false); }}
                        className="block w-full text-left px-4 py-2.5 text-sm text-error hover:bg-cream transition-colors"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/signin" className="block px-4 py-2.5 text-sm text-dark hover:bg-cream transition-colors">Sign In</Link>
                      <Link to="/signup" className="block px-4 py-2.5 text-sm text-dark hover:bg-cream transition-colors">Create Account</Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP NAVIGATION */}
      {!isTablet && (
        <nav className="border-b border-border bg-ivory dark:bg-[#1A1614]">
          <div className="container-main flex items-center justify-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3.5 text-sm font-medium transition-colors relative
                  ${location.pathname === link.path
                    ? 'text-burgundy'
                    : 'text-dark hover:text-burgundy'
                  }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold rounded-full" />
                )}
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <div ref={searchRef} className="absolute left-0 right-0 top-full bg-white dark:bg-[#231F1B] shadow-2xl border-b border-border z-50 animate-slide-down">
          <div className="container-main py-6">
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for kurtas, shirts, suits, accessories..."
                className="w-full pl-12 pr-12 py-3.5 bg-cream dark:bg-[#1A1614] border border-border rounded-lg text-dark placeholder-muted focus:outline-none focus:border-burgundy transition-colors"
                autoFocus
                id="search-input"
              />
              <button
                type="button"
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-dark"
              >
                <X size={18} />
              </button>
            </form>
            {searchResults.length > 0 && (
              <div className="max-w-2xl mx-auto mt-4 divide-y divide-border">
                {searchResults.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="flex items-center gap-4 py-3 hover:bg-cream/50 px-2 rounded transition-colors"
                  >
                    <div className="w-12 h-12 bg-cream rounded overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-cream-dark to-cream flex items-center justify-center text-muted text-xs">
                        {p.category.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-dark truncate">{p.name}</p>
                      <p className="text-xs text-muted capitalize">{p.category.replace(/-/g, ' ')}</p>
                    </div>
                    <span className="text-sm font-semibold text-burgundy">₹{p.price.toLocaleString()}</span>
                  </Link>
                ))}
              </div>
            )}
            {debouncedSearch.trim() && searchResults.length === 0 && (
              <p className="text-center text-muted text-sm mt-4">No products found for "{debouncedSearch}"</p>
            )}
          </div>
        </div>
      )}

      {/* MOBILE DRAWER */}
      {isTablet && (
        <>
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
              state.mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => dispatch({ type: 'CLOSE_MOBILE_MENU' })}
          />
          {/* Drawer */}
          <div
            className={`fixed top-0 left-0 h-full w-[300px] max-w-[85vw] bg-white dark:bg-[#1A1614] z-50 transform transition-transform duration-300 ease-out overflow-y-auto ${
              state.mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="p-5 border-b border-border flex items-center justify-between">
              <span className="font-serif text-lg font-bold text-burgundy">ABHI & ABHAY</span>
              <button onClick={() => dispatch({ type: 'CLOSE_MOBILE_MENU' })} className="p-1 text-dark">
                <X size={22} />
              </button>
            </div>
            <nav className="py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-6 py-3.5 text-sm font-medium transition-colors border-l-3 ${
                    location.pathname === link.path
                      ? 'text-burgundy border-gold bg-cream/50'
                      : 'text-dark hover:text-burgundy border-transparent hover:bg-cream/30'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="px-6 py-4 border-t border-border space-y-3">
              {!state.isLoggedIn ? (
                <>
                  <Link to="/signin" className="block w-full py-2.5 text-center bg-burgundy text-white rounded-lg text-sm font-medium hover:bg-maroon transition-colors">
                    Sign In
                  </Link>
                  <Link to="/signup" className="block w-full py-2.5 text-center border border-burgundy text-burgundy rounded-lg text-sm font-medium hover:bg-cream transition-colors">
                    Create Account
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/account" className="block px-2 py-2 text-sm text-dark hover:text-burgundy">My Account</Link>
                  <Link to="/orders" className="block px-2 py-2 text-sm text-dark hover:text-burgundy">My Orders</Link>
                  <button
                    onClick={() => dispatch({ type: 'LOGOUT' })}
                    className="block px-2 py-2 text-sm text-error"
                  >
                    Sign Out
                  </button>
                </>
              )}
              <button
                onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
                className="flex items-center gap-2 px-2 py-2 text-sm text-dark hover:text-burgundy"
              >
                {state.theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                {state.theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
