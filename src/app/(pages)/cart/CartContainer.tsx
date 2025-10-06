"use client";
import { Button, CartProduct } from "@/components";
import { cartContext } from "@/contexts/cartContext";
import { formatPrice } from "@/helpers/currency";
import { CartResponse } from "@/interfaces";
import { apiService } from "@/services/api";
import { Separator } from "@radix-ui/react-separator";
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export function CartContainer() {
  const [innerCartData, setInnerCartData] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClearingCart, setIsClearingCart] = useState(false);
  const [isProceedingToCheckout, setIsProceedingToCheckout] = useState(false);
  const { setCartCount } = useContext(cartContext);
  const router = useRouter();

  // 🔑 fetch cart on mount
  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      const response = await apiService.getLoggedUserCart();
      setInnerCartData(response);
      setCartCount(response.numOfCartItems);
      setLoading(false);
    }
    fetchCart();
  }, [setCartCount]);

  async function handleRemoveCartItem(
    productId: string,
    setIsRemovingItem: (newState: boolean) => void
  ) {
    setIsRemovingItem(true);
    const response = await apiService.removeSpecificCartItem(productId);
    setIsRemovingItem(false);
    if (response.status === "success") {
      toast.success("Product removed successfully", { position: "top-right" });
      const newCartData = await apiService.getLoggedUserCart();
      setInnerCartData(newCartData);
      setCartCount(newCartData.numOfCartItems);
    } else {
      toast.error(response.message ?? "An error occurred", { position: "top-right" });
    }
  }

  async function handleClearCart() {
    setIsClearingCart(true);
    const response = await apiService.clearCart();
    setIsClearingCart(false);
    if (response.message === "success") {
      toast.success("Cart cleared successfully", { position: "top-right" });
      const newCartData = await apiService.getLoggedUserCart();
      setInnerCartData(newCartData);
      setCartCount(newCartData.numOfCartItems);
    } else {
      toast.error(response.message ?? "An error occurred", { position: "top-right" });
    }
  }

  async function handleUpdateCartProductCount(productId: string, count: number) {
    const response = await apiService.updateCartProductCount(productId, count);
    if (response.status === "success") {
      const newCartData = await apiService.getLoggedUserCart();
      setInnerCartData(newCartData);
      setCartCount(newCartData.numOfCartItems);
    }
  }

  const handleProceedToCheckout = () => {
    setIsProceedingToCheckout(true);
    // Use router.push for controlled navigation
    router.push("/addresses");
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!innerCartData || innerCartData.numOfCartItems === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          No products in your cart
        </h2>
        <Button variant="outline" className="mt-2" asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {innerCartData.numOfCartItems} item
          {innerCartData.numOfCartItems !== 1 ? "s" : ""} in your cart
        </p>
      </div>

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
            
            <Button 
              onClick={handleProceedToCheckout}
              disabled={isProceedingToCheckout}
              className="w-full" 
              size="lg"
            >
              {isProceedingToCheckout ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Proceed to Checkout
                </>
              ) : (
                'Proceed to Checkout'
              )}
            </Button>

            <Button variant="outline" className="w-full mt-2" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}