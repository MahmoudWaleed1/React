"use client";

import Image from "next/image";
import { Brand } from "@/interfaces";
import { useState } from "react";
import { apiService } from "@/services/api";
import { BrandModal } from "./BrandModal";

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [brandDetails, setBrandDetails] = useState<Brand | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = async () => {
    setIsLoading(true);
    setError(null);
    setIsOpen(false); // Ensure modal is closed during loading
    
    try {
      const res = await apiService.getBrandDetails(brand._id);
      const data = res?.data || res;
      setBrandDetails(data);
      setIsOpen(true); // Only open modal after data is loaded
    } catch (err) {
      console.error("Failed to fetch brand details:", err);
      setError("Failed to load brand details");
      setIsOpen(true); // Open modal even on error to show basic info
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setBrandDetails(null);
    setError(null);
  };
  

  return (
    <>
      {/* Your original loading spinner - appears during loading */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-white text-lg font-medium">Loading brand details...</p>
          </div>
        </div>
      )}

      <div
        onClick={handleOpen}
        className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        <div className="relative h-40 w-full flex items-center justify-center overflow-hidden mt-6">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>

        <h3 className="mt-2 text-center text-lg font-medium my-6">{brand.name}</h3>
      </div>

      {/* Modal only shows when not loading AND isOpen */}
      {!isLoading && isOpen && (
        <BrandModal
          isOpen={isOpen}
          isLoading={false} // Always false here since we're not loading
          error={error}
          brand={brand}
          brandDetails={brandDetails}
          onClose={handleClose}
        />
      )}
    </>
  );
}