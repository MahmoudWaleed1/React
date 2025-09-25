"use client";
import CartContextProvider from "@/contexts/cartContext";
import { WishlistProvider } from '@/contexts/wishlistContext';
import { ReactNode } from "react";

export default function ProvidersContainer({
  children,
}: {
  children: ReactNode;
}) {
  return <CartContextProvider>
    <WishlistProvider>
      {children}
    </WishlistProvider>
    </CartContextProvider>;
}
