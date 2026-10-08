import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = useMemo(() => searchProducts(query), [query]);

  return (
    <div className="py-10 md:py-16">
      <div className="container-main">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-bold text-dark mb-2">
            Search Results
          </h1>
          <p className="text-muted text-sm">
            {results.length} results for "<span className="text-dark font-medium">{query}</span>"
          </p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-muted/40" />
            </div>
            <h3 className="font-serif text-xl text-dark mb-2">No results found</h3>
            <p className="text-sm text-muted mb-6">Try different search terms or browse our collections</p>
            <Link to="/ethnic-suits" className="px-6 py-2.5 bg-burgundy text-white rounded-lg text-sm font-medium inline-block">
              Browse Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {results.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
