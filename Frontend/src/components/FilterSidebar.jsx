import { useState } from 'react';
import { X, ChevronDown, ChevronUp, SlidersHorizontal, Search } from 'lucide-react';
import { useBodyLock, useMediaQuery } from '../hooks/useUtils';
import { categoryDisplayNames } from '../data/products';

function FilterSection({ title, isOpen, onToggle, children }) {
  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-3.5 px-1 text-sm font-medium text-dark hover:text-burgundy transition-colors"
      >
        {title}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && <div className="pb-4 px-1">{children}</div>}
    </div>
  );
}

function CheckboxGroup({ options, selected = [], onChange, displayFn }) {
  return (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => {
              const newSelected = selected.includes(option)
                ? selected.filter((s) => s !== option)
                : [...selected, option];
              onChange(newSelected);
            }}
            className="w-4 h-4 rounded border-border text-burgundy focus:ring-burgundy/30 accent-burgundy"
          />
          <span className="text-sm text-muted group-hover:text-dark transition-colors capitalize">
            {displayFn ? displayFn(option) : option.replace(/-/g, ' ')}
          </span>
        </label>
      ))}
    </div>
  );
}

export default function FilterSidebar({
  filters, onFilterChange, categories, subcategories,
  sizes, colors, fabrics, occasions, fits, priceRange,
  isDrawer = false, isOpen = false, onClose = () => {}
}) {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [openSections, setOpenSections] = useState({
    search: true, category: true, price: true, size: true,
    color: false, fabric: false, occasion: false, fit: false,
    rating: false, availability: false, subcategory: false,
  });

  useBodyLock(isDrawer && isOpen);

  function toggleSection(key) {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleClear() {
    onFilterChange({
      search: '', category: [], subcategory: [], size: [],
      color: [], fabric: [], occasion: [], fit: [],
      priceRange: null, rating: null, inStock: false, sort: filters.sort,
    });
  }

  const activeFilterCount = [
    filters.search, filters.category?.length, filters.subcategory?.length,
    filters.size?.length, filters.color?.length, filters.fabric?.length,
    filters.occasion?.length, filters.fit?.length, filters.priceRange,
    filters.rating, filters.inStock,
  ].filter(Boolean).length;

  const content = (
    <div className="space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-burgundy" />
          <h3 className="font-serif text-base font-semibold text-dark">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 bg-burgundy text-white text-[10px] rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button onClick={handleClear} className="text-xs text-burgundy hover:underline">Clear All</button>
        )}
      </div>

      {/* Search */}
      <FilterSection title="Search" isOpen={openSections.search} onToggle={() => toggleSection('search')}>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2 bg-cream dark:bg-[#1A1614] border border-border rounded-lg text-sm text-dark placeholder-muted focus:outline-none focus:border-burgundy"
          />
        </div>
      </FilterSection>

      {/* Category */}
      {categories && categories.length > 0 && (
        <FilterSection title="Category" isOpen={openSections.category} onToggle={() => toggleSection('category')}>
          <CheckboxGroup
            options={categories}
            selected={filters.category || []}
            onChange={(val) => onFilterChange({ ...filters, category: val })}
            displayFn={(cat) => categoryDisplayNames[cat] || cat.replace(/-/g, ' ')}
          />
        </FilterSection>
      )}

      {/* Subcategory */}
      {subcategories && subcategories.length > 0 && (
        <FilterSection title="Subcategory" isOpen={openSections.subcategory} onToggle={() => toggleSection('subcategory')}>
          <CheckboxGroup
            options={subcategories}
            selected={filters.subcategory || []}
            onChange={(val) => onFilterChange({ ...filters, subcategory: val })}
          />
        </FilterSection>
      )}

      {/* Price */}
      <FilterSection title="Price Range" isOpen={openSections.price} onToggle={() => toggleSection('price')}>
        <div className="space-y-3">
          <input
            type="range"
            min={priceRange?.[0] || 0}
            max={priceRange?.[1] || 25000}
            value={filters.priceRange?.[1] || priceRange?.[1] || 25000}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                priceRange: [priceRange?.[0] || 0, Number(e.target.value)],
              })
            }
            className="w-full accent-burgundy"
          />
          <div className="flex items-center justify-between text-xs text-muted">
            <span>₹{(priceRange?.[0] || 0).toLocaleString()}</span>
            <span className="font-medium text-dark">
              ₹{(filters.priceRange?.[1] || priceRange?.[1] || 25000).toLocaleString()}
            </span>
          </div>
        </div>
      </FilterSection>

      {/* Size */}
      {sizes && sizes.length > 0 && (
        <FilterSection title="Size" isOpen={openSections.size} onToggle={() => toggleSection('size')}>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  const current = filters.size || [];
                  const next = current.includes(size)
                    ? current.filter((s) => s !== size)
                    : [...current, size];
                  onFilterChange({ ...filters, size: next });
                }}
                className={`px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors ${
                  (filters.size || []).includes(size)
                    ? 'bg-burgundy text-white border-burgundy'
                    : 'border-border text-muted hover:border-burgundy hover:text-burgundy'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Color */}
      {colors && colors.length > 0 && (
        <FilterSection title="Color" isOpen={openSections.color} onToggle={() => toggleSection('color')}>
          <CheckboxGroup
            options={colors}
            selected={filters.color || []}
            onChange={(val) => onFilterChange({ ...filters, color: val })}
          />
        </FilterSection>
      )}

      {/* Fabric */}
      {fabrics && fabrics.length > 0 && (
        <FilterSection title="Fabric" isOpen={openSections.fabric} onToggle={() => toggleSection('fabric')}>
          <CheckboxGroup
            options={fabrics.slice(0, 15)}
            selected={filters.fabric || []}
            onChange={(val) => onFilterChange({ ...filters, fabric: val })}
          />
        </FilterSection>
      )}

      {/* Occasion */}
      {occasions && occasions.length > 0 && (
        <FilterSection title="Occasion" isOpen={openSections.occasion} onToggle={() => toggleSection('occasion')}>
          <CheckboxGroup
            options={occasions}
            selected={filters.occasion || []}
            onChange={(val) => onFilterChange({ ...filters, occasion: val })}
          />
        </FilterSection>
      )}

      {/* Fit */}
      {fits && fits.length > 0 && (
        <FilterSection title="Fit" isOpen={openSections.fit} onToggle={() => toggleSection('fit')}>
          <CheckboxGroup
            options={fits}
            selected={filters.fit || []}
            onChange={(val) => onFilterChange({ ...filters, fit: val })}
          />
        </FilterSection>
      )}

      {/* Rating */}
      <FilterSection title="Rating" isOpen={openSections.rating} onToggle={() => toggleSection('rating')}>
        <div className="space-y-2">
          {[4, 3, 2].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => onFilterChange({ ...filters, rating: filters.rating === rating ? null : rating })}
                className="accent-burgundy"
              />
              <span className="text-sm text-muted group-hover:text-dark">
                {'★'.repeat(rating)}{'☆'.repeat(5 - rating)} & above
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability" isOpen={openSections.availability} onToggle={() => toggleSection('availability')}>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock || false}
            onChange={() => onFilterChange({ ...filters, inStock: !filters.inStock })}
            className="accent-burgundy w-4 h-4"
          />
          <span className="text-sm text-muted">In Stock Only</span>
        </label>
      </FilterSection>
    </div>
  );

  // Mobile drawer mode
  if (isDrawer) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
        )}
        <div
          className={`fixed top-0 left-0 h-full w-[320px] max-w-[85vw] bg-white dark:bg-[#1A1614] z-50 transform transition-transform duration-300 overflow-y-auto p-5 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-semibold text-dark">Filters</h3>
            <button onClick={onClose} className="p-1 text-muted hover:text-dark">
              <X size={20} />
            </button>
          </div>
          {content}
          <button
            onClick={onClose}
            className="w-full mt-6 py-3 bg-burgundy text-white rounded-lg font-medium hover:bg-maroon transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <div className="w-64 flex-shrink-0">
      <div className="sticky top-36 bg-white dark:bg-[#231F1B] rounded-xl border border-border/60 p-5 max-h-[calc(100vh-10rem)] overflow-y-auto">
        {content}
      </div>
    </div>
  );
}
