"use client";

import { useState, useEffect, useCallback } from "react";
import { CartResponse, CartData } from "@/types/cart";
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from "@/services/cart";
import { useAuth } from "./auth";

export const useCart = () => {
  const [cart, setCart] = useState<CartData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  /**
   * Fetch cart from API
   */
  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response: CartResponse = await getCart();
      setCart(response.data);
    } catch (err) {
      setError("Failed to load cart");
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  /**
   * Add item to cart
   */
  const addItem = async (productId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await addToCart(productId);
      setCart(response.data);
      return response;
    } catch (err) {
      setError("Failed to add item to cart");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update cart item quantity
   */
  const updateItem = async (itemId: string, count: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await updateCartItem(itemId, count);
      setCart(response.data);
      return response;
    } catch (err) {
      setError("Failed to update item");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Remove item from cart
   */
  const removeItem = async (itemId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await removeCartItem(itemId);
      setCart(response.data);
      return response;
    } catch (err) {
      setError("Failed to remove item");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear entire cart
   */
  const clearAllItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await clearCart();
      setCart(null);
    } catch (err) {
      setError("Failed to clear cart");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get cart item count
   */
  const getCartCount = (): number => {
    if (!cart || !cart.products) return 0;
    return cart.products.reduce((total, item) => total + item.count, 0);
  };

  /**
   * Auto-fetch cart on mount if authenticated
   */
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  return {
    cart,
    isLoading,
    error,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    clearAllItems,
    cartCount: getCartCount(),
    refetch: fetchCart,
  };
};
