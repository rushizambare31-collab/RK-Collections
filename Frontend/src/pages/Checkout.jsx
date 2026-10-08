import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore, getCartTotal, getCartCount } from '../store/StoreContext';
import { MapPin, CreditCard, Banknote, Smartphone, Building, Truck, Check, Loader2, ArrowRight, ArrowLeft, LocateFixed } from 'lucide-react';

export default function Checkout() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const { cart } = state;
  const total = getCartTotal(cart);
  const freeDelivery = total >= 2000;
  const deliveryCharge = freeDelivery ? 0 : 99;
  const grandTotal = total + deliveryCharge;

  const [step, setStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', email: '' });
  const [addressInfo, setAddressInfo] = useState({ address: '', city: '', state: '', pincode: '' });
  const [locationStatus, setLocationStatus] = useState('idle'); // idle, loading, success, denied
  const [locationText, setLocationText] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [paymentDetails, setPaymentDetails] = useState({ upiId: '', cardNumber: '', cardHolder: '', expiry: '', cvv: '' });
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, verifying, success
  const [errors, setErrors] = useState({});

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center container-main">
        <h2 className="font-serif text-2xl text-dark mb-2">Nothing to Checkout</h2>
        <p className="text-muted text-sm mb-6">Your cart is empty. Add some products first.</p>
        <Link to="/ethnic-suits" className="px-6 py-2.5 bg-burgundy text-white rounded-lg text-sm font-medium inline-block">
          Browse Products
        </Link>
      </div>
    );
  }

  function validateStep1() {
    const e = {};
    if (!customerInfo.name.trim()) e.name = 'Name is required';
    if (!customerInfo.phone.trim() || customerInfo.phone.length < 10) e.phone = 'Valid phone number required';
    if (!customerInfo.email.trim() || !customerInfo.email.includes('@')) e.email = 'Valid email required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e = {};
    if (!addressInfo.address.trim()) e.address = 'Address is required';
    if (!addressInfo.city.trim()) e.city = 'City is required';
    if (!addressInfo.state.trim()) e.state = 'State is required';
    if (!addressInfo.pincode.trim() || addressInfo.pincode.length < 5) e.pincode = 'Valid pincode required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3) setStep(4);
  }

  function handleGetLocation() {
    if (!navigator.geolocation) {
      setLocationStatus('denied');
      setLocationText('Geolocation is not supported by your browser');
      return;
    }
    setLocationStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationStatus('success');
        setLocationText(`Location detected: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        // Attempt reverse geocoding via nominatim (free, no API key)
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.display_name) {
              setLocationText(data.display_name);
              const addr = data.address || {};
              setAddressInfo((prev) => ({
                ...prev,
                city: addr.city || addr.town || addr.village || prev.city,
                state: addr.state || prev.state,
                pincode: addr.postcode || prev.pincode,
              }));
            }
          })
          .catch(() => {});
      },
      (err) => {
        setLocationStatus('denied');
        setLocationText(err.code === 1 ? 'Location permission denied. Please enter address manually.' : 'Unable to detect location. Please enter address manually.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function handlePayment() {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('verifying');
      setTimeout(() => {
        setPaymentStatus('success');
        const orderNumber = `AAC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
        setTimeout(() => {
          dispatch({
            type: 'ADD_ORDER',
            payload: {
              id: orderNumber,
              items: cart.map((item) => ({
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
                size: item.size,
                color: item.color,
              })),
              total: grandTotal,
              paymentMethod,
              address: addressInfo,
              customer: customerInfo,
              date: new Date().toISOString(),
              status: 'confirmed',
            },
          });
          navigate('/order-confirmation');
        }, 1500);
      }, 1500);
    }, 1500);
  }

  const steps = [
    { num: 1, label: 'Customer Info' },
    { num: 2, label: 'Delivery Address' },
    { num: 3, label: 'Location' },
    { num: 4, label: 'Payment' },
  ];

  const paymentMethods = [
    { id: 'upi', label: 'UPI', icon: <Smartphone size={18} /> },
    { id: 'credit', label: 'Credit Card', icon: <CreditCard size={18} /> },
    { id: 'debit', label: 'Debit Card', icon: <CreditCard size={18} /> },
    { id: 'netbanking', label: 'Net Banking', icon: <Building size={18} /> },
    { id: 'cod', label: 'Cash on Delivery', icon: <Banknote size={18} /> },
  ];

  return (
    <div className="py-10 md:py-16">
      <div className="container-main">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-8">Checkout</h1>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-0 mb-10 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  step >= s.num ? 'bg-burgundy text-white' : 'bg-cream text-muted border border-border'
                }`}>
                  {step > s.num ? <Check size={16} /> : s.num}
                </div>
                <span className={`text-[10px] mt-1.5 whitespace-nowrap ${step >= s.num ? 'text-burgundy font-medium' : 'text-muted'}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-12 md:w-20 h-0.5 mx-1 mt-[-14px] ${step > s.num ? 'bg-burgundy' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form area */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-[#231F1B] rounded-xl border border-border/50 p-6 md:p-8">
              {/* Step 1: Customer Info */}
              {step === 1 && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-dark mb-6">Customer Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1.5">Full Name *</label>
                      <input type="text" value={customerInfo.name} onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        className={`w-full px-4 py-3 bg-cream/50 dark:bg-[#1A1614] border rounded-lg text-dark text-sm focus:outline-none focus:border-burgundy ${errors.name ? 'border-error' : 'border-border'}`} placeholder="Enter your full name" />
                      {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1.5">Phone Number *</label>
                      <input type="tel" value={customerInfo.phone} onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className={`w-full px-4 py-3 bg-cream/50 dark:bg-[#1A1614] border rounded-lg text-dark text-sm focus:outline-none focus:border-burgundy ${errors.phone ? 'border-error' : 'border-border'}`} placeholder="Enter phone number" />
                      {errors.phone && <p className="text-xs text-error mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1.5">Email Address *</label>
                      <input type="email" value={customerInfo.email} onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        className={`w-full px-4 py-3 bg-cream/50 dark:bg-[#1A1614] border rounded-lg text-dark text-sm focus:outline-none focus:border-burgundy ${errors.email ? 'border-error' : 'border-border'}`} placeholder="Enter email" />
                      {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Address */}
              {step === 2 && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-dark mb-6">Delivery Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1.5">Address *</label>
                      <textarea value={addressInfo.address} onChange={(e) => setAddressInfo({ ...addressInfo, address: e.target.value })} rows={3}
                        className={`w-full px-4 py-3 bg-cream/50 dark:bg-[#1A1614] border rounded-lg text-dark text-sm focus:outline-none focus:border-burgundy resize-none ${errors.address ? 'border-error' : 'border-border'}`} placeholder="House/Flat no., Street, Area" />
                      {errors.address && <p className="text-xs text-error mt-1">{errors.address}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1.5">City *</label>
                        <input type="text" value={addressInfo.city} onChange={(e) => setAddressInfo({ ...addressInfo, city: e.target.value })}
                          className={`w-full px-4 py-3 bg-cream/50 dark:bg-[#1A1614] border rounded-lg text-dark text-sm focus:outline-none focus:border-burgundy ${errors.city ? 'border-error' : 'border-border'}`} placeholder="City" />
                        {errors.city && <p className="text-xs text-error mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1.5">State *</label>
                        <input type="text" value={addressInfo.state} onChange={(e) => setAddressInfo({ ...addressInfo, state: e.target.value })}
                          className={`w-full px-4 py-3 bg-cream/50 dark:bg-[#1A1614] border rounded-lg text-dark text-sm focus:outline-none focus:border-burgundy ${errors.state ? 'border-error' : 'border-border'}`} placeholder="State" />
                        {errors.state && <p className="text-xs text-error mt-1">{errors.state}</p>}
                      </div>
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-dark mb-1.5">Pincode *</label>
                      <input type="text" value={addressInfo.pincode} onChange={(e) => setAddressInfo({ ...addressInfo, pincode: e.target.value })}
                        className={`w-full px-4 py-3 bg-cream/50 dark:bg-[#1A1614] border rounded-lg text-dark text-sm focus:outline-none focus:border-burgundy ${errors.pincode ? 'border-error' : 'border-border'}`} placeholder="Pincode" />
                      {errors.pincode && <p className="text-xs text-error mt-1">{errors.pincode}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Location */}
              {step === 3 && (
                <div>
                  <h2 className="font-serif text-xl font-semibold text-dark mb-6">Location Access</h2>
                  <div className="bg-cream/50 dark:bg-[#1A1614] rounded-xl p-6 md:p-8 text-center">
                    <MapPin size={40} className="text-gold mx-auto mb-4" />
                    <h3 className="font-serif text-lg text-dark mb-2">Detect Your Location</h3>
                    <p className="text-sm text-muted mb-6 max-w-md mx-auto">
                      Allow us to detect your location for accurate delivery information. You can also skip this step.
                    </p>
                    {locationStatus === 'idle' && (
                      <button onClick={handleGetLocation} className="flex items-center gap-2 mx-auto px-6 py-3 bg-burgundy text-white rounded-lg font-medium hover:bg-maroon transition-colors">
                        <LocateFixed size={18} /> Use My Current Location
                      </button>
                    )}
                    {locationStatus === 'loading' && (
                      <div className="flex items-center gap-2 justify-center text-burgundy">
                        <Loader2 size={18} className="animate-spin" /> Detecting location...
                      </div>
                    )}
                    {locationStatus === 'success' && (
                      <div className="bg-success/10 text-success rounded-lg p-4 mt-4 text-sm">
                        <Check size={18} className="inline mr-2" /> Current location detected
                        <p className="text-xs mt-1 text-success/80">{locationText}</p>
                      </div>
                    )}
                    {locationStatus === 'denied' && (
                      <div className="bg-warning/10 text-warning rounded-lg p-4 mt-4 text-sm">
                        {locationText}
                      </div>
                    )}
                    <p className="text-xs text-muted mt-6">Your location data is only used for delivery and is not stored permanently.</p>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {step === 4 && (
                <div>
                  {paymentStatus === 'idle' && (
                    <>
                      <h2 className="font-serif text-xl font-semibold text-dark mb-6">Payment Method</h2>
                      <div className="space-y-3 mb-8">
                        {paymentMethods.map((pm) => (
                          <label key={pm.id} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                            paymentMethod === pm.id ? 'border-burgundy bg-burgundy/5' : 'border-border hover:border-muted'
                          }`}>
                            <input type="radio" name="payment" value={pm.id} checked={paymentMethod === pm.id}
                              onChange={(e) => setPaymentMethod(e.target.value)} className="accent-burgundy" />
                            <span className="text-gold">{pm.icon}</span>
                            <span className="text-sm font-medium text-dark">{pm.label}</span>
                          </label>
                        ))}
                      </div>

                      {paymentMethod === 'upi' && (
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-dark mb-1.5">UPI ID</label>
                          <input type="text" value={paymentDetails.upiId} onChange={(e) => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })}
                            className="w-full px-4 py-3 bg-cream/50 dark:bg-[#1A1614] border border-border rounded-lg text-dark text-sm focus:outline-none focus:border-burgundy" placeholder="yourname@upi" />
                        </div>
                      )}

                      {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                        <div className="space-y-4 mb-6">
                          <div>
                            <label className="block text-sm font-medium text-dark mb-1.5">Card Number</label>
                            <input type="text" value={paymentDetails.cardNumber} onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })} maxLength={19}
                              className="w-full px-4 py-3 bg-cream/50 dark:bg-[#1A1614] border border-border rounded-lg text-dark text-sm focus:outline-none focus:border-burgundy" placeholder="XXXX XXXX XXXX XXXX" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-dark mb-1.5">Card Holder Name</label>
                            <input type="text" value={paymentDetails.cardHolder} onChange={(e) => setPaymentDetails({ ...paymentDetails, cardHolder: e.target.value })}
                              className="w-full px-4 py-3 bg-cream/50 dark:bg-[#1A1614] border border-border rounded-lg text-dark text-sm focus:outline-none focus:border-burgundy" placeholder="Name on card" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-dark mb-1.5">Expiry</label>
                              <input type="text" value={paymentDetails.expiry} onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })} maxLength={5}
                                className="w-full px-4 py-3 bg-cream/50 dark:bg-[#1A1614] border border-border rounded-lg text-dark text-sm focus:outline-none focus:border-burgundy" placeholder="MM/YY" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-dark mb-1.5">CVV</label>
                              <input type="password" value={paymentDetails.cvv} onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })} maxLength={4}
                                className="w-full px-4 py-3 bg-cream/50 dark:bg-[#1A1614] border border-border rounded-lg text-dark text-sm focus:outline-none focus:border-burgundy" placeholder="***" />
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'cod' && (
                        <div className="bg-cream/50 dark:bg-[#1A1614] rounded-lg p-4 mb-6 text-sm text-muted">
                          <p>Cash on Delivery available. Pay when your order arrives at your doorstep.</p>
                          <p className="text-xs mt-2">Note: A small COD handling fee of ₹49 may apply.</p>
                        </div>
                      )}

                      <p className="text-[10px] text-muted mb-4 bg-cream/50 dark:bg-[#1A1614] p-3 rounded-lg text-center">
                        ⚠️ This is a simulated payment for demonstration purposes only. No real transaction will occur.
                      </p>

                      <button onClick={handlePayment}
                        className="w-full py-3.5 bg-burgundy text-white rounded-lg font-semibold hover:bg-maroon transition-colors flex items-center justify-center gap-2">
                        PAY ₹{grandTotal.toLocaleString()} <ArrowRight size={16} />
                      </button>
                    </>
                  )}

                  {paymentStatus !== 'idle' && (
                    <div className="text-center py-12">
                      {paymentStatus === 'processing' && (
                        <div>
                          <Loader2 size={48} className="text-burgundy animate-spin mx-auto mb-4" />
                          <h3 className="font-serif text-xl text-dark mb-2">Processing Payment...</h3>
                          <p className="text-sm text-muted">Please wait while we process your payment</p>
                        </div>
                      )}
                      {paymentStatus === 'verifying' && (
                        <div>
                          <Loader2 size={48} className="text-gold animate-spin mx-auto mb-4" />
                          <h3 className="font-serif text-xl text-dark mb-2">Verifying Details...</h3>
                          <p className="text-sm text-muted">Almost there, confirming your order</p>
                        </div>
                      )}
                      {paymentStatus === 'success' && (
                        <div>
                          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                            <Check size={32} className="text-success" />
                          </div>
                          <h3 className="font-serif text-xl text-dark mb-2">Payment Successful ✓</h3>
                          <p className="text-sm text-muted">Redirecting to order confirmation...</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Navigation buttons */}
              {paymentStatus === 'idle' && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  {step > 1 ? (
                    <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-sm text-muted hover:text-dark transition-colors">
                      <ArrowLeft size={16} /> Back
                    </button>
                  ) : (
                    <Link to="/cart" className="flex items-center gap-1 text-sm text-muted hover:text-dark transition-colors">
                      <ArrowLeft size={16} /> Back to Cart
                    </Link>
                  )}
                  {step < 4 && (
                    <button onClick={handleNext} className="flex items-center gap-1 px-6 py-2.5 bg-burgundy text-white rounded-lg text-sm font-medium hover:bg-maroon transition-colors">
                      Next <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary sidebar */}
          <div>
            <div className="sticky top-36 bg-white dark:bg-[#231F1B] rounded-xl border border-border/50 p-6">
              <h2 className="font-serif text-lg font-semibold text-dark mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.key} className="flex items-center gap-3">
                    <div className="w-10 h-12 bg-cream rounded flex-shrink-0 flex items-center justify-center text-[8px] text-muted/30 font-serif">A&A</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-dark truncate">{item.product.name}</p>
                      <p className="text-[10px] text-muted">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-medium text-dark">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-dark">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Delivery</span>
                  <span className={freeDelivery ? 'text-success' : 'text-dark'}>{freeDelivery ? 'FREE' : `₹${deliveryCharge}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                  <span className="text-dark">Total</span>
                  <span className="text-burgundy">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
