import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/StoreContext';
import { getProductById } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { state, dispatch } = useStore();
  const wishlistProducts = state.wishlist
    .map((id) => getProductById(id))
    .filter(Boolean);

  return (
    <div className="py-10 md:py-16">
      <div className="container-main">
        <div className="text-center mb-10">
          <div className="ornament-divider mb-4">
            <div className="ornament-diamond" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-2">My Wishlist</h1>
          <p className="text-muted text-sm">{wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved</p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-muted/40" />
            </div>
            <h3 className="font-serif text-xl text-dark mb-2">Your wishlist is empty</h3>
            <p className="text-sm text-muted mb-6">Start adding products you love to your wishlist</p>
            <Link to="/ethnic-suits" className="px-6 py-2.5 bg-burgundy text-white rounded-lg text-sm font-medium hover:bg-maroon transition-colors inline-block">
              Browse Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlistProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
