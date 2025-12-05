"use client";

import { ShoppingBag } from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  onCheckout?: () => void;
}

export function CartSummary({ subtotal, onCheckout }: CartSummaryProps) {
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
  const total = subtotal + tax + shipping;

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 sticky top-24">
      <h2 className="text-2xl font-bold text-text-primary mb-6">
        Order Summary
      </h2>

      {/* Price Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-text-secondary">
          <span>Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-text-secondary">
          <span>Tax (10%)</span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-text-secondary">
          <span>Shipping</span>
          <span className="font-semibold">
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {/* Free Shipping Message */}
        {subtotal < 100 && (
          <div className="p-3 bg-accent rounded-lg">
            <p className="text-sm text-text-primary">
              Add <span className="font-bold">${(100 - subtotal).toFixed(2)}</span> more for FREE shipping! 🎉
            </p>
          </div>
        )}

        <div className="h-px bg-border my-4" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-text-primary">Total</span>
          <span className="text-2xl font-bold text-primary">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="w-full bg-primary hover:bg-primary-dark text-text-inverse font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        <ShoppingBag className="w-5 h-5" />
        Proceed to Checkout
      </button>

      {/* Payment Methods */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-text-secondary text-center mb-3">
          We accept
        </p>
        <div className="flex justify-center gap-3 opacity-60">
          <div className="w-10 h-7 bg-background border border-border rounded flex items-center justify-center text-xs font-bold">
            VISA
          </div>
          <div className="w-10 h-7 bg-background border border-border rounded flex items-center justify-center text-xs font-bold">
            MC
          </div>
          <div className="w-10 h-7 bg-background border border-border rounded flex items-center justify-center text-xs font-bold">
            AMEX
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-4 text-center">
        <p className="text-xs text-text-light">
          🔒 Secure checkout · Your data is protected
        </p>
      </div>
    </div>
  );
}
