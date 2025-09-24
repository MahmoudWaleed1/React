"use client";

import Image from "next/image";
import { Brand } from "@/interfaces";

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
  if (!isOpen) return null;

  return (
    <>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-white text-lg font-medium">Loading brand details...</p>
          </div>
        </div>
      )}

      {/* Modal Content */}
      {!isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative mx-4 flex flex-col">
            <div className="border-t border-gray-300 mb-4" />

            {error ? (
              <div className="text-center p-4 flex-1">
                <p className="text-red-500 mb-4">{error}</p>
                <p className="text-gray-600">Showing basic information:</p>

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                  <div className="w-full sm:w-1/2">
                    <h2 className="text-2xl font-bold text-center sm:text-left">
                      {brand.name}
                    </h2>
                  </div>
                  <div className="relative w-full sm:w-1/2 h-40">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:w-1/2">
                  <h2 className="text-2xl font-bold text-center sm:text-left">
                    {brandDetails?.name || brand.name}
                  </h2>
                </div>
                
                <div className="relative w-full sm:w-1/2 h-40">
                  <Image
                    src={brandDetails?.image || brand.image}
                    alt={brandDetails?.name || brand.name}
                    fill
                    className="object-contain"
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
      )}
    </>
  );
}