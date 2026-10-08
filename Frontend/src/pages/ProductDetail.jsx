import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Minus, Plus, ChevronRight, Truck, RotateCcw, Shield, Check, Package } from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { useStore } from '../store/StoreContext';
import ProductCard from '../components/ProductCard';
import { useScrollReveal } from '../hooks/useUtils';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const product = useMemo(() => getProductById(id), [id]);
  const related = useMemo(() => (product ? getRelatedProducts(product, 4) : []), [product]);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImage, setActiveImage] = useState(0);

  // Naya product khulne par pehli image, size, color reset ho
  useEffect(() => {
    setActiveImage(0);
    setSelectedSize(null);
    setSelectedColor(null);
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl text-dark mb-2">Product Not Found</h2>
          <p className="text-muted mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/sarees" className="px-6 py-2.5 bg-burgundy text-white rounded-lg text-sm font-medium">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = state.wishlist.includes(product.id);
  const price = product.price ?? 0;
  const discountPercent =
    product.discount ||
    (product.originalPrice
      ? Math.round(((product.originalPrice - price) / product.originalPrice) * 100)
      : 0);

  // Gallery ke liye images ki list: images array, nahi to thumbnail
  // thumbnail sabse pehle, phir images; sirf http(s) links, duplicate hata ke
  const images = [
    ...new Set(
      [product.thumbnail, ...(product.images || [])].filter(
        (src) => typeof src === 'string' && src.startsWith('http')
      )
    ),
  ];

  function handleAddToCart() {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        size: selectedSize || product.sizes?.[0] || null,
        color: selectedColor || product.colors?.[0] || null,
        quantity,
      },
    });
  }

  function handleBuyNow() {
    handleAddToCart();
    navigate('/checkout');
  }

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'details', label: 'Details' },
    { id: 'sizeguide', label: 'Size Guide' },
    { id: 'shipping', label: 'Shipping & Returns' },
    { id: 'reviews', label: `Reviews (${product.reviews?.length || 0})` },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-cream/50 dark:bg-[#1E1A16] border-b border-border">
        <div className="container-main py-3 flex items-center gap-2 text-xs text-muted overflow-x-auto">
          <Link to="/" className="hover:text-burgundy transition-colors whitespace-nowrap">Home</Link>
          <ChevronRight size={12} />
          <Link
            to={`/${product.collection === 'sarees' ? 'sarees' : product.collection === 'dresses' ? 'dresses' : 'footwear-accessories'}`}
            className="hover:text-burgundy transition-colors whitespace-nowrap capitalize"
          >
            {(product.category || '').replace(/-/g, ' ')}
          </Link>
          <ChevronRight size={12} />
          <span className="text-dark font-medium truncate">{product.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-8 md:py-14">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-8 md:gap-14">
            {/* Image Gallery */}
            <div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-cream-dark via-cream to-ivory border border-border/50 relative">
                {/* Fallback (image load na ho to ye dikhega) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-serif text-5xl text-burgundy/15 font-bold">A&A</span>
                  <p className="text-sm text-muted/40 mt-2">{product.name}</p>
                </div>

                {/* Main image */}
                {images[activeImage] && (
                  <img
                    key={images[activeImage]}
                    src={images[activeImage]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {product.isNew && (
                    <span className="px-3 py-1 bg-burgundy text-white text-xs font-semibold tracking-wider rounded">NEW</span>
                  )}
                  {discountPercent > 0 && (
                    <span className="px-3 py-1 bg-gold text-dark text-xs font-semibold rounded">-{discountPercent}%</span>
                  )}
                </div>
              </div>

              {/* Thumbnail row */}
              {images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      className={`w-16 h-20 rounded-lg flex-shrink-0 overflow-hidden border transition-all ${i === activeImage
                          ? 'border-burgundy ring-1 ring-burgundy/30'
                          : 'border-border hover:border-burgundy'
                        }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.visibility = 'hidden';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">
                {(product.brand || product.category || '').replace(/-/g, ' ')}
              </p>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-dark mb-3 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        fill={star <= Math.round(product.rating) ? '#C5A24A' : 'none'}
                        stroke="#C5A24A"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted">{product.rating} ({product.reviewCount} reviews)</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-dark">₹{price.toLocaleString()}</span>
                {product.originalPrice && product.originalPrice > price && (
                  <>
                    <span className="text-lg text-muted line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="px-2 py-0.5 bg-success/10 text-success text-xs font-semibold rounded">
                      Save ₹{(product.originalPrice - price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              {/* Short description */}
              <p className="text-muted leading-relaxed mb-6 text-sm md:text-base">
                {product.shortDescription}
              </p>

              {/* Color options */}
              {product.colorOptions && product.colorOptions.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-dark mb-3">
                    Color: <span className="text-muted font-normal">{selectedColor || product.colors?.[0]}</span>
                  </p>
                  <div className="flex gap-2">
                    {product.colorOptions.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-9 h-9 rounded-full border-2 transition-all ${(selectedColor || product.colors?.[0]) === color.name
                            ? 'border-burgundy ring-2 ring-burgundy/20'
                            : 'border-border hover:border-muted'
                          }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size options */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-dark mb-3">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2.5 border rounded-lg text-sm font-medium transition-all ${(selectedSize || product.sizes[0]) === size
                            ? 'bg-burgundy text-white border-burgundy'
                            : 'border-border text-dark hover:border-burgundy hover:text-burgundy'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-sm font-medium text-dark mb-3">Quantity</p>
                <div className="flex items-center gap-0 border border-border rounded-lg w-fit overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-muted hover:text-dark hover:bg-cream transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center text-sm font-medium text-dark border-x border-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-muted hover:text-dark hover:bg-cream transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {product.stock <= 5 && product.stock > 0 && (
                  <p className="text-xs text-warning mt-2">Only {product.stock} left in stock!</p>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-burgundy text-white rounded-lg font-semibold hover:bg-maroon transition-colors"
                >
                  <ShoppingBag size={18} />
                  ADD TO CART
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gold text-dark rounded-lg font-semibold hover:bg-gold-light transition-colors"
                >
                  BUY NOW
                </button>
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_WISHLIST', payload: product.id })}
                  className={`w-12 h-12 flex items-center justify-center border rounded-lg transition-all ${isWishlisted
                      ? 'bg-burgundy text-white border-burgundy'
                      : 'border-border text-muted hover:border-burgundy hover:text-burgundy'
                    }`}
                >
                  <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Quick info */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: <Truck size={16} />, text: product.deliveryInfo?.freeDelivery ? 'Free Delivery' : 'Delivery ₹99', sub: product.deliveryInfo?.estimatedDelivery || '3-5 days' },
                  { icon: <RotateCcw size={16} />, text: 'Easy Returns', sub: `${product.deliveryInfo?.returnWindow || '7 days'} return` },
                  { icon: <Shield size={16} />, text: 'Genuine Product', sub: '100% Authentic' },
                  { icon: <Package size={16} />, text: product.stock > 0 ? 'In Stock' : 'Out of Stock', sub: product.sku || '' },
                ].map((info, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 bg-cream/50 dark:bg-[#231F1B] rounded-lg">
                    <span className="text-gold mt-0.5">{info.icon}</span>
                    <div>
                      <p className="text-xs font-medium text-dark">{info.text}</p>
                      <p className="text-[10px] text-muted">{info.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-t border-border">
        <div className="container-main">
          <div className="flex overflow-x-auto border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors relative ${activeTab === tab.id ? 'text-burgundy' : 'text-muted hover:text-dark'
                  }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
                )}
              </button>
            ))}
          </div>

          <div className="py-8 md:py-12">
            {activeTab === 'description' && (
              <div className="max-w-3xl space-y-4">
                <p className="text-muted leading-relaxed">{product.description}</p>
                {product.highlights && (
                  <div className="mt-6">
                    <h3 className="font-serif text-lg font-semibold text-dark mb-4">Highlights</h3>
                    <ul className="space-y-2">
                      {product.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted">
                          <Check size={14} className="text-gold flex-shrink-0" /> {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'details' && (
              <div className="max-w-3xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.specifications && Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-sm text-muted capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-sm font-medium text-dark">{val}</span>
                    </div>
                  ))}
                  {product.material && (
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-sm text-muted">Material</span>
                      <span className="text-sm font-medium text-dark">{product.material}</span>
                    </div>
                  )}
                  {product.fit && (
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-sm text-muted">Fit</span>
                      <span className="text-sm font-medium text-dark">{product.fit}</span>
                    </div>
                  )}
                </div>
                {product.careInstructions && (
                  <div className="mt-8">
                    <h3 className="font-serif text-lg font-semibold text-dark mb-4">Care Instructions</h3>
                    <ul className="space-y-2">
                      {product.careInstructions.map((c, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted">
                          <Check size={14} className="text-gold flex-shrink-0" /> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'sizeguide' && (
              <div className="max-w-2xl">
                <h3 className="font-serif text-lg font-semibold text-dark mb-6">Size Guide</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-cream dark:bg-[#231F1B]">
                        <th className="px-4 py-3 text-left text-muted font-medium">Size</th>
                        <th className="px-4 py-3 text-left text-muted font-medium">Chest (in)</th>
                        <th className="px-4 py-3 text-left text-muted font-medium">Waist (in)</th>
                        <th className="px-4 py-3 text-left text-muted font-medium">Length (in)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        ['S', '36-38', '30-32', '27'],
                        ['M', '38-40', '32-34', '28'],
                        ['L', '40-42', '34-36', '29'],
                        ['XL', '42-44', '36-38', '30'],
                        ['XXL', '44-46', '38-40', '31'],
                      ].map(([size, chest, waist, length]) => (
                        <tr key={size} className="hover:bg-cream/50 dark:hover:bg-[#231F1B]">
                          <td className="px-4 py-3 font-medium text-dark">{size}</td>
                          <td className="px-4 py-3 text-muted">{chest}</td>
                          <td className="px-4 py-3 text-muted">{waist}</td>
                          <td className="px-4 py-3 text-muted">{length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-dark mb-3">Delivery Information</h3>
                  <ul className="space-y-2 text-sm text-muted">
                    <li className="flex items-center gap-2"><Truck size={14} className="text-gold" /> Free delivery on orders above ₹2,000</li>
                    <li className="flex items-center gap-2"><Package size={14} className="text-gold" /> Estimated delivery: {product.deliveryInfo?.estimatedDelivery || '3-5 business days'}</li>
                    <li className="flex items-center gap-2"><Shield size={14} className="text-gold" /> Secure packaging guaranteed</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-dark mb-3">Return Policy</h3>
                  <ul className="space-y-2 text-sm text-muted">
                    <li className="flex items-center gap-2"><RotateCcw size={14} className="text-gold" /> Easy {product.deliveryInfo?.returnWindow || '7 day'} returns</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-gold" /> Products must be unused with tags</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-gold" /> Refund within 5-7 business days</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-3xl">
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="pb-6 border-b border-border/50 last:border-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy text-sm font-semibold">
                            {review.user.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-dark">{review.user}</p>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} size={11} fill={s <= review.rating ? '#C5A24A' : 'none'} stroke="#C5A24A" />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-muted ml-auto">{review.date}</span>
                        </div>
                        <h4 className="text-sm font-medium text-dark mb-1">{review.title}</h4>
                        <p className="text-sm text-muted">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted text-center py-8">No reviews yet. Be the first to review!</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-12 md:py-16 bg-cream/30 dark:bg-[#1E1A16]">
          <div className="container-main">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-dark mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
