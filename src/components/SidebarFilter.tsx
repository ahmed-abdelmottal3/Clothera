'use client';

import { Search } from 'lucide-react';

interface SidebarFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (key: string, value: string | number[]) => void;
  categories: string[];
  brands: string[];
  selectedCategory: string;
  selectedBrand: string;
  priceRange: number[];
}

export function SidebarFilter({
  onSearch,
  onFilterChange,
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  priceRange
}: SidebarFilterProps) {
  return (
    <div className="w-full lg:w-64 flex-shrink-0 space-y-8 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-2 custom-scrollbar">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-text-primary mb-4">Categories</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="category"
              className="sr-only peer"
              checked={selectedCategory === ''}
              onChange={() => onFilterChange('category', '')}
            />
            <span className="w-5 h-5 rounded-full border-2 border-text-secondary/30 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary transition-all group-hover:border-primary/50">
              <span className="w-2 h-2 rounded-full bg-text-inverse opacity-0 peer-checked:opacity-100 transition-opacity"></span>
            </span>
            <span className="text-sm text-text-secondary group-hover:text-primary peer-checked:text-primary peer-checked:font-medium transition-colors">All Categories</span>
          </label>
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                className="sr-only peer"
                checked={selectedCategory === cat}
                onChange={() => onFilterChange('category', cat)}
              />
              <span className="w-5 h-5 rounded-full border-2 border-text-secondary/30 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary transition-all group-hover:border-primary/50">
                <span className="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></span>
              </span>
              <span className="text-sm text-text-secondary group-hover:text-primary peer-checked:text-primary peer-checked:font-medium transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold text-text-primary mb-4">Brands</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="brand"
              className="sr-only peer"
              checked={selectedBrand === ''}
              onChange={() => onFilterChange('brand', '')}
            />
            <span className="w-5 h-5 rounded-full border-2 border-text-secondary/30 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary transition-all group-hover:border-primary/50">
              <span className="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></span>
            </span>
            <span className="text-sm text-text-secondary group-hover:text-primary peer-checked:text-primary peer-checked:font-medium transition-colors">All Brands</span>
          </label>
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="brand"
                className="sr-only peer"
                checked={selectedBrand === brand}
                onChange={() => onFilterChange('brand', brand)}
              />
              <span className="w-5 h-5 rounded-full border-2 border-text-secondary/30 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary transition-all group-hover:border-primary/50">
                <span className="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></span>
              </span>
              <span className="text-sm text-text-secondary group-hover:text-primary peer-checked:text-primary peer-checked:font-medium transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-text-primary mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-text-secondary">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="600"
            step="10"
            value={priceRange[1]}
            onChange={(e) => onFilterChange('priceRange', [0, parseInt(e.target.value)])}
            className="w-full accent-secondary h-2 bg-input rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
