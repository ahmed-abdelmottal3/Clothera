"use client";

import { XCircle, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CheckoutCanceledPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-surface border border-border rounded-2xl p-8 text-center animate-fade-in">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center">
            <XCircle className="w-12 h-12 text-warning" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-text-primary mb-3">Order Canceled</h1>
        <p className="text-text-secondary mb-8">
          Your order has been canceled. No charges have been made to your account.
        </p>

        <div className="bg-background-light rounded-lg p-6 mb-8">
          <ShoppingCart className="w-8 h-8 text-secondary mx-auto mb-3" />
          <p className="text-sm text-text-secondary mb-1">Your cart items are still saved.</p>
          <p className="text-sm text-text-secondary">
            You can complete your purchase whenever you&apos;re ready.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/checkout"
            className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors text-center"
          >
            Try Again
          </Link>
          <Link
            href="/cart"
            className="flex-1 px-6 py-3 bg-background border border-border text-text-primary rounded-lg font-semibold hover:bg-background-light transition-colors text-center"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
