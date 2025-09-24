"use client";
import { formatPrice } from "@/helpers/currency";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { CartProduct as CartProductI } from "@/interfaces";

interface CartProductProps {
  item: CartProductI;
  onRemoveItem: (
    productId: string,
    setIsRemovingItem: (newState: boolean) => void
  ) => void;
  onUpdateItemCount: (productId: string, count: number) => void;
}

export function CartProduct({
  item,
  onRemoveItem,
  onUpdateItemCount,
}: CartProductProps) {
  const [isRemovingItem, setIsRemovingItem] = useState(false);
  const [productCount, setProductCount] = useState(item.count);
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout>();

  function handleUpdateProductCount(count: number) {
    clearTimeout(timeOutId);

    const id = setTimeout(() => {
      if (count != item.count) {
        onUpdateItemCount(item.product._id, count);
      }
    }, 500);
    setTimeOutId(id);


    
    setProductCount(count);
  }

  return (
    <div key={item._id} className="flex gap-4 p-4 border rounded-lg">
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={item.product.imageCover}
          alt={item.product.title}
          fill
          className="object-cover rounded-md"
          sizes="80px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold line-clamp-2">
          <Link
            href={`/products/${item.product.id}`}
            className="hover:text-primary transition-colors"
          >
            {item.product.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">
          {item.product.brand?.name}
        </p>
        <p className="font-semibold text-primary mt-2">
          {formatPrice(item.price)}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <Button
          onClick={() => onRemoveItem(item.product._id, setIsRemovingItem)}
          variant="ghost"
          size="sm"
          disabled={isRemovingItem}
        >
          {isRemovingItem ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>

        <div className="flex items-center gap-2">
          <Button
            disabled={item.count == 1}
            onClick={() => handleUpdateProductCount(productCount - 1)}
            variant="outline"
            size="sm"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{productCount}</span>
          <Button
            onClick={() => handleUpdateProductCount(productCount + 1)}
            variant="outline"
            size="sm"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
