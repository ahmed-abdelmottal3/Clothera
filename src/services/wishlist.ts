import axiosInstance from "@/lib/axios";
import { WishlistResponse, AddToWishlistResponse } from "@/types/wishlist";

export const getWishlist = async (): Promise<WishlistResponse> => {
  const response = await axiosInstance.get("/wishlist");
  return response.data;
};

export const addToWishlist = async (productId: string): Promise<AddToWishlistResponse> => {
  const response = await axiosInstance.post("/wishlist", { productId });
  return response.data;
};

export const removeFromWishlist = async (productId: string): Promise<AddToWishlistResponse> => {
  const response = await axiosInstance.delete(`/wishlist/${productId}`);
  return response.data;
};
