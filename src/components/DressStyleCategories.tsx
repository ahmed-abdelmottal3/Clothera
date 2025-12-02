'use client';

import Image from 'next/image';
import Link from 'next/link';

const dressStyles = [
  {
    id: 1,
    title: "Women's Fashion",
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    gridClass: 'lg:col-span-1'
  },
  {
    id: 2,
    title: "Men's Fashion",
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3',
    gridClass: 'lg:col-span-1'
  },
  {
    id: 3,
    title: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    gridClass: 'lg:col-span-1'
  }
];

export function DressStyleCategories() {
  return (
    <section className="w-full py-12 md:py-16 bg-[#F0F0F0] rounded-3xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary mb-2">
            BROWSE BY CATEGORY
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
          {dressStyles.map((style) => (
            <Link
              key={style.id}
              href={`/products?category=${encodeURIComponent(style.title)}`}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${style.gridClass}`}
            >
              <Image
                src={style.image}
                alt={style.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute top-6 left-6">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  {style.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

