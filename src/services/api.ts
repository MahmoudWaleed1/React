import { CartResponse, WishlistResponse } from "@/interfaces";
import { AddProductToCartResponse, BrandsResponse, CategoriesResponse, SubCategoriesResponse, AddressResponse, ProductsResponse, OrdersResponse, SingleBrandResponse, SingleCategoryResponse, SingleSubCategoryResponse, SingleProductResponse, SingleAddressResponse } from "@/types";


class ApiService {
    #baseUrl: string = "https://ecommerce.routemisr.com/";


    #getHeaders() {
        return {
            "Content-Type": "application/json",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YWYxMjJmZmUxZDBkYWEzOGQxNDhmZCIsIm5hbWUiOiJNb2hhbWVkIEFiZCBFbCBNb2F0eSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU2MzAzOTQzLCJleHAiOjE3NjQwNzk5NDN9.NckDzfKxU4EVmLKHg2GYR2lklfuKhAgEBKSr_b7VJ_U"
        }
    }

    async getAllProducts(): Promise<ProductsResponse> {
        return await fetch(
            this.#baseUrl + "api/v1/products"
        ).then((res) => res.json());
    }

    async getProductDetails(productId: string): Promise<SingleProductResponse> {
        return await fetch(this.#baseUrl + "api/v1/products/" + productId).then((res) => res.json());
    }
    async getAllBrands(): Promise<BrandsResponse> {
        return await fetch(
            this.#baseUrl + "api/v1/brands"
        ).then((res) => res.json());
    }

    async getBrandDetails(brandId: string): Promise<SingleBrandResponse> {
        return await fetch(this.#baseUrl + "api/v1/brands/" + brandId).then((res) => res.json());
    }
    async getAllCategories(): Promise<CategoriesResponse> {
        return await fetch(
            this.#baseUrl + "api/v1/categories"
        ).then((res) => res.json());
    }

    async getCategoriesDetails(categoryId: string): Promise<SingleCategoryResponse> {
        return await fetch(this.#baseUrl + "api/v1/categories/" + categoryId).then((res) => res.json());
    }

    async getAllSubCategories(): Promise<SubCategoriesResponse> {
        return await fetch(
            this.#baseUrl + "api/v1/subcategories"
        ).then((res) => res.json());
    }

    async getSubCategoriesDetails(subCategoryId: string): Promise<SingleSubCategoryResponse> {
        return await fetch(this.#baseUrl + "api/v1/subcategories/" + subCategoryId).then((res) => res.json());
    }
    async getAllSubCategoriesOnCategory(categoryId: string): Promise<SubCategoriesResponse> {
        return await fetch(this.#baseUrl + "api/v1/categories/" + categoryId + "/subcategories/").then((res) => res.json());
    }

    async addProductToCart(productId: string): Promise<AddProductToCartResponse> {
        return await fetch(this.#baseUrl + "api/v1/cart", {
            method: 'POST',
            body: JSON.stringify({
                productId
            }),
            headers: this.#getHeaders()
        }).then(res => res.json())
    }
    async addProductToWishlist(productId: string): Promise<WishlistResponse> {
        return await fetch(this.#baseUrl + "api/v1/wishlist", {
            method: 'POST',
            body: JSON.stringify({
                productId
            }),
            headers: this.#getHeaders()
        }).then(res => res.json());
    }
    async removeFromWishlist(productId: string): Promise<WishlistResponse> {
        return await fetch(this.#baseUrl + "api/v1/wishlist/" + productId, {
            headers: this.#getHeaders(),
            method: 'delete'
        }).then(res => res.json())
    }

    async getLoggedUserWishlist(): Promise<WishlistResponse> {
        return await fetch(this.#baseUrl + "api/v1/wishlist", {
            headers: this.#getHeaders(),
        }).then(res => res.json());
    }

    async getLoggedUserCart(): Promise<CartResponse> {
        return await fetch(this.#baseUrl + "api/v1/cart", {
            headers: this.#getHeaders()
        }).then(res => res.json())
    }

    async removeSpecificCartItem(productId: string): Promise<CartResponse> {
        return await fetch(this.#baseUrl + "api/v1/cart/" + productId, {
            headers: this.#getHeaders(),
            method: 'delete'
        }).then(res => res.json())
    }

    async clearCart(): Promise<CartResponse> {
        return await fetch(this.#baseUrl + "api/v1/cart", {
            headers: this.#getHeaders(),
            method: 'delete'
        }).then(res => res.json())
    }

    async updateCartProductCount(productId: string, count: number): Promise<CartResponse> {
        return await fetch(this.#baseUrl + "api/v1/cart/" + productId, {
            method: 'put',
            body: JSON.stringify({
                count
            }),
            headers: this.#getHeaders()
        }).then(res => res.json())
    }

    async checkout(cartId: string, shippingAddress: { details: string; phone: string; city: string }) {
        return await fetch(this.#baseUrl + "api/v1/orders/checkout-session/" + cartId + "?url=http://localhost:3000", {
            method: 'POST',
            body: JSON.stringify({
                "shippingAddress": { ...shippingAddress }
            }),
            headers: this.#getHeaders()
        }).then(res => res.json())
    }

    async addAddress(addressData: { name: string; details: string; phone: string; city: string }): Promise<AddressResponse> {
            return await fetch(this.#baseUrl + "api/v1/addresses", {
                method: 'POST',
                body: JSON.stringify(addressData),
                headers: this.#getHeaders()
            }).then(res => res.json())
}

    async removeAddress(userId: string): Promise<AddressResponse> {
        return await fetch(this.#baseUrl + "api/v1/addresses/" + userId, {
            headers: this.#getHeaders(),
            method: 'delete'
        }).then(res => res.json())
    }

    async getSpecificAddress(userId: string): Promise<SingleAddressResponse> {
        return await fetch(this.#baseUrl + "api/v1/addresses/" + userId).then((res) => res.json());
    }

    async getLoggedUserAddresses(): Promise<AddressResponse> {
        return await fetch(this.#baseUrl + "api/v1/addresses").then((res) => res.json());
    }

    async getAllOrders(): Promise<OrdersResponse> {
        return await fetch(this.#baseUrl + "api/v1/orders").then((res) => res.json());
    }

    async getUserOrders(userId: string): Promise<OrdersResponse> {
        return await fetch(this.#baseUrl + "api/v1/orders/user/" + userId).then((res) => res.json());
    }


}

export const apiService = new ApiService()