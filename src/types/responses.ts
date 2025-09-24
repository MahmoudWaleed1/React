import { Product, Brand, Category, ApiResponse, Subcategory} from '@/interfaces';

export type ProductsResponse = ApiResponse<Product>;
export type BrandsResponse = ApiResponse<Brand>;
export type CategoriesResponse = ApiResponse<Category>;
export type SubCategoriesResponse = ApiResponse<Subcategory>;

// Single item responses
export type SingleBrandResponse = {
  data: Brand;
}

export type SingleCategoryResponse = {
  data: Category;
}

export type SingleSubCategoryResponse = {
  data: Subcategory;
}

export type SingleProductResponse = {
  data: Product;
}

export type AddProductToCartResponse =
  {
    status: string,
    message: string,
    numOfCartItems: number,
    cartId: string,
    data: {
      _id: string,
      cartOwner: string,
      products: {
        count: number,
        _id: string,
        product: string,
        price: number
      }[],
      createdAt: string,
      updatedAt: string,
      totalCartPrice: number
    }
  }
