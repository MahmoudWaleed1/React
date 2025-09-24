"use client";
import { Button, LoadingSpinner} from "@/components";
import { CategoryCard } from "@/components/categories/CategoryCard";
import { Category, Subcategory } from "@/interfaces";
import { apiService } from "@/services/api";
import React, { useEffect, useState } from "react";

export default function Brands() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [subCategories, setSubCategories] = useState<Subcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  async function getCategories() {
    setLoading(true);
    try {
      const { data } = await apiService.getAllCategories();
      setCategories(data);
    } catch (err) {
      setError("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  }

  const handleFetchSubcategories = async (
    categoryId: string,
    categoryName: string,
    setCardLoading: (isLoading: boolean) => void
  ) => {
    setSelectedCategory({ _id: categoryId, name: categoryName, slug: '', image: '' });
    setSubCategories([]); 
    setCardLoading(true); 
    
    try {
      const res = await apiService.getAllSubCategoriesOnCategory(categoryId);
      setSubCategories(res.data);
    } catch (err) {
      setError("Failed to fetch subcategories.");
    } finally {
      setCardLoading(false); 
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading && categories.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={getCategories}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-6 gap-2">
        <div className="flex items-center border rounded-md">
        </div>
      </div>
      
      
      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg"
            : "grid-cols-1"
        }`}
      >
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
            onCardClick={handleFetchSubcategories}
          />
        ))}
      </div>

      
      {selectedCategory && (
        <div className="mt-8 p-4 rounded-lg ">
          <h2 className="text-xl font-semibold mb-4 text-center">{selectedCategory.name} Subcategories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subCategories.map((subCategory) => (
              <div key={subCategory._id} className="p-4 border rounded-lg shadow-sm bg-white text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
                <p className="font-medium text-gray-700">{subCategory.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}