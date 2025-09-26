"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Home, Trash2, Loader2 } from "lucide-react";
import { apiService } from "@/services/api";
import toast from "react-hot-toast";
import Link from "next/link";

interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadAddresses();
  }, []);

  async function loadAddresses() {
    try {
      setLoading(true);
      const response = await apiService.getLoggedUserAddresses();
      console.log("Addresses page response:", response); // Debug log
      
      // Fix: Properly handle the response structure
      if (response && response.data && Array.isArray(response.data)) {
        setAddresses(response.data);
      } else if (Array.isArray(response)) {
        // If the API returns the array directly
        setAddresses(response);
      } else {
        console.error("Unexpected response format:", response);
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

  async function handleDeleteAddress(addressId: string) {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      setDeletingId(addressId);
      await apiService.removeAddress(addressId);
      toast.success("Address deleted");
      // Reload the addresses list
      await loadAddresses();
    } catch (error) {
      console.error("Delete address error:", error);
      toast.error("Failed to delete address");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p>Loading addresses...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Addresses</h1>
        <Button asChild>
          <Link href="/addresses/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Address
          </Link>
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No addresses yet</p>
          <Button asChild>
            <Link href="/addresses/new">Add Your First Address</Link>
          </Button>
        </div>
      ) : (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}