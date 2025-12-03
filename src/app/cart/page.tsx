"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trash2, ChevronRight, Home } from "lucide-react";
import Swal from "sweetalert2";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/auth";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { cart, isLoading, cartCount, updateItem, removeItem, clearAllItems } = useCart();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleClearCart = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      await clearAllItems();
      Swal.fire({
        title: "Deleted!",
        text: "Your cart has been cleared.",
        icon: "success"
      });
    }
  };

  const handleCheckout = () => {
    alert("Checkout functionality coming soon!");
  };

  const subtotal = cart?.totalCartPrice || 0;

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-text-secondary hover:text-primary transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-text-light" />
          <span className="text-text-primary font-semibold">Shopping Cart</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary mb-2">
              Shopping Cart
            </h1>
            <p className="text-text-secondary">
              {cartCount > 0 ? `${cartCount} ${cartCount === 1 ? 'item' : 'items'} in your cart` : 'Your cart is empty'}
            </p>
          </div>

          {/* Clear Cart Button */}
          {cart && cart.products && cart.products.length > 0 && (
            <button
              onClick={handleClearCart}
              className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 text-error hover:bg-error/10 border border-error rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>
          )}
        </div>

        {/* Loading State */}
        {isLoading && !cart && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-surface border border-border rounded-2xl p-6 animate-pulse">
                  <div className="flex gap-6">
                    <div className="w-32 h-32 bg-background rounded-xl" />
                    <div className="flex-1 space-y-3">
                      <div className="h-6 bg-background rounded w-3/4" />
                      <div className="h-4 bg-background rounded w-1/4" />
                      <div className="h-6 bg-background rounded w-1/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-surface border border-border rounded-2xl p-6 animate-pulse">
                <div className="h-8 bg-background rounded w-1/2 mb-6" />
                <div className="space-y-4">
                  <div className="h-4 bg-background rounded" />
                  <div className="h-4 bg-background rounded" />
                  <div className="h-4 bg-background rounded" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty Cart */}
        {!isLoading && (!cart || !cart.products || cart.products.length === 0) && (
          <EmptyCart />
        )}

        {/* Cart Content */}
        {!isLoading && cart && cart.products && cart.products.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.products.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onUpdateQuantity={updateItem}
                  onRemove={removeItem}
                />
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary subtotal={subtotal} onCheckout={handleCheckout} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
