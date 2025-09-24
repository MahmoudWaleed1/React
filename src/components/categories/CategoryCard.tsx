"use client";

import Image from "next/image";
import { Category } from "@/interfaces";
import React, { useState } from "react";

interface CategoryCardProps {
  category: Category;
  onCardClick: (categoryId: string, categoryName: string, setIsLoading: (isLoading: boolean) => void) => void;
}

export function CategoryCard({ category, onCardClick }: CategoryCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => {
    onCardClick(category._id, category.name, setIsLoading);
  };

  return (
    <>
      
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-white text-lg font-medium">Loading Subcategories...</p>
          </div>
        </div>
      )}

      <div
        onClick={handleOpen}
        className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer p-4"
      >
        <div className="relative h-75 w-full flex items-center justify-center overflow-hidden mb-4">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h3 className="text-center text-lg font-medium">{category.name}</h3>
      </div>
    </>
  );
}