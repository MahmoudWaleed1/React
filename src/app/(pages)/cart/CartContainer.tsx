"use client";
import { Button, CartProduct } from "@/components";
import { cartContext } from "@/contexts/cartContext";
import { formatPrice } from "@/helpers/currency";
import { CartProduct as CartProductI, CartResponse } from "@/interfaces";
import { apiService } from "@/services/api";
import { Separator } from "@radix-ui/react-separator";
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CartContainerProps {
  cartData: CartResponse;
}

export function CartContainer({ cartData }: CartContainerProps) {
  const [innerCartData, setInnerCartData] = useState<CartResponse>(cartData);
  const [isClearingCart, setIsClearingCart] = useState<boolean>(false);
  const { cartCount, setCartCount } = useContext(cartContext);

  useEffect(() => {
    setCartCount(innerCartData.numOfCartItems);
  }, [innerCartData]);

  async function handleRemoveCartItem(
    productId: string,
    setIsRemovingItem: (newState: boolean) => void
  ) {
    setIsRemovingItem(true);
    const response = await apiService.removeSpecificCartItem(productId);
    setIsRemovingItem(false);
    if (response.status == "success") {
      toast.success("Product removed successfully", {
        position: "top-right",
      });
      const newCartData: CartResponse = await apiService.getLoggedUserCart();
      setInnerCartData(newCartData);
    } else {
      toast.error(response.message, {
        position: "top-right",
      });
    }
  }

  async function handleClearCart() {
    setIsClearingCart(true);
    const response = await apiService.clearCart();
    setIsClearingCart(false);
    if (response.message == "success") {
      toast.success("Cart Cleared successfully", {
        position: "top-right",
      });
      const newCartData: CartResponse = await apiService.getLoggedUserCart();
      setInnerCartData(newCartData);
    } else {
      toast.error(response.message, {
        position: "top-right",
      });
    }
  }

  async function handleUpdateCartProductCount(
    productId: string,
    count: number
  ) {
    const response = await apiService.updateCartProductCount(productId, count);
    if (response.status == "success") {
      const newCartData: CartResponse = await apiService.getLoggedUserCart();
      setInnerCartData(newCartData);
    }
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        {innerCartData.numOfCartItems > 0 && (
          <p className="text-muted-foreground">
            {innerCartData.numOfCartItems} item
            {innerCartData.numOfCartItems !== 1 ? "s" : ""} in your cart
          </p>
        )}
      </div>

      {innerCartData.numOfCartItems > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {innerCartData.data.products.map((item) => (
                <CartProduct
                  key={item._id}
                  item={item}
                  onRemoveItem={handleRemoveCartItem}
                  onUpdateItemCount={handleUpdateCartProductCount}
                />
              ))}
            </div>

            {/* Clear Cart */}
            <div className="mt-6">
              <Button
                disabled={isClearingCart}
                onClick={handleClearCart}
                variant="outline"
              >
                {isClearingCart ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-20">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({innerCartData.numOfCartItems} items)</span>
                  <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-semibold text-lg mb-6">
                <span>Total</span>
                <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
              </div>

              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>

              <Button variant="outline" className="w-full mt-2" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            No product in your cart
          </h2>
          <Button variant="outline" className="w-fit mt-2" asChild>
            <Link href="/products">Browse products</Link>
          </Button>
        </div>
      )}
    </>
  );
}
