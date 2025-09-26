export interface Order {
  _id: string;
  user: string;
  cartItems: {
    product: string;
    quantity: number;
    price: number;
    _id: string;
  }[];
  totalOrderPrice: number;
  paymentMethodType: 'card' | 'cash';
  deliveredAt?: string;
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
  createdAt: string;
  updatedAt: string;
}