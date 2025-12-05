'use client';

import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { BrandLogos } from '@/components/BrandLogos';
import { NewArrivals } from '@/components/NewArrivals';
import { TopSelling } from '@/components/TopSelling';
import { DressStyleCategories } from '@/components/DressStyleCategories';
import { CustomerTestimonials } from '@/components/CustomerTestimonials';
import { NewsletterSection } from '@/components/NewsletterSection';
import { getAllProducts } from '@/services/product';
import { Product } from '@/types/product';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <BrandLogos />
      
      <div className="container mx-auto px-4">
        <hr className="border-border my-8" />
      </div>
      
      <NewArrivals products={products} />
      
      <div className="container mx-auto px-4">
        <hr className="border-border my-8" />
      </div>
      
      <TopSelling products={products} />
      
      <div className="py-8" />
      
      <DressStyleCategories />
      
      <CustomerTestimonials />
      
      <NewsletterSection />
    </main>
  );
}

