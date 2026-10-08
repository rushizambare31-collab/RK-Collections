import { Link } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import { CheckCircle, Package, CreditCard, MapPin, ArrowRight, ShoppingBag } from 'lucide-react';

export default function OrderConfirmation() {
  const { state } = useStore();
  const lastOrder = state.orders[0];

  if (!lastOrder) {
    return (
      <div className="py-20 text-center container-main">
        <h2 className="font-serif text-2xl text-dark mb-2">No Recent Orders</h2>
        <p className="text-muted text-sm mb-6">You don't have any confirmed orders.</p>
        <Link to="/" className="px-6 py-2.5 bg-burgundy text-white rounded-lg text-sm font-medium inline-block">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-20">
      <div className="container-main max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <CheckCircle size={40} className="text-success" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-3 animate-fade-in">
            Order Confirmed!
          </h1>
          <p className="text-muted animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Thank you for shopping with RK COLLECTIONS
          </p>
        </div>

        <div className="bg-white dark:bg-[#231F1B] rounded-xl border border-border/50 overflow-hidden animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {/* Order number */}
          <div className="bg-burgundy/5 dark:bg-burgundy/10 p-6 text-center border-b border-border">
            <p className="text-xs text-muted uppercase tracking-widest mb-1">Order Number</p>
            <p className="font-serif text-2xl font-bold text-burgundy">{lastOrder.id}</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Items */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
                <Package size={16} className="text-gold" /> Order Items
              </h3>
              <div className="space-y-2">
                {lastOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-border/30 last:border-0">
                    <div>
                      <p className="text-sm text-dark">{item.name}</p>
                      <p className="text-xs text-muted">Qty: {item.quantity}{item.size ? ` | Size: ${item.size}` : ''}</p>
                    </div>
                    <span className="text-sm font-medium text-dark">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between py-3 border-t border-border text-base font-bold">
              <span className="text-dark">Total Amount</span>
              <span className="text-burgundy">₹{lastOrder.total.toLocaleString()}</span>
            </div>

            {/* Payment */}
            <div className="flex items-center gap-2 text-sm">
              <CreditCard size={16} className="text-gold" />
              <span className="text-muted">Payment Method:</span>
              <span className="font-medium text-dark capitalize">{lastOrder.paymentMethod}</span>
            </div>

            {/* Address */}
            {lastOrder.address && (
              <div className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="text-gold mt-0.5" />
                <div>
                  <span className="text-muted">Delivery Address:</span>
                  <p className="text-dark mt-0.5">
                    {lastOrder.address.address}, {lastOrder.address.city}, {lastOrder.address.state} - {lastOrder.address.pincode}
                  </p>
                </div>
              </div>
            )}

            {/* Estimated delivery */}
            <div className="bg-cream/50 dark:bg-[#1A1614] rounded-lg p-4 text-center">
              <p className="text-xs text-muted uppercase tracking-wider mb-1">Estimated Delivery</p>
              <p className="text-sm font-semibold text-dark">3-5 Business Days</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Link to="/orders" className="flex items-center justify-center gap-2 px-6 py-3 bg-burgundy text-white rounded-lg font-medium hover:bg-maroon transition-colors">
            <ShoppingBag size={16} /> View Orders
          </Link>
          <Link to="/" className="flex items-center justify-center gap-2 px-6 py-3 border border-border text-dark rounded-lg font-medium hover:bg-cream transition-colors">
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </div>

        <p className="text-center text-[10px] text-muted mt-8">
          ⚠️ This is a simulated order for demonstration purposes. No actual purchase was made.
        </p>
      </div>
    </div>
  );
}
