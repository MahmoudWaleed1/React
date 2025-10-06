"use client";
import { useState, useEffect } from "react";
import { Button, LoadingSpinner } from "@/components";
import { Plus, Home, Trash2, Check, Loader2 } from "lucide-react";
import { apiService } from "@/services/api";
import toast from "react-hot-toast";
import Link from "next/link";
import { Address } from "@/interfaces/address";
import { useRouter } from "next/navigation";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectingId, setSelectingId] = useState<string | null>(null);
  const [navigating, setNavigating] = useState(false);
  const router = useRouter();

  async function loadAddresses() {
    try {
      setLoading(true);
      const response = await apiService.getLoggedUserAddresses();
      if (response?.data && Array.isArray(response.data)) {
        setAddresses(response.data);
      } else if (Array.isArray(response)) {
        setAddresses(response);
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.error("Failed to load addresses:", error);
      toast.error("Failed to load addresses");
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAddresses();
  }, []);

  async function handleDeleteAddress(addressId: string) {
    try {
      setDeletingId(addressId);
      await apiService.removeAddress(addressId);
      toast.success("Address deleted");
      // Update the addresses list locally instead of reloading
      setAddresses(addresses.filter(address => address._id !== addressId));
    } catch {
      toast.error("Failed to delete address");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSelectAddress(address: Address) {
    try {
      setSelectingId(address._id);
      localStorage.setItem("selectedAddress", JSON.stringify(address));

      const cart = await apiService.getLoggedUserCart();
      if (!cart || !cart.data?._id) {
        toast.error("Cart is empty or invalid");
        return;
      }

      const data = await apiService.checkout(cart.data._id, address);

      if (data.session?.url) {
        window.location.href = data.session.url;
      } else {
        toast.error("Failed to start checkout session");
      }
    } catch (err) {
      toast.error("Checkout failed");
    } finally {
      setSelectingId(null);
    }
  }

  function handleNavigateToNewAddress() {
    setNavigating(true);
    router.push("/addresses/new");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-38">
          <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No addresses yet</p>
          <Button 
            onClick={handleNavigateToNewAddress}
            disabled={navigating}
          >
            {navigating ? (
              <Loader2 className="mr-2" />
            ) : null}
            Add Your First Address
          </Button>
        </div>
      ) : (
        <>
          {/* Only show header when there are addresses */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Addresses</h1>
            <Button 
              onClick={handleNavigateToNewAddress}
              disabled={navigating}
            >
              {navigating ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Add New Address
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {addresses.map((address) => (
              <div key={address._id} className="border rounded-lg p-4 relative">
                <button
                  onClick={() => handleDeleteAddress(address._id)}
                  disabled={deletingId === address._id}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 disabled:opacity-50"
                >
                  {deletingId === address._id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>

                <h3 className="font-semibold text-lg mb-2">{address.name}</h3>
                <p className="text-gray-600 text-sm mb-1">{address.details}</p>
                <p className="text-gray-600 text-sm mb-1">{address.city}</p>
                <p className="text-gray-600 text-sm">{address.phone}</p>

                <Button
                  className="mt-4 w-full"
                  onClick={() => handleSelectAddress(address)}
                  disabled={selectingId === address._id}
                >
                  {selectingId === address._id ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Deliver to this address
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}