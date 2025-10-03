export interface Order {
  _id: string;
  createdAt: string;
  totalOrderPrice: number;
  cartItems: {
    product: {
      _id: string;
      title: string;
      imageCover: string;
    };
    count: number;
    price: number;
  }[];
}
