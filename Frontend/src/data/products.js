import productsData from '../../../Database.json';

// Normalize product data
const products = productsData.map((p) => ({
  ...p,
  id: p.id,
  collection: getCollection(p.category),
}));

function getCollection(category) {
  const ethnicCategories = ['kurtas', 'kurta-pajama', 'nehru-jackets', 'blazers', 'suits'];
  const casualCategories = ['shirts', 't-shirts', 'hoodies', 'bottom-wear', 'winter-wear'];
  const accessoryCategories = ['footwear', 'accessories'];

  if (ethnicCategories.includes(category)) return 'ethnic';
  if (casualCategories.includes(category)) return 'casual';
  if (accessoryCategories.includes(category)) return 'accessories';
  return 'other';
}

// Get all products
export function getAllProducts() {
  return products;
}

// Get product by ID
export function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}

// Get product by slug
export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

// Get products by collection
export function getProductsByCollection(collection) {
  return products.filter((p) => p.collection === collection);
}

// Get products by category
export function getProductsByCategory(category) {
  return products.filter((p) => p.category === category);
}

// Get featured products
export function getFeaturedProducts() {
  return products.filter((p) => p.isFeatured);
}

// Get new products
export function getNewProducts() {
  return products.filter((p) => p.isNew);
}

// Get best sellers
export function getBestSellers() {
  return products.filter((p) => p.isBestSeller);
}

// Get related products
export function getRelatedProducts(product, limit = 4) {
  if (product.relatedProducts && product.relatedProducts.length > 0) {
    return product.relatedProducts
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean)
      .slice(0, limit);
  }
  // Fallback: same category
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

// Search products
export function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
      (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
      (p.brand && p.brand.toLowerCase().includes(q))
  );
}

// Get unique values for filters
export function getUniqueCategories(collection) {
  const filtered = collection ? products.filter((p) => p.collection === collection) : products;
  return [...new Set(filtered.map((p) => p.category))];
}

export function getUniqueSubcategories(collection) {
  const filtered = collection ? products.filter((p) => p.collection === collection) : products;
  return [...new Set(filtered.map((p) => p.subcategory).filter(Boolean))];
}

export function getUniqueSizes() {
  const allSizes = products.flatMap((p) => p.sizes || []);
  return [...new Set(allSizes)];
}

export function getUniqueColors() {
  const allColors = products.flatMap((p) => p.colors || []);
  return [...new Set(allColors)];
}

export function getUniqueFabrics() {
  const allFabrics = products.map((p) => p.material).filter(Boolean);
  return [...new Set(allFabrics)];
}

export function getUniqueOccasions() {
  const allOccasions = products.flatMap((p) => p.occasion || []);
  return [...new Set(allOccasions)];
}

export function getUniqueFits() {
  const allFits = products.map((p) => p.fit).filter(Boolean);
  return [...new Set(allFits)];
}

// Filter and sort products
export function filterProducts(productList, filters) {
  let result = [...productList];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(q))
    );
  }

  if (filters.category && filters.category.length > 0) {
    result = result.filter((p) => filters.category.includes(p.category));
  }

  if (filters.subcategory && filters.subcategory.length > 0) {
    result = result.filter((p) => filters.subcategory.includes(p.subcategory));
  }

  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    result = result.filter((p) => p.price >= min && p.price <= max);
  }

  if (filters.size && filters.size.length > 0) {
    result = result.filter((p) => p.sizes && p.sizes.some((s) => filters.size.includes(s)));
  }

  if (filters.color && filters.color.length > 0) {
    result = result.filter((p) => p.colors && p.colors.some((c) => filters.color.includes(c)));
  }

  if (filters.fabric && filters.fabric.length > 0) {
    result = result.filter((p) => filters.fabric.includes(p.material));
  }

  if (filters.occasion && filters.occasion.length > 0) {
    result = result.filter(
      (p) => p.occasion && p.occasion.some((o) => filters.occasion.includes(o))
    );
  }

  if (filters.fit && filters.fit.length > 0) {
    result = result.filter((p) => filters.fit.includes(p.fit));
  }

  if (filters.rating) {
    result = result.filter((p) => p.rating >= filters.rating);
  }

  if (filters.inStock) {
    result = result.filter((p) => p.stock > 0);
  }

  // Sorting
  if (filters.sort) {
    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'popular':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }
  }

  return result;
}

// Get price range
export function getPriceRange(productList) {
  if (!productList || productList.length === 0) return [0, 10000];
  const prices = productList.map((p) => p.price);
  return [Math.min(...prices), Math.max(...prices)];
}

// Category display names
export const categoryDisplayNames = {
  'shirts': 'Shirts',
  't-shirts': 'T-Shirts',
  'hoodies': 'Hoodies & Sweatshirts',
  'bottom-wear': 'Bottom Wear',
  'kurtas': 'Royal Kurtas',
  'kurta-pajama': 'Kurta-Pajama Sets',
  'nehru-jackets': 'Nehru Jackets',
  'blazers': 'Blazers & Waistcoats',
  'suits': 'Suits',
  'winter-wear': 'Winter Wear',
  'footwear': 'Footwear',
  'accessories': 'Accessories',
};

export const collectionDisplayNames = {
  ethnic: 'Ethnic & Suits',
  casual: 'Casual & Outerwear',
  accessories: 'Footwear & Accessories',
};
