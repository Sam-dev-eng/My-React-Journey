import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit = 30, skip = 0, category = "" }) => {
        if (category) {
          return `products/category/${category}?limit=${limit}&skip=${skip}`;
        }
        return `products?limit=${limit}&skip=${skip}`;
      },
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    getCategories: builder.query({
      query: () => "products/categories",
    }),
    searchProducts: builder.query({
      query: (searchTerm) => `products/search?q=${searchTerm}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useSearchProductsQuery,
} = productsApi;
