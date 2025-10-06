export interface Order {
  _id: string;
  createdAt: string;
  totalOrderPrice: number;
  cartItems: {
    product: {
      sold(sold: any): import("react").ReactNode;
      _id: string;
      title: string;
      imageCover: string;
    };
    count: number;
    price: number;
  }[];
}
