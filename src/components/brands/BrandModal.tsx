"use client";
import Image from "next/image";
import { Brand } from "@/interfaces";
import { useState } from "react";

interface BrandModalProps {
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  brand: Brand;
  brandDetails: Brand | null;
  onClose: () => void;
}

export function BrandModal({ 
  isOpen, 
  isLoading, 
  error, 
  brand, 
  brandDetails, 
  onClose 
}: BrandModalProps) {
  const [imgLoading, setImgLoading] = useState(true);

  if (!isOpen) return null;

  const activeBrand = brandDetails || brand;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative mx-4 flex flex-col">
        <div className="border-t border-gray-300 mb-4" />

        {error ? (
          <div className="text-center p-4 flex-1">
            <p className="text-red-500 mb-4">{error}</p>
            <p className="text-gray-600">Showing basic information:</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-4 relative">
            <div className="w-full sm:w-1/2">
              <h2 className="text-2xl font-bold text-center sm:text-left">
                {activeBrand.name}
              </h2>
            </div>

            <div className="relative w-full sm:w-1/2 h-40 flex items-center justify-center">
              {/* Spinner while image is loading */}
              {imgLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              <Image
                src={activeBrand.image}
                alt={activeBrand.name}
                fill
                className={`object-contain transition-opacity duration-500 ${
                  imgLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoadingComplete={() => setImgLoading(false)}
              />
            </div>
          </div>
        )}

        <div className="border-t border-gray-300 mt-6 mb-4" />

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
