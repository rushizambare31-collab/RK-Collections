import { Link } from 'react-router-dom';
import { useStore, getCartTotal, getCartCount, getCartOriginalTotal } from '../store/StoreContext';
import { useBodyLock } from '../hooks/useUtils';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Heart } from 'lucide-react';

export default function CartDrawer() {
  const { state, dispatch } = useStore();
  const { cart, cartDrawerOpen } = state;

  useBodyLock(cartDrawerOpen);

  const total = getCartTotal(cart);
  const originalTotal = getCartOriginalTotal(cart);
  const savings = originalTotal - total;
  const itemCount = getCartCount(cart);
  const freeDelivery = total >= 2000;

  if (!cartDrawerOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={() => dispatch({ type: 'CLOSE_CART_DRAWER' })}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-[#1A1614] z-50 flex flex-col shadow-2xl animate-slide-down">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-burgundy" />
            <h2 className="font-serif text-lg font-semibold text-dark">Your Cart</h2>
            <span className="text-sm text-muted">({itemCount} items)</span>
          </div>
          <button
            onClick={() => dispatch({ type: 'CLOSE_CART_DRAWER' })}
            className="p-1.5 text-muted hover:text-dark transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mb-4">
              <ShoppingBag size={32} className="text-muted/40" />
            </div>
            <h3 className="font-serif text-lg text-dark mb-2">Your cart is empty</h3>
            <p className="text-sm text-muted mb-6">Discover our premium collection and add something special.</p>
            <Link
              to="/sarees"
              onClick={() => dispatch({ type: 'CLOSE_CART_DRAWER' })}
              className="px-6 py-2.5 bg-burgundy text-white rounded-lg text-sm font-medium hover:bg-maroon transition-colors"
            >
              Explore Collections
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Free delivery progress */}
              {!freeDelivery && (
                <div className="bg-cream dark:bg-[#231F1B] rounded-lg p-3 mb-2">
                  <p className="text-xs text-muted mb-2">
                    Add ₹{(2000 - total).toLocaleString()} more for free delivery
                  </p>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((total / 2000) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {freeDelivery && (
                <div className="bg-success/10 text-success rounded-lg p-3 mb-2 text-xs font-medium text-center">
                  ✓ You qualify for free delivery!
                </div>
              )}

              {cart.map((item) => (
                <div key={item.key} className="flex gap-3 pb-4 border-b border-border/50 last:border-0">
                  {/* Image placeholder */}
                  <div className="w-20 h-24 rounded-lg bg-cream flex-shrink-0 overflow-hidden flex items-center justify-center">
                    <span className="text-muted/30 text-xs font-serif">A&A</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-dark leading-snug line-clamp-2">{item.product.name}</h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                      {item.size && <span>Size: {item.size}</span>}
                      {item.color && <span>Color: {item.color}</span>}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-semibold text-dark">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                      {/* Quantity */}
                      <div className="flex items-center gap-0 border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            item.quantity <= 1
                              ? dispatch({ type: 'REMOVE_FROM_CART', payload: item.key })
                              : dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { key: item.key, quantity: item.quantity - 1 } })
                          }
                          className="w-7 h-7 flex items-center justify-center text-muted hover:text-dark hover:bg-cream transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center text-xs font-medium text-dark">{item.quantity}</span>
                        <button
                          onClick={() => dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { key: item.key, quantity: item.quantity + 1 } })}
                          className="w-7 h-7 flex items-center justify-center text-muted hover:text-dark hover:bg-cream transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => {
                          dispatch({ type: 'TOGGLE_WISHLIST', payload: item.product.id });
                          dispatch({ type: 'REMOVE_FROM_CART', payload: item.key });
                        }}
                        className="text-xs text-muted hover:text-burgundy flex items-center gap-1 transition-colors"
                      >
                        <Heart size={11} /> Save
                      </button>
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.key })}
                        className="text-xs text-muted hover:text-error flex items-center gap-1 transition-colors"
                      >
                        <Trash2 size={11} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border p-5 space-y-3 bg-cream/30 dark:bg-[#231F1B]">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium text-dark">₹{total.toLocaleString()}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-success">You save</span>
                  <span className="text-success font-medium">-₹{savings.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted">Delivery</span>
                <span className="font-medium text-dark">{freeDelivery ? 'FREE' : '₹99'}</span>
              </div>
              <div className="flex justify-between text-base font-bold border-t border-border pt-3">
                <span className="text-dark">Total</span>
                <span className="text-burgundy">₹{(total + (freeDelivery ? 0 : 99)).toLocaleString()}</span>
              </div>
              <Link
                to="/checkout"
                onClick={() => dispatch({ type: 'CLOSE_CART_DRAWER' })}
                className="flex items-center justify-center gap-2 w-full py-3 bg-burgundy text-white rounded-lg font-medium hover:bg-maroon transition-colors"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/sarees"
                onClick={() => dispatch({ type: 'CLOSE_CART_DRAWER' })}
                className="block text-center text-sm text-muted hover:text-burgundy transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
