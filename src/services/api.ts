import { CartResponse, WishlistResponse } from "@/interfaces";
import { AddProductToCartResponse, BrandsResponse, CategoriesResponse, SubCategoriesResponse, AddressResponse, ProductsResponse, OrdersResponse, SingleBrandResponse, SingleCategoryResponse, SingleSubCategoryResponse, SingleProductResponse, SingleAddressResponse } from "@/types";
import { getSession } from "next-auth/react";


class ApiService {
    #baseUrl: string = "https://ecommerce.routemisr.com/";


    async #getHeaders() {
    let token = "";

    // Client-side: use getSession from next-auth/react
    if (typeof window !== "undefined") {
        try {
        const session = await getSession();
        token = session?.user?.token ?? "";   // <-- fix: use session.user.token
        console.log("🚀 ~ APIService ~ Client-side session:", session);
        } catch {
        console.log("Client-side session not available");
        }
    } else {
        // Server-side: existing logic (keep your getToken code)
        // ...
    }

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`; // standard header
        headers["token"] = token;                     // keep original header for compatibility
    }

    return headers;
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
        const headers = await this.#getHeaders()
        return await fetch(this.#baseUrl + "api/v1/cart", {
            method: 'POST',
            body: JSON.stringify({
                productId
            }),
            headers: headers
        }).then(res => res.json())
    }
    async addProductToWishlist(productId: string): Promise<WishlistResponse> {
        const headers = await this.#getHeaders()
        return await fetch(this.#baseUrl + "api/v1/wishlist", {
            method: 'POST',
            body: JSON.stringify({
                productId
            }),    
            headers: headers
        }).then(res => res.json());
    }
    async removeFromWishlist(productId: string): Promise<WishlistResponse> {
        const headers = await this.#getHeaders()
        return await fetch(this.#baseUrl + "api/v1/wishlist/" + productId, {
            headers: headers,
            method: 'delete'
        }).then(res => res.json())
    }

    async getLoggedUserWishlist(): Promise<WishlistResponse> {
        const headers = await this.#getHeaders()
        return await fetch(this.#baseUrl + "api/v1/wishlist", {
            headers: headers,
        }).then(res => res.json());
    }

    async getLoggedUserCart(): Promise<CartResponse> {
        const headers = await this.#getHeaders()
        return await fetch(this.#baseUrl + "api/v1/cart", {
            headers: headers
        }).then(res => res.json())
    }

    async removeSpecificCartItem(productId: string): Promise<CartResponse> {
        const headers = await this.#getHeaders()
        return await fetch(this.#baseUrl + "api/v1/cart/" + productId, {
            headers: headers,
            method: 'delete'
        }).then(res => res.json())
    }

    async clearCart(): Promise<CartResponse> {
        const headers = await this.#getHeaders()
        return await fetch(this.#baseUrl + "api/v1/cart", {
            headers: headers,
            method: 'delete'
        }).then(res => res.json())
    }

    async updateCartProductCount(productId: string, count: number): Promise<CartResponse> {
        const headers = await this.#getHeaders()
        return await fetch(this.#baseUrl + "api/v1/cart/" + productId, {
            method: 'put',
            body: JSON.stringify({
                count
            }),
            headers: headers
        }).then(res => res.json())
    }

    async checkout(cartId: string, shippingAddress: { details: string; phone: string; city: string }) {
        const headers = await this.#getHeaders()
        return await fetch(this.#baseUrl + "api/v1/orders/checkout-session/" + cartId + "?url=http://localhost:3000", {
            method: 'POST',
            body: JSON.stringify({
                "shippingAddress": { ...shippingAddress }
            }),
            headers: headers
        }).then(res => res.json())
    }

    async addAddress(addressData: { name: string; details: string; phone: string; city: string }): Promise<AddressResponse> {
        const headers = await this.#getHeaders()
            return await fetch(this.#baseUrl + "api/v1/addresses", {
                method: 'POST',
                body: JSON.stringify(addressData),
                headers: headers
            }).then(res => res.json())
}

    async removeAddress(userId: string): Promise<AddressResponse> {
        const headers = await this.#getHeaders()
        return await fetch(this.#baseUrl + "api/v1/addresses/" + userId, {
            headers: headers,
            method: 'delete'
        }).then(res => res.json())
    }

    async getSpecificAddress(userId: string): Promise<SingleAddressResponse> {
        const headers = await this.#getHeaders();
        return await fetch(this.#baseUrl + "api/v1/addresses/" + userId, {
            headers: headers
        }).then((res) => res.json());
    }

    async getLoggedUserAddresses(): Promise<AddressResponse> {
        const headers = await this.#getHeaders();
        return await fetch(this.#baseUrl + "api/v1/addresses", {
            headers: headers
        }).then((res) => res.json());
    }

    async getAllOrders(): Promise<OrdersResponse> {
        return await fetch(this.#baseUrl + "api/v1/orders").then((res) => res.json());
    }

    async getUserOrders(userId: string): Promise<OrdersResponse> {
        return await fetch(this.#baseUrl + "api/v1/orders/user/" + userId).then((res) => res.json());
    }

async login(email: string, password: string) {
  console.log("➡️ login() called with", email, password);

  return await fetch(this.#baseUrl + "api/v1/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
  }).then(async res => {
    const data = await res.json().catch(() => ({}));
    console.log("⬅️ Login status:", res.status, "Response:", data);
    return { status: res.status, ...data };
  });
}



async signup(name: string, email: string, password: string, rePassword: string, phone: string) {
  return await fetch(this.#baseUrl + "api/v1/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password,
      rePassword,
      phone
    }),
  }).then(res => res.json());
}

async resetPassword(email: string) {
  return await fetch(this.#baseUrl + "api/v1/auth/forgotPasswords", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email }),
  }).then(res => res.json());

}

async verifyPassword(email: string, code: string, newPassword: string) {
  return await fetch(this.#baseUrl + "api/v1/auth/verifyResetCode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, code, newPassword }),
  }).then(res => res.json());

}

async updateUserPassword(currentPassword: string, newPassword: string) {
  const headers = await this.#getHeaders()
  return await fetch(this.#baseUrl + "api/v1/auth/users/changeMyPassword", {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({ currentPassword, newPassword }),
  }).then(res => res.json());
}

async updateUserData(email: string) {
  const headers = await this.#getHeaders()
  return await fetch(this.#baseUrl + "api/v1/auth/users/updateMe", {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({ email }),
  }).then(res => res.json());
}

async verifyToken(token: string) { 
    return await fetch(this.#baseUrl + "api/v1/auth/users/verifyToken", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token }),
    }).then(res => res.json());
}
}

export const apiService = new ApiService()