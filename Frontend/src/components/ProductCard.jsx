import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useStore } from '../store/StoreContext';
import { useScrollReveal } from '../hooks/useUtils';

// Fallback gradient for missing product images
function ProductImageFallback({ category, className = '' }) {
  const colors = {
    'sarees': 'from-burgundy/20 to-gold/10',
    'dresses': 'from-maroon/20 to-burgundy/10',
    'footwear-accessories': 'from-gold/15 to-cream-dark',
  };

  const gradient = colors[category] || 'from-cream-dark to-cream';

  return (
    <div
      className={`bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}
    >
      <span className="text-muted/40 font-serif text-3xl font-bold">
        A&A
      </span>
    </div>
  );
}

export default function ProductCard({ product, index = 0 }) {
  const { state, dispatch } = useStore();
  const [ref, isVisible] = useScrollReveal(0.05);

  const isWishlisted = state.wishlist.includes(product.id);

  // Prefer thumbnail, otherwise use first image
  const productImage = product.thumbnail || product.images?.[0] || null;

  function handleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product.id });
  }

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        size: product.sizes?.[0] || null,
        color: product.colors?.[0] || null,
        quantity: 1,
      },
    });
  }

  const discountPercent =
    product.discount ||
    (product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0);

  return (
    <div
      ref={ref}
      className={`group bg-white dark:bg-[#231F1B] rounded-xl border border-border/60 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${(index % 6) * 80}ms` }}
    >
      {/* PRODUCT IMAGE */}
      <div className="relative aspect-[3/4] overflow-hidden bg-cream">
        <Link to={`/product/${product.id}`} className="absolute inset-0 block">
          {productImage ? (
            <img
              src={productImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.parentElement?.querySelector(
                  '.product-image-fallback'
                );
                fallback?.classList.remove('hidden');
              }}
            />
          ) : null}

          {/* Fallback */}
          <ProductImageFallback
            category={product.category}
            className={`product-image-fallback absolute inset-0 w-full h-full ${
              productImage ? 'hidden' : ''
            }`}
          />
        </Link>

        {/* DARK IMAGE OVERLAY */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none z-[1]" />

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
          {product.isNew && (
            <span className="px-2.5 py-1 bg-burgundy text-white text-[10px] font-semibold tracking-wider uppercase rounded">
              New
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2.5 py-1 bg-gold text-dark text-[10px] font-semibold rounded">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* WISHLIST */}
        <button
          type="button"
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 z-20 ${
            isWishlisted
              ? 'bg-burgundy text-white shadow-md'
              : 'bg-white/80 dark:bg-dark/80 text-dark dark:text-cream hover:bg-burgundy hover:text-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            fill={isWishlisted ? 'currentColor' : 'none'}
            className={isWishlisted ? 'animate-heart-beat' : ''}
          />
        </button>

        {/* QUICK ACTIONS */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-burgundy text-white text-xs font-medium rounded-lg hover:bg-maroon transition-colors"
            >
              <ShoppingBag size={14} />
              Add to Cart
            </button>

            <Link
              to={`/product/${product.id}`}
              className="w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-dark/90 text-dark dark:text-cream rounded-lg hover:bg-gold hover:text-dark transition-colors"
              aria-label="View product details"
            >
              <Eye size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* PRODUCT INFORMATION */}
      <Link to={`/product/${product.id}`} className="block p-4">
        <p className="text-[10px] uppercase tracking-wider text-muted mb-1">
          {(product.category || '').replace(/-/g, ' ')}
        </p>

        <h3 className="text-sm font-medium text-dark dark:text-cream leading-snug mb-2 line-clamp-2 group-hover:text-burgundy transition-colors">
          {product.name}
        </h3>

        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <Star size={12} fill="#C5A24A" stroke="#C5A24A" />
            <span className="text-xs text-muted">{product.rating}</span>
            {product.reviewCount && (
              <span className="text-xs text-muted/60">({product.reviewCount})</span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-dark dark:text-cream">
            ₹{(product.price ?? 0).toLocaleString()}
          </span>

          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-muted line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}