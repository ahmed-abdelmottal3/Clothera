'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative w-full bg-[#F2F0F1] overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-text-primary">
              FIND CLOTHES
              <br />
              THAT MATCHES
              <br />
              YOUR STYLE
            </h1>
            
            <p className="text-base md:text-lg text-text-secondary max-w-lg">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>
            
            <Button 
              variant="primary"
              size="lg"
              className="w-full sm:w-auto px-12 py-6 text-base font-medium rounded-full bg-black hover:bg-black/90 text-white"
            >
              Shop Now
            </Button>
            
            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-6 md:pt-8 border-t border-text-secondary/20">
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary">200+</div>
                <div className="text-xs md:text-sm text-text-secondary mt-1">International Brands</div>
              </div>
              <div className="border-l border-text-secondary/20 pl-4 md:pl-8">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary">2,000+</div>
                <div className="text-xs md:text-sm text-text-secondary mt-1">High-Quality Products</div>
              </div>
              <div className="border-l border-text-secondary/20 pl-4 md:pl-8">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary">30,000+</div>
                <div className="text-xs md:text-sm text-text-secondary mt-1">Happy Customers</div>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative lg:h-[500px] xl:h-[600px] h-[400px]">
            <div className="absolute top-8 right-12 z-10 animate-bounce">
              <Sparkles className="w-12 h-12 text-black fill-black" />
            </div>
            <div className="absolute top-32 right-4 z-10 animate-pulse">
              <Sparkles className="w-8 h-8 text-black fill-black" />
            </div>
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
              alt="Fashion models showcasing stylish clothing"
              fill
              className="object-cover object-center rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
