'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SidebarFilter } from '@/components/SidebarFilter';
import { ProductCard } from '@/components/ProductCard';
import { Pagination } from '@/components/Pagination';
import { getAllProducts } from '@/services/product';
import { Product } from '@/types/product';
import { Loader2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useProductFilter } from '@/hooks/useProductFilter';

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use Custom Hook for Filtering
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    selectedBrand,
    priceRange,
    filteredProducts,
    handleFilterChange,
    clearFilters
  } = useProductFilter(products);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Load products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply category filter from URL on initial load
  useEffect(() => {
    const category = searchParams.get('category');
    if (category && products.length > 0) {
      handleFilterChange('category', category);
    }
  }, [searchParams, products.length]);

  // Derived Data for Sidebar Options
  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category.name))), [products]);
  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand.name))), [products]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedBrand, priceRange]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Page Header */}
      <div className="bg-[#F2F0F1] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary text-center">
            ALL PRODUCTS
          </h1>
          <p className="text-center text-text-secondary mt-4 max-w-2xl mx-auto">
            Browse our complete collection of high-quality fashion items
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <Filter className="h-4 w-4" />
              {isMobileFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          {/* Sidebar Filter */}
          <div className={`${isMobileFilterOpen ? 'block' : 'hidden'} lg:block`}>
            <SidebarFilter 
              onSearch={setSearchQuery}
              onFilterChange={handleFilterChange}
              categories={categories}
              brands={brands}
              selectedCategory={selectedCategory}
              selectedBrand={selectedBrand}
              priceRange={priceRange}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-primary">
                {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
                <span className="ml-2 text-sm font-normal text-text-secondary">
                  ({filteredProducts.length} items)
                </span>
              </h2>
            </div>

            {currentProducts.length === 0 ? (
              <div className="text-center py-20 bg-surface rounded-2xl border border-border">
                <p className="text-xl text-text-secondary">No products found matching your criteria.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 text-primary font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
