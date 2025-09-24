"use client";
import CartContextProvider from "@/contexts/cartContext";
import { ReactNode } from "react";

export default function ProvidersContainer({
  children,
}: {
  children: ReactNode;
}) {
  return <CartContextProvider>{children}</CartContextProvider>;
}
