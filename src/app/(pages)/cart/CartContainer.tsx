// CartContainer.tsx - FIXED ADDRESS LOADING
"use client";
import { Button, CartProduct } from "@/components";
import { cartContext } from "@/contexts/cartContext";
import { formatPrice } from "@/helpers/currency";
import { CartResponse } from "@/interfaces";
import { apiService } from "@/services/api";
import { Separator } from "@radix-ui/react-separator";
import { Loader2, Trash2, MapPin, Check } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CartContainerProps {
  cartData: CartResponse;
}

interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export function CartContainer({ cartData }: CartContainerProps) {
  const [innerCartData, setInnerCartData] = useState<CartResponse>(cartData);
  const [isClearingCart, setIsClearingCart] = useState(false);
  const { setCartCount } = useContext(cartContext);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [addressesLoading, setAddressesLoading] = useState(true);

  useEffect(() => {
    setCartCount(innerCartData.numOfCartItems);
    loadAddresses();
  }, [innerCartData]);

 async function loadAddresses() {
  try {
    setAddressesLoading(true);
    const response = await apiService.getLoggedUserAddresses();
    console.log("CartContainer addresses response:", response); // Debug log
    
    // Better response handling
    if (response && response.data && Array.isArray(response.data)) {
      setAddresses(response.data);
    } else if (Array.isArray(response)) {
      setAddresses(response);
    } else {
      console.warn("Unexpected addresses response format:", response);
      setAddresses([]);
    }
  } catch (error) {
    console.error("Failed to load addresses:", error);
    setAddresses([]);
  } finally {
    setAddressesLoading(false);
  }
  }

  async function handleRemoveCartItem(productId: string, setIsRemoving: (state: boolean) => void) {
    setIsRemoving(true);
    try {
      const response = await apiService.removeSpecificCartItem(productId);
      if (response.status === "success") {
        const newCartData = await apiService.getLoggedUserCart();
        setInnerCartData(newCartData);
        toast.success("Product removed");
      }
    } catch {
      toast.error("Failed to remove item");
    } finally {
      setIsRemoving(false);
    }
  }

  async function handleClearCart() {
    setIsClearingCart(true);
    try {
      const response = await apiService.clearCart();
      if (response.message === "success") {
        const newCartData = await apiService.getLoggedUserCart();
        setInnerCartData(newCartData);
        toast.success("Cart cleared");
      }
    } catch {
      toast.error("Failed to clear cart");
    } finally {
      setIsClearingCart(false);
    }
  }

  async function handleUpdateCartProductCount(productId: string, count: number) {
    try {
      const response = await apiService.updateCartProductCount(productId, count);
      if (response.status === "success") {
        const newCartData = await apiService.getLoggedUserCart();
        setInnerCartData(newCartData);
      }
    } catch {
      toast.error("Failed to update quantity");
    }
  }

  function handleProceedToCheckout() {
    // Reload addresses first to get the latest data
    loadAddresses().then(() => {
      if (addresses.length === 0) {
        toast.error("Please add an address first");
        setShowAddressModal(true); // Show modal even if no addresses
      } else {
        setShowAddressModal(true);
      }
    });
  }

  async function handleCheckoutWithAddress() {
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }

    setCheckoutLoading(true);
    try {
      const address = addresses.find(addr => addr._id === selectedAddress);
      if (!address) {
        toast.error("Selected address not found");
        return;
      }

      const response = await apiService.checkout(innerCartData.data._id, {
        details: address.details,
        phone: address.phone,
        city: address.city
      });
      
      if (response.status === "success" && response.session?.url) {
        window.location.href = response.session.url;
      } else {
        toast.error("Failed to proceed to checkout");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout failed");
    } finally {
      setCheckoutLoading(false);
    }
  }

  if (innerCartData.numOfCartItems === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
        <Button asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {innerCartData.numOfCartItems} item{innerCartData.numOfCartItems !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {innerCartData.data.products.map((item) => (
            <CartProduct
              key={item._id}
              item={item}
              onRemoveItem={handleRemoveCartItem}
              onUpdateItemCount={handleUpdateCartProductCount}
            />
          ))}
          
          <Button onClick={handleClearCart} variant="outline" disabled={isClearingCart}>
            {isClearingCart ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
            Clear Cart
          </Button>
        </div>

        {/* Order Summary */}
        <div className="border rounded-lg p-6 sticky top-20 h-fit">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
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

          <Button onClick={handleProceedToCheckout} className="w-full">
            Proceed to Checkout
          </Button>
        </div>
      </div>

      {/* Address Selection Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold">Select Delivery Address</h3>
            </div>

            {addressesLoading ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p>Loading addresses...</p>
              </div>
            ) : addresses.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">No addresses found. Please add an address first.</p>
                <Button asChild className="w-full">
                  <Link href="/addresses/new">Add New Address</Link>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddressModal(false)} 
                  className="w-full mt-2"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {addresses.map((address) => (
                    <div
                      key={address._id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedAddress === address._id 
                          ? "border-blue-500 bg-blue-50" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedAddress(address._id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex items-center justify-center w-5 h-5 rounded-full border mt-0.5 ${
                          selectedAddress === address._id 
                            ? "bg-blue-500 border-blue-500" 
                            : "border-gray-300"
                        }`}>
                          {selectedAddress === address._id && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold">{address.name}</h4>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{address.details}</p>
                          <p className="text-gray-600 text-sm">{address.city}</p>
                          <p className="text-gray-600 text-sm">{address.phone}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddressModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCheckoutWithAddress}
                    disabled={!selectedAddress || checkoutLoading}
                    className="flex-1"
                  >
                    {checkoutLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Proceed to Payment"
                    )}
                  </Button>
                </div>

                <div className="mt-4 text-center">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/addresses/new">+ Add New Address</Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}