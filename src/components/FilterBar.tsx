'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
  categories: string[];
  brands: string[];
}

export function FilterBar({ onSearch, onFilterChange, categories, brands }: FilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  const handleApplyFilters = () => {
    onFilterChange({
      priceRange,
      category: selectedCategory,
      brand: selectedBrand
    });
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedCategory('');
    setSelectedBrand('');
    onFilterChange({});
  };

  return (
    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border py-4 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 min-w-[120px]"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {(selectedCategory || selectedBrand) && (
              <span className="ml-1 w-2 h-2 rounded-full bg-primary" />
            )}
          </Button>
        </div>

        {/* Filter Panel */}
        <div className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isFilterOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
        )}>
          <div className="bg-surface p-6 rounded-2xl border border-border shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Refine Results</h3>
              <button 
                onClick={clearFilters}
                className="text-sm text-secondary hover:text-secondary-light font-medium"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Categories */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-text-secondary">Category</label>
                <select 
                  className="w-full p-2.5 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Brands */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-text-secondary">Brand</label>
                <select 
                  className="w-full p-2.5 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-text-secondary">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="10000" 
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={handleApplyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
