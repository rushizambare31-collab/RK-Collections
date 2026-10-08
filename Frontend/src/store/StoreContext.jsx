import { createContext, useContext, useReducer, useEffect } from 'react';

const StoreContext = createContext();

const initialState = {
  cart: [],
  wishlist: [],
  theme: 'light',
  searchQuery: '',
  mobileMenuOpen: false,
  cartDrawerOpen: false,
  wishlistDrawerOpen: false,
  filterDrawerOpen: false,
  user: null,
  isLoggedIn: false,
  orders: [],
  notification: null,
};

function loadFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore storage errors */
  }
}

function storeReducer(state, action) {
  switch (action.type) {
    /* ---- CART ---- */
    case 'ADD_TO_CART': {
      const { product, size, color, quantity = 1 } = action.payload;
      const key = `${product.id}-${size || 'default'}-${color || 'default'}`;
      const existing = state.cart.find((item) => item.key === key);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.key === key
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
          notification: { type: 'success', message: 'Updated cart quantity' },
        };
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          { key, product, size, color, quantity },
        ],
        notification: { type: 'success', message: `${product.name} added to cart` },
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.key !== action.payload),
        notification: { type: 'info', message: 'Item removed from cart' },
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.key === action.payload.key
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [], notification: { type: 'info', message: 'Cart cleared' } };

    /* ---- WISHLIST ---- */
    case 'TOGGLE_WISHLIST': {
      const productId = action.payload;
      const exists = state.wishlist.includes(productId);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((id) => id !== productId)
          : [...state.wishlist, productId],
        notification: {
          type: 'success',
          message: exists ? 'Removed from wishlist' : 'Added to wishlist',
        },
      };
    }

    /* ---- THEME ---- */
    case 'TOGGLE_THEME': {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      return { ...state, theme: newTheme };
    }

    /* ---- UI ---- */
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'TOGGLE_MOBILE_MENU':
      return { ...state, mobileMenuOpen: !state.mobileMenuOpen };
    case 'CLOSE_MOBILE_MENU':
      return { ...state, mobileMenuOpen: false };
    case 'TOGGLE_CART_DRAWER':
      return { ...state, cartDrawerOpen: !state.cartDrawerOpen };
    case 'CLOSE_CART_DRAWER':
      return { ...state, cartDrawerOpen: false };
    case 'TOGGLE_WISHLIST_DRAWER':
      return { ...state, wishlistDrawerOpen: !state.wishlistDrawerOpen };
    case 'TOGGLE_FILTER_DRAWER':
      return { ...state, filterDrawerOpen: !state.filterDrawerOpen };
    case 'CLOSE_FILTER_DRAWER':
      return { ...state, filterDrawerOpen: false };

    /* ---- AUTH (DEMO) ---- */
    case 'LOGIN':
      return { ...state, user: action.payload, isLoggedIn: true };
    case 'LOGOUT':
      return { ...state, user: null, isLoggedIn: false };

    /* ---- ORDERS ---- */
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        cart: [],
        notification: { type: 'success', message: 'Order placed successfully!' },
      };

    /* ---- NOTIFICATIONS ---- */
    case 'CLEAR_NOTIFICATION':
      return { ...state, notification: null };

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, {
    ...initialState,
    cart: loadFromStorage('aa_cart', []),
    wishlist: loadFromStorage('aa_wishlist', []),
    theme: loadFromStorage('aa_theme', 'light'),
    orders: loadFromStorage('aa_orders', []),
    user: loadFromStorage('aa_user', null),
    isLoggedIn: !!loadFromStorage('aa_user', null),
  });

  // Persist to localStorage
  useEffect(() => {
    saveToStorage('aa_cart', state.cart);
  }, [state.cart]);
  useEffect(() => {
    saveToStorage('aa_wishlist', state.wishlist);
  }, [state.wishlist]);
  useEffect(() => {
    saveToStorage('aa_theme', state.theme);
  }, [state.theme]);
  useEffect(() => {
    saveToStorage('aa_orders', state.orders);
  }, [state.orders]);
  useEffect(() => {
    saveToStorage('aa_user', state.user);
  }, [state.user]);

  // Apply theme to document
  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  // Auto-clear notification
  useEffect(() => {
    if (state.notification) {
      const timer = setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.notification]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
}

// Helper selectors
export const getCartTotal = (cart) =>
  cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

export const getCartCount = (cart) =>
  cart.reduce((sum, item) => sum + item.quantity, 0);

export const getCartOriginalTotal = (cart) =>
  cart.reduce((sum, item) => sum + (item.product.originalPrice || item.product.price) * item.quantity, 0);
