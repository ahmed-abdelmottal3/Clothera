'use client';

import Link from 'next/link';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

interface NewArrivalsProps {
  products: Product[];
}

export function NewArrivals({ products }: NewArrivalsProps) {
  // Get the 4 most recent products - with safety check
  const newProducts = products && products.length > 0
    ? [...products]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4)
    : [];

  if (newProducts.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary mb-2">
            NEW ARRIVALS
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {newProducts.map((product) => (
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
