import api from "@/lib/axios";
import { CartResponse, AddToCartRequest, UpdateCartItemRequest } from "@/types/cart";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

/**
 * Get the current user's cart
 */
export async function getCart(): Promise<CartResponse> {
  try {
    const response = await api.get("/cart");
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || err.message || "Failed to fetch cart";
    console.error("Error fetching cart:", message);
    throw error;
  }
}

/**
 * Add a product to cart
 */
export async function addToCart(productId: string): Promise<CartResponse> {
  try {
    const payload: AddToCartRequest = { productId };
    const response = await api.post("/cart", payload);
    toast.success("Product added to cart!");
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || err.message || "Failed to add product to cart";
    toast.error(message);
    throw error;
  }
}

/**
 * Update cart item quantity
 */
export async function updateCartItem(itemId: string, count: number): Promise<CartResponse> {
  try {
    const payload: UpdateCartItemRequest = { count };
    const response = await api.put(`/cart/${itemId}`, payload);
    toast.success("Cart updated!");
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || err.message || "Failed to update cart";
    toast.error(message);
    throw error;
  }
}

/**
 * Remove a specific item from cart
 */
export async function removeCartItem(itemId: string): Promise<CartResponse> {
  try {
    const response = await api.delete(`/cart/${itemId}`);
    toast.success("Item removed from cart");
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || err.message || "Failed to remove item";
    toast.error(message);
    throw error;
  }
}

/**
 * Clear the entire cart
 */
export async function clearCart(): Promise<{ message: string }> {
  try {
    const response = await api.delete("/cart");
    toast.success("Cart cleared successfully");
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || err.message || "Failed to clear cart";
    toast.error(message);
    throw error;
  }
}
