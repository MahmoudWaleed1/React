import { Product } from "./product";

export interface WishlistResponse {
  status: string;
  data: WishlistData;
}

export interface WishlistData {
  _id: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}