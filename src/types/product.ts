export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  isActive: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductResponse {
  status: number;
  message: string;
  data: {
    products: Product[];
    _meta: ProductMeta;
  };
}
export interface CartItem extends Product {
  quantity: number;
}
