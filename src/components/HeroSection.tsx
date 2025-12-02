'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    alt: "Fashion models showcasing stylish clothing"
  },
  {
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    alt: "Trendy fashion collection"
  },
  {
    src: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
    alt: "Modern clothing style"
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const dragThreshold = 50; // Minimum drag distance to trigger slide change

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragDistance(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const distance = e.clientX - startX;
    setDragDistance(distance);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    
    // If dragged left (negative distance) beyond threshold, go to next slide
    if (dragDistance < -dragThreshold) {
      nextSlide();
    }
    // If dragged right (positive distance) beyond threshold, go to previous slide
    else if (dragDistance > dragThreshold) {
      prevSlide();
    }
    
    setIsDragging(false);
    setDragDistance(0);
  };

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
          
          {/* Right Image Carousel */}
          <div className="relative lg:h-[750px] xl:h-[850px] h-[550px]">
            <div className="absolute top-8 right-12 z-10 animate-bounce pointer-events-none">
              <Sparkles className="w-12 h-12 text-black fill-black" />
            </div>
            <div className="absolute top-32 right-4 z-10 animate-pulse pointer-events-none">
              <Sparkles className="w-8 h-8 text-black fill-black" />
            </div>
            
            {/* Carousel Images */}
            <div 
              className="relative w-full h-full rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    transform: isDragging ? `translateX(${dragDistance}px)` : 'translateX(0)',
                    transition: isDragging ? 'none' : 'opacity 500ms, transform 300ms ease-out'
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover object-center pointer-events-none"
                    priority={index === 0}
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide 
                      ? 'bg-black w-8' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
