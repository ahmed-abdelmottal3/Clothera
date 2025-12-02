'use client';

export function BrandLogos() {
  const brands = [
    { name: 'VERSACE', id: 1 },
    { name: 'ZARA', id: 2 },
    { name: 'GUCCI', id: 3 },
    { name: 'PRADA', id: 4 },
    { name: 'Calvin Klein', id: 5 }
  ];

  return (
    <div className="w-full bg-primary py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-8 md:gap-12">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="text-text-inverse text-2xl md:text-3xl font-bold tracking-wide hover:opacity-70 transition-opacity cursor-pointer"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {brand.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
