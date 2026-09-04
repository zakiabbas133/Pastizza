import { api } from "./api";
import type { Category, ApiResponse } from "../types/category";

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ==========================================
    // GET ALL CATEGORIES
    // ==========================================
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/Categories/List",
        method: "GET",
      }),

      transformResponse: (response: ApiResponse<Category[]>) => {
        return response.data;
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map((category) => ({
                type: "Categories" as const,
                id: category.id,
              })),

              {
                type: "Categories" as const,
                id: "LIST",
              },
            ]
          : [
              {
                type: "Categories" as const,
                id: "LIST",
              },
            ],
    }),

    // ==========================================
    // GET CATEGORY DETAILS
    // ==========================================
    getCategoryDetails: builder.query<Category, string>({
      query: (id) => ({
        url: `/Categories/Details?id=${id}`,
        method: "GET",
      }),

      transformResponse: (response: ApiResponse<Category>) => {
        return response.data;
      },

      providesTags: (_result, _error, id) => [
        {
          type: "Categories",
          id,
        },
      ],
    }),
  }),

  overrideExisting: false,
});

export const { useGetCategoriesQuery, useGetCategoryDetailsQuery } =
  categoriesApi;
