"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/interfaces";
import { apiService } from "@/services/api";
import { Button, LoadingSpinner, ProductCard } from "@/components";
import { Grid, List } from "lucide-react";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  async function getWishlistProducts() {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getLoggedUserWishlist();
      setWishlistProducts(response.data.products || []);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      setError("Failed to load your wishlist. Please try again.");
      setWishlistProducts([]); // Ensure wishlistProducts is an empty array on error
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getWishlistProducts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={getWishlistProducts}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Wishlist ❤️</h1>
        <div className="flex items-center border rounded-md">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="rounded-r-none"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Your wishlist is empty. Start adding some products!</p>
        </div>
      ) : (
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "grid-cols-1"
          }`}
        >
          {wishlistProducts.map((product) => (
            <ProductCard key={product._id} product={product} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}