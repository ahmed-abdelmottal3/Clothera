'use client';

import Link from 'next/link';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

interface TopSellingProps {
  products: Product[];
}

export function TopSelling({ products }: TopSellingProps) {
  // Early return if no products
  if (!products || products.length === 0) {
    return null;
  }

  // Get top 4 products by sold count - create copy to avoid mutating original
  const topProducts = [...products]
    .filter((p) => p.sold !== null && p.sold > 0)
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))
    .slice(0, 4);

  // If we don't have enough products with sales, fall back to highest rated
  const displayProducts = topProducts.length >= 4 
    ? topProducts 
    : [...products].sort((a, b) => b.ratingsAverage - a.ratingsAverage).slice(0, 4);

  return (
    <section className="w-full py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary mb-2">
            TOP SELLING
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-text-secondary/30 rounded-full text-text-primary font-medium hover:bg-text-primary hover:text-white transition-all duration-300"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
