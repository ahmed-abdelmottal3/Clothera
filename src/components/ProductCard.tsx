import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/Button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <div className="group bg-surface rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-surface">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badges */}
          {product.priceAfterDiscount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              SALE
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="p-2 bg-surface rounded-full shadow-md hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-colors border border-border"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-secondary uppercase tracking-wider">
              {product.category.name}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.ratingsAverage}</span>
            </div>
          </div>

          <h3 className="font-semibold text-text-primary line-clamp-2 hover:text-primary transition-colors mb-2">
            {product.title}
          </h3>

          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="flex flex-col">
              {product.priceAfterDiscount ? (
                <>
                  <span className="text-lg font-bold text-primary">
                    ${product.priceAfterDiscount}
                  </span>
                  <span className="text-sm text-text-secondary line-through">
                    ${product.price}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-primary">
                  ${product.price}
                </span>
              )}
            </div>

            <Button 
              size="sm" 
              variant="secondary"
              className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
