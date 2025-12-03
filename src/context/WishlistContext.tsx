"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Product } from "@/types/product";
import { getWishlist, addToWishlist, removeFromWishlist } from "@/services/wishlist";
import { useAuth } from "@/hooks/auth";
import toast from "react-hot-toast";

interface WishlistContextType {
  wishlist: Product[];
  isLoading: boolean;
  error: string | null;
  fetchWishlist: () => Promise<void>;
  addItemToWishlist: (productId: string) => Promise<void>;
  removeItemFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setWishlist([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await getWishlist();
      setWishlist(response.data);
    } catch (err) {
      console.error("Failed to load wishlist", err);
      setError("Failed to load wishlist");
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const addItemToWishlist = async (productId: string) => {
    try {
      await addToWishlist(productId);
      toast.success("Added to wishlist");
      await fetchWishlist(); // Refresh to get full product details if needed, or optimistically update
    } catch (err) {
      console.error("Failed to add to wishlist", err);
      toast.error("Failed to add to wishlist");
      throw err;
    }
  };

  const removeItemFromWishlist = async (productId: string) => {
    try {
      await removeFromWishlist(productId);
      toast.success("Removed from wishlist");
      // Optimistic update or refetch
      setWishlist((prev) => prev.filter((item) => item.id !== productId && item._id !== productId));
    } catch (err) {
      console.error("Failed to remove from wishlist", err);
      toast.error("Failed to remove from wishlist");
      throw err;
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId || item._id === productId);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [isAuthenticated, fetchWishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isLoading,
        error,
        fetchWishlist,
        addItemToWishlist,
        removeItemFromWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
