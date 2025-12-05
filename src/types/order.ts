export interface OrderProductDetails {
  _id: string;
  title: string;
  imageCover?: string;
  // Add other product fields as needed
}

export interface OrderProduct {
  count: number;
  _id: string;
  product: string | OrderProductDetails; // Can be ID string or populated object
  price: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface Order {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: string;
  cartItems: OrderProduct[];
  paidAt?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface OrdersResponse {
  status: string;
  results: number;
  data: Order[];
}

export interface OrderResponse {
  status: string;
  data: Order;
}

export interface CreateCashOrderRequest {
  shippingAddress: ShippingAddress;
}

export interface CheckoutSessionResponse {
  status: string;
  session: {
    url: string;
    id: string;
  };
}
