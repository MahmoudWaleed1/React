"use client";
import CartContextProvider from "@/contexts/cartContext";
import { WishlistProvider } from '@/contexts/wishlistContext';
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function ProvidersContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}
