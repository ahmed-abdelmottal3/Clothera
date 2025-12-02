import api from "@/lib/axios";
import { ProductResponse } from "@/types/product";

export async function getAllProducts(): Promise<ProductResponse> {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
