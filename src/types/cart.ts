export interface CartProduct {
  subcategory: {
    _id: string;
    name: string;
    slug: string;
    category: string;
  }[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  ratingsAverage: number;
  id: string;
}

export interface CartItem {
  count: number;
  _id: string;
  product: CartProduct;
  price: number;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  data: CartData;
}

export interface AddToCartRequest {
  productId: string;
}

export interface UpdateCartItemRequest {
  count: number;
}
