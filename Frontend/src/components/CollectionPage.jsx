import { useState, useMemo } from 'react';
import { Crown, SlidersHorizontal, Grid3X3, LayoutList, ChevronDown } from 'lucide-react';
import {
  getProductsByCollection, filterProducts, getUniqueCategories,
  getUniqueSubcategories, getUniqueSizes, getUniqueColors,
  getUniqueFabrics, getUniqueOccasions, getUniqueFits, getPriceRange,
  categoryDisplayNames,
} from '../data/products';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { useMediaQuery, useScrollReveal } from '../hooks/useUtils';

export default function CollectionPage({ collection, title, subtitle, description, heroGradient }) {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '', category: [], subcategory: [], size: [],
    color: [], fabric: [], occasion: [], fit: [],
    priceRange: null, rating: null, inStock: false, sort: 'popular',
  });

  const allProducts = useMemo(() => getProductsByCollection(collection), [collection]);
  const filteredProducts = useMemo(() => filterProducts(allProducts, filters), [allProducts, filters]);

  const categories = useMemo(() => getUniqueCategories(collection), [collection]);
  const subcategories = useMemo(() => getUniqueSubcategories(collection), [collection]);
  const sizes = getUniqueSizes();
  const colors = getUniqueColors();
  const fabrics = getUniqueFabrics();
  const occasions = getUniqueOccasions();
  const fits = getUniqueFits();
  const priceRange = getPriceRange(allProducts);

  const [heroRef, heroVisible] = useScrollReveal(0.1);

  const sortOptions = [
    { value: 'popular', label: 'Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  return (
    <div>
      {/* Hero */}
      {/* Hero */}
      <section
        className={`py-16 md:py-20 ${heroGradient || "bg-gradient-to-br from-maroon to-burgundy"
          } relative overflow-hidden`}
      >
        {/* Background Image */}
        <img
          src="PageBackground.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Existing decorative overlay pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23C5A24A' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div
          className="container-main relative z-10 text-center"
          ref={heroRef}
        >
          <div
            className={`transition-all duration-700 ${heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
              }`}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-px bg-gold/40" />
              <Crown size={16} className="text-gold" />
              <div className="w-10 h-px bg-gold/40" />
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
              {title}
            </h1>

            <p className="text-cream/60 max-w-xl mx-auto text-sm md:text-base">
              {subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-16">
        <div className="container-main">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <div className="flex items-center gap-4">
              {isMobile && (
                <button
                  onClick={() => setFilterDrawerOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#231F1B] border border-border rounded-lg text-sm font-medium text-dark hover:border-burgundy transition-colors"
                >
                  <SlidersHorizontal size={16} />
                  Filters
                </button>
              )}
              <p className="text-sm text-muted">
                <span className="font-medium text-dark">{filteredProducts.length}</span> products
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={filters.sort}
                onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
                className="px-3 py-2 bg-white dark:bg-[#231F1B] border border-border rounded-lg text-sm text-dark focus:outline-none focus:border-burgundy cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar - Desktop */}
            {!isMobile && (
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                categories={categories}
                subcategories={subcategories}
                sizes={sizes}
                colors={colors}
                fabrics={fabrics}
                occasions={occasions}
                fits={fits}
                priceRange={priceRange}
              />
            )}

            {/* Mobile filter drawer */}
            {isMobile && (
              <FilterSidebar
                isDrawer
                isOpen={filterDrawerOpen}
                onClose={() => setFilterDrawerOpen(false)}
                filters={filters}
                onFilterChange={setFilters}
                categories={categories}
                subcategories={subcategories}
                sizes={sizes}
                colors={colors}
                fabrics={fabrics}
                occasions={occasions}
                fits={fits}
                priceRange={priceRange}
              />
            )}

            {/* Product Grid */}
            <div className="flex-1 min-w-0">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mx-auto mb-4">
                    <Crown size={32} className="text-muted/40" />
                  </div>
                  <h3 className="font-serif text-xl text-dark mb-2">No products found</h3>
                  <p className="text-sm text-muted mb-6">Try adjusting your filters or search terms</p>
                  <button
                    onClick={() => setFilters({
                      search: '', category: [], subcategory: [], size: [],
                      color: [], fabric: [], occasion: [], fit: [],
                      priceRange: null, rating: null, inStock: false, sort: 'popular',
                    })}
                    className="px-6 py-2.5 bg-burgundy text-white rounded-lg text-sm font-medium hover:bg-maroon transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
