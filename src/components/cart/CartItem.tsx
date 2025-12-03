"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types/cart";
import { useState } from "react";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, count: number) => Promise<unknown>;
  onRemove: (itemId: string) => Promise<unknown>;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleIncrement = async () => {
    setIsUpdating(true);
    try {
      // Use product._id instead of item._id
      await onUpdateQuantity(item.product._id, item.count + 1);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDecrement = async () => {
    if (item.count <= 1) return;
    setIsUpdating(true);
    try {
      // Use product._id instead of item._id
      await onUpdateQuantity(item.product._id, item.count - 1);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      // Use product._id instead of item._id
      await onRemove(item.product._id);
    } finally {
      setIsRemoving(false);
    }
  };

  const subtotal = item.price * item.count;

  return (
    <div
      className={`bg-surface border border-border rounded-2xl p-4 md:p-6 transition-all duration-300 ${
        isRemoving ? "opacity-50 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <div className="flex gap-4 md:gap-6">
        {/* Product Image */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-background">
          <Image
            src={item.product.imageCover}
            alt={item.product.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-bold text-text-primary mb-1 truncate">
                {item.product.title}
              </h3>
              <p className="text-sm text-text-secondary mb-2">
                {item.product.category?.name}
              </p>
              <p className="text-lg md:text-xl font-bold text-primary">
                ${item.price.toFixed(2)}
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors disabled:opacity-50"
              aria-label="Remove item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Quantity Controls and Subtotal */}
          <div className="flex justify-between items-center mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3 bg-background border border-border rounded-lg p-1">
              <button
                onClick={handleDecrement}
                disabled={isUpdating || item.count <= 1}
                className="p-2 hover:bg-accent rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4 text-text-primary" />
              </button>
              <span className="text-base font-semibold text-text-primary w-8 text-center">
                {item.count}
              </span>
              <button
                onClick={handleIncrement}
                disabled={isUpdating}
                className="p-2 hover:bg-accent rounded-md transition-colors disabled:opacity-50"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4 text-text-primary" />
              </button>
            </div>

            {/* Subtotal */}
            <div className="text-right">
              <p className="text-sm text-text-secondary">Subtotal</p>
              <p className="text-xl font-bold text-primary">
                ${subtotal.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
