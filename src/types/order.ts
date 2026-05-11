export interface OrderProduct {
  productId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  products: OrderProduct[];
}

export interface OrderResponseData {
  _id: string;
  user: string;
  products: {
    product: string;
    quantity: number;
    image?: string;
    _id?: string;
  }[];
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}

export interface CreateOrderResponse {
  status: number;
  message: string;
  data: OrderResponseData;
}
export interface GetOrderData {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  quantity: number;
  productName: string;
  price: number;
  image: string;
}

export interface GetOrdersResponse {
  status: number;
  message: string;
  data: GetOrderData[];
}

export interface GetOrdersListResponse {
  status: number;
  message: string;
  data: OrderResponseData[];
}
