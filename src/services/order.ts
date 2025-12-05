import api from "@/lib/axios";
import {
  OrdersResponse,
  OrderResponse,
  CreateCashOrderRequest,
  CheckoutSessionResponse,
} from "@/types/order";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

/**
 * Get all orders (admin view)
 */
export async function getAllOrders(): Promise<OrdersResponse> {
  try {
    const response = await api.get("/orders");
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || err.message || "Failed to fetch orders";
    console.error("Error fetching orders:", message);
    throw error;
  }
}

/**
 * Get orders for a specific user
 */
export async function getUserOrders(userId: string): Promise<OrdersResponse> {
  try {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || err.message || "Failed to fetch user orders";
    console.error("Error fetching user orders:", message);
    throw error;
  }
}

/**
 * Create a cash on delivery order
 */
export async function createCashOrder(
  cartId: string,
  shippingAddress: CreateCashOrderRequest
): Promise<OrderResponse> {
  try {
    const response = await api.post(`/orders/${cartId}`, shippingAddress);
    toast.success("Order placed successfully!");
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || err.message || "Failed to create order";
    toast.error(message);
    throw error;
  }
}

/**
 * Create a Stripe checkout session for card payment
 */
export async function createCheckoutSession(cartId: string): Promise<CheckoutSessionResponse> {
  try {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const response = await api.post(
      `/orders/checkout-session/${cartId}?url=${baseUrl}`
    );
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || err.message || "Failed to create checkout session";
    toast.error(message);
    throw error;
  }
}
