"use client";
import { CartResponse } from "@/interfaces";
import { apiService } from "@/services/api";
import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

export const cartContext = createContext<{
  cartCount: number;
  setCartCount: Dispatch<SetStateAction<number>>;
}>({
  cartCount: 0,
  setCartCount: (value: SetStateAction<number>) => null,
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartCount, setCartCount] = useState(0);

  async function getCart() {
    const cartData: CartResponse = await apiService.getLoggedUserCart();
    setCartCount(cartData.numOfCartItems);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <cartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </cartContext.Provider>
  );
}
