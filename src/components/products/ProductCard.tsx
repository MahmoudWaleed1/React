"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Loader2 } from "lucide-react";
import { renderStars } from "@/helpers/rating";
import { formatPrice } from "@/helpers/currency";
import { AddToCartBtn } from "@/components";
import { useContext, useState } from "react";
import { apiService } from "@/services/api";
import toast from "react-hot-toast";
import { cartContext } from "@/contexts/cartContext";
import { useWishlist } from "@/contexts/wishlistContext";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const { setCartCount } = useContext(cartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const isWishlisted = isInWishlist(product._id);

  async function handleAddProductToCart() {
    setAddToCartLoading(true);
    const data = await apiService.addProductToCart(product?.id ?? "");
    console.log(data);
    setCartCount(data.numOfCartItems);
    setAddToCartLoading(false);
    toast("Product added successfully to ur cart", {
      icon: "✅",
      position: "bottom-right",
    });
  }

  const handleWishlistToggle = async () => {
    setWishlistLoading(true);
    try {
      if (isWishlisted) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product);
      }
    } finally {
      setWishlistLoading(false);
    }
  };

  const HeartButton = ({ size = "sm", className = "" }: { size?: "sm" | "icon"; className?: string }) => (
    <Button
      variant="ghost"
      size={size}
      onClick={handleWishlistToggle}
      disabled={wishlistLoading}
      className={className}
    >
      {wishlistLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
      )}
    </Button>
  );

  if (viewMode === "list") {
    return (
      <div className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
        <div className="relative w-32 h-32 flex-shrink-0">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            className="object-cover rounded-md"
            sizes="128px"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-2">
              <Link
                href={`/products/${product.id}`}
                className="hover:text-primary transition-colors"
              >
                {product.title}
              </Link>
            </h3>
            <HeartButton />
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              {renderStars(product.ratingsAverage)}
              <span className="text-sm text-muted-foreground ml-1">
                ({product.ratingsQuantity})
              </span>
            </div>

            <span className="text-sm text-muted-foreground">
              {product.sold} sold
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  Brand:{" "}
                  <Link
                    href={``}
                    className="hover:text-primary hover:underline transition-colors"
                  >
                    {product.brand.name}
                  </Link>
                </span>
                <span>
                  Category:{" "}
                  <Link
                    href={``}
                    className="hover:text-primary hover:underline transition-colors"
                  >
                    {product.category.name}
                  </Link>
                </span>
              </div>
            </div>

            <AddToCartBtn
              addToCartLoading={addToCartLoading}
              handleAddProductToCart={handleAddProductToCart}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Wishlist Button */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <HeartButton className="bg-white/80 hover:bg-white" />
        </div>

        {/* Badge for sold items */}
        {product.sold > 100 && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
            Popular
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
          <Link
            href={``}
            className="hover:text-primary hover:underline transition-colors"
          >
            {product.brand.name}
          </Link>
        </p>

        {/* Title */}
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
          <Link href={`/products/${product._id}`}>{product.title}</Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">{renderStars(product.ratingsAverage)}</div>
          <span className="text-xs text-muted-foreground">
            ({product.ratingsQuantity})
          </span>
        </div>

        {/* Category */}
        <p className="text-xs text-muted-foreground mb-2">
          <Link
            href={``}
            className="hover:text-primary hover:underline transition-colors"
          >
            {product.category.name}
          </Link>
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-muted-foreground">
            {product.sold} sold
          </span>
        </div>

        <AddToCartBtn
          addToCartLoading={addToCartLoading}
          handleAddProductToCart={handleAddProductToCart}
        />
      </div>
    </div>
  );
}