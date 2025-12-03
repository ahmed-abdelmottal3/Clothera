"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-8 relative">
        {/* Animated Shopping Bag Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-accent rounded-full blur-2xl opacity-30 animate-pulse" />
          <div className="relative bg-accent rounded-full p-8">
            <ShoppingBag className="w-24 h-24 text-text-primary" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 text-center">
        Your Cart is Empty
      </h2>
      
      <p className="text-lg text-text-secondary mb-8 text-center max-w-md">
        Looks like you haven&apos;t added anything to your cart yet. Start shopping to fill it up!
      </p>

      <Link
        href="/products"
        className="group bg-primary hover:bg-primary-dark text-text-inverse font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 shadow-lg hover:shadow-xl"
      >
        Continue Shopping
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>

    </div>
  );
}
