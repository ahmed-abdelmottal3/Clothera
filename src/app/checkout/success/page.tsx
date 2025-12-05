"use client";

import { CheckCircle, Package } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function CheckoutSuccessPage() {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: ReturnType<typeof setInterval> = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-surface border border-border rounded-2xl p-8 text-center animate-fade-in">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-text-primary mb-3">Payment Successful!</h1>
        <p className="text-text-secondary mb-8">
          Thank you for your order. Your payment has been processed successfully and your order is being prepared.
        </p>

        <div className="bg-background-light rounded-lg p-6 mb-8">
          <Package className="w-8 h-8 text-primary mx-auto mb-3" />
          <p className="text-sm text-text-secondary mb-1">We'll send you a confirmation email shortly.</p>
          <p className="text-sm text-text-secondary">
            You can track your order status in your orders page.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/orders"
            className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors text-center"
          >
            View Orders
          </Link>
          <Link
            href="/products"
            className="flex-1 px-6 py-3 bg-background border border-border text-text-primary rounded-lg font-semibold hover:bg-background-light transition-colors text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
