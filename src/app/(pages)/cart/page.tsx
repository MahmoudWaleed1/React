import { CartResponse } from "@/interfaces";
import { apiService } from "@/services/api";
import React from "react";
import { CartContainer } from "./CartContainer";

export default async function Cart() {
  async function fetchCartProducts(): Promise<CartResponse> {
    const response = await apiService.getLoggedUserCart();
    return response;
  }

  const cartData: CartResponse = await fetchCartProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <CartContainer cartData={cartData} />
    </div>
  );
}
