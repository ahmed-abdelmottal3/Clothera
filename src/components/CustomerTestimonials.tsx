'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    review: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
  },
  {
    id: 2,
    name: 'Alex K.',
    rating: 5,
    review: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
  },
  {
    id: 3,
    name: 'James L.',
    rating: 5,
    review: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
  },
  {
    id: 4,
    name: 'Emily R.',
    rating: 5,
    review: "The customer service is outstanding and the quality of the products is exceptional. I've recommended Shop.co to all my friends and family. Absolutely love shopping here!"
  }
];

export function CustomerTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const itemsPerView = 3;
  const maxIndex = testimonials.length - itemsPerView;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="w-full py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary">
            OUR HAPPY CUSTOMERS
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full border transition-colors ${
                currentIndex === 0
                  ? 'border-border text-text-light cursor-not-allowed'
                  : 'border-text-primary text-text-primary hover:bg-text-primary hover:text-white'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`p-2 rounded-full border transition-colors ${
                currentIndex >= maxIndex
                  ? 'border-border text-text-light cursor-not-allowed'
                  : 'border-text-primary text-text-primary hover:bg-text-primary hover:text-white'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop View - Sliding */}
        <div className="hidden md:block overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-[calc(33.333%-1rem)] bg-surface border border-border rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-start gap-2 mb-3">
                  <h4 className="font-bold text-text-primary">{testimonial.name}</h4>
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  &quot;{testimonial.review}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View - Grid */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-surface border border-border rounded-2xl p-6"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="flex items-start gap-2 mb-3">
                <h4 className="font-bold text-text-primary">{testimonial.name}</h4>
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                &quot;{testimonial.review}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
