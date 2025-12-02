import api from "@/lib/axios";
import { ProductResponse, SingleProductResponse } from "@/types/product";

export async function getAllProducts(): Promise<ProductResponse> {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProductById(id: string): Promise<SingleProductResponse> {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}