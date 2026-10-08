import { Link } from 'react-router-dom';
import { useStore, getCartTotal, getCartCount, getCartOriginalTotal } from '../store/StoreContext';
import { Minus, Plus, Trash2, Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { state, dispatch } = useStore();
  const { cart } = state;
  const total = getCartTotal(cart);
  const originalTotal = getCartOriginalTotal(cart);
  const savings = originalTotal - total;
  const freeDelivery = total >= 2000;
  const deliveryCharge = freeDelivery ? 0 : 99;

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="container-main">
          <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={32} className="text-muted/40" />
          </div>
          <h1 className="font-serif text-2xl text-dark mb-2">Your Cart is Empty</h1>
          <p className="text-sm text-muted mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/sarees" className="px-6 py-2.5 bg-burgundy text-white rounded-lg text-sm font-medium hover:bg-maroon transition-colors inline-block">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-16">
      <div className="container-main">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.key} className="flex gap-4 md:gap-6 p-4 md:p-6 bg-white dark:bg-[#231F1B] rounded-xl border border-border/50">
                <div className="w-20 h-24 md:w-28 md:h-32 rounded-lg bg-cream flex-shrink-0 flex items-center justify-center">
                  <span className="text-muted/30 font-serif text-sm">A&A</span>
                </div>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.id}`} className="text-sm md:text-base font-medium text-dark hover:text-burgundy transition-colors line-clamp-2">
                    {item.product.name}
                  </Link>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted">
                    {item.size && <span>Size: {item.size}</span>}
                    {item.color && <span>Color: {item.color}</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-dark">₹{item.product.price.toLocaleString()}</span>
                    {item.product.originalPrice > item.product.price && (
                      <span className="text-sm text-muted line-through">₹{item.product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          item.quantity <= 1
                            ? dispatch({ type: 'REMOVE_FROM_CART', payload: item.key })
                            : dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { key: item.key, quantity: item.quantity - 1 } })
                        }
                        className="w-9 h-9 flex items-center justify-center text-muted hover:text-dark hover:bg-cream transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 h-9 flex items-center justify-center text-sm font-medium border-x border-border">{item.quantity}</span>
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { key: item.key, quantity: item.quantity + 1 } })}
                        className="w-9 h-9 flex items-center justify-center text-muted hover:text-dark hover:bg-cream transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          dispatch({ type: 'TOGGLE_WISHLIST', payload: item.product.id });
                          dispatch({ type: 'REMOVE_FROM_CART', payload: item.key });
                        }}
                        className="text-xs text-muted hover:text-burgundy flex items-center gap-1"
                      >
                        <Heart size={13} /> Save
                      </button>
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.key })}
                        className="text-xs text-muted hover:text-error flex items-center gap-1"
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-36 bg-white dark:bg-[#231F1B] rounded-xl border border-border/50 p-6">
              <h2 className="font-serif text-lg font-semibold text-dark mb-6">Order Summary</h2>
              <div className="space-y-3 pb-4 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal ({getCartCount(cart)} items)</span>
                  <span className="text-dark font-medium">₹{total.toLocaleString()}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-success">Discount</span>
                    <span className="text-success font-medium">-₹{savings.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Delivery</span>
                  <span className={`font-medium ${freeDelivery ? 'text-success' : 'text-dark'}`}>
                    {freeDelivery ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-bold pt-4 mb-6">
                <span className="text-dark">Total</span>
                <span className="text-burgundy">₹{(total + deliveryCharge).toLocaleString()}</span>
              </div>
              {!freeDelivery && (
                <p className="text-xs text-muted mb-4 bg-cream dark:bg-[#1A1614] p-3 rounded-lg">
                  Add ₹{(2000 - total).toLocaleString()} more for free delivery
                </p>
              )}
              <Link
                to="/checkout"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-burgundy text-white rounded-lg font-semibold hover:bg-maroon transition-colors"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
              <Link to="/sarees" className="block text-center text-sm text-muted hover:text-burgundy mt-4 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
