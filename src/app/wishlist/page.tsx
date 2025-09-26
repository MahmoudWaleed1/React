"use client";
import React, { useState } from "react"; 
import { useWishlist } from "@/contexts/wishlistContext";
import { Button, LoadingSpinner, ProductCard } from "@/components";
import { Grid, List } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, loading } = useWishlist();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mx-auto">My Wishlist ❤️</h1>
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

      {wishlist.length === 0 ? (
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
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}