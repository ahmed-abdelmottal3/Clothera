"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Trash2 } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/hooks/auth';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, cart, removeItem } = useCart();
  const { addItemToWishlist, removeItemFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisting, setIsWishlisting] = useState(false);
  const router = useRouter();

  const cartItem = cart?.products?.find(item => {
    const itemProductId = typeof item.product === 'string' 
      ? item.product 
      : (item.product.id || item.product._id);
    const currentProductId = product.id || product._id;
    return itemProductId === currentProductId;
  });
  const isInCart = !!cartItem;

  const handleCartAction = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error('Please sign in to manage cart');
      router.push('/sign-in');
      return;
    }

    setIsAdding(true);
    try {
      if (isInCart && cartItem) {
        // Use product ID for removal (API expects product ID, not cart item ID)
        const productId = typeof cartItem.product === 'string' 
          ? cartItem.product 
          : (cartItem.product.id || cartItem.product._id);
        await removeItem(productId);
      } else {
        await addItem(product.id);
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error('Please sign in to manage wishlist');
      router.push('/sign-in');
      return;
    }

    setIsWishlisting(true);
    try {
      if (isInWishlist(product.id)) {
        await removeItemFromWishlist(product.id);
      } else {
        await addItemToWishlist(product.id);
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    } finally {
      setIsWishlisting(false);
    }
  };

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
              onClick={handleWishlist}
              disabled={isWishlisting}
              className={`p-2 rounded-full shadow-md transition-colors border border-border ${
                isInWishlist(product.id)
                  ? 'bg-red-50 text-red-500 hover:bg-red-100'
                  : 'bg-surface hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20'
              }`}
            >
              <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
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
              className={`rounded-full w-10 h-10 p-0 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                isInCart 
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20' 
                  : 'bg-secondary hover:bg-secondary/90 text-white shadow-lg shadow-secondary/20'
              }`}
              onClick={handleCartAction}
              disabled={isAdding}
            >
              {isAdding ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                isInCart ? <Trash2 className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
