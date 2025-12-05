"use client";

import { useCartContext } from "@/context/CartContext";

export const useCart = () => {
  const context = useCartContext();
  
  return {
    ...context,
    refetch: context.fetchCart,
  };
};
