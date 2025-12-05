import { Product } from "./product";

export interface WishlistResponse {
  status: string;
  count: number;
  data: Product[];
}

export interface AddToWishlistResponse {
  status: string;
  message: string;
  data: string[]; // Array of product IDs
}
