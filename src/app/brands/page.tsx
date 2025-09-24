"use client";
import { Button, LoadingSpinner} from "@/components";
import { BrandCard } from "@/components/brands/BrandCard";
import { Brand } from "@/interfaces";
import { apiService } from "@/services/api";
import { Grid, List } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Brands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  async function getBrands() {
    setLoading(true);
    const { data } = await apiService.getAllBrands();
    setBrands(data);
    setLoading(false);
  }

  useEffect(() => {
    getBrands();
  }, []);

  if (loading && brands.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">All Brands</h1>
      </div>

      <div className="flex justify-end mb-6 gap-2">
        <div className="flex items-center border rounded-md">
        </div>
      </div>

      {/* Brands Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl"
            : "grid-cols-1"
        }`}
      >
        {brands.map((brand) => (
          <BrandCard
            key={brand._id}
            brand={brand}
          />
        ))}
      </div>
    </div>
  );
}
