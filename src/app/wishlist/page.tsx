"use client";

import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, isLoading } = useWishlist();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-[400px] bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="mb-8 relative">
          <div className="relative">
            <div className="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="relative bg-red-50 rounded-full p-8">
              <Heart className="w-24 h-24 text-red-500" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 text-center">
          Your Wishlist is Empty
        </h2>
        
        <p className="text-lg text-text-secondary mb-8 text-center max-w-md">
          Save items you love to your wishlist and revisit them later.
        </p>

        <Link
          href="/products"
          className="group bg-primary hover:bg-primary-dark text-text-inverse font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 shadow-lg hover:shadow-xl"
        >
          Start Shopping
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist ({wishlist.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id || product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
