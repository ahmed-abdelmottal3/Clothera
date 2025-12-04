"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { CartResponse, CartData } from "@/types/cart";
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from "@/services/cart";
import { useAuth } from "@/hooks/auth";

interface CartContextType {
  cart: CartData | null;
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItem: (productId: string) => Promise<CartResponse>;
  updateItem: (itemId: string, count: number) => Promise<CartResponse>;
  removeItem: (itemId: string) => Promise<CartResponse>;
  clearAllItems: () => Promise<void>;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
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
    } catch (err: unknown) {
      console.error("Failed to load cart", err);
      
      // Check if error is "no cart exists" - this is normal for new users
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || '';
      const isNoCartError = errorMessage.toLowerCase().includes('no cart') || 
                           errorMessage.toLowerCase().includes('cart not found') ||
                           errorMessage.toLowerCase().includes('there is no cart');
      
      if (isNoCartError) {
        // No cart exists yet - this is normal, treat as empty cart
        setCart(null);
        setError(null);
      } else {
        // Actual error occurred
        setError("Failed to load cart");
        setCart(null);
      }
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
    } else {
        setCart(null);
    }
  }, [isAuthenticated, fetchCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        error,
        fetchCart,
        addItem,
        updateItem,
        removeItem,
        clearAllItems,
        cartCount: getCartCount(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
