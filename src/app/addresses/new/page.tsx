"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";
import { apiService } from "@/services/api";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewAddressPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    phone: "",
    city: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiService.addAddress(formData);
      toast.success("Address added successfully!");
      
      // Use redirect instead of router.push for better reliability
      router.push("/addresses");
      // Force a hard refresh to ensure data is loaded
      setTimeout(() => {
        window.location.reload();
      }, 100);
      
    } catch (error) {
      console.error("Add address error:", error);
      toast.error("Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/addresses">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Add New Address</h1>
          <p className="text-muted-foreground">Enter your delivery details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Address Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Home, Work, etc."
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Address Details</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Street, building, floor, apartment, etc."
            className="w-full border rounded-lg px-3 py-2 min-h-[80px]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Your city"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            asChild
          >
            <Link href="/addresses">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="flex-1"
          >
            {loading ? "Adding..." : "Add Address"}
          </Button>
        </div>
      </form>
    </div>
  );
}