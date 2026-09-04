import type { ApiResponse } from "../types/category";
import { api } from "./api";

export interface MenuItemVariant {
  id: string;
  name: string;
  price: number;
  displayOrder: number;
  isActive: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  featured: boolean;
  price: number;
  popular: boolean;
  isActive: boolean;
  displayOrder: number;
  categoryId: string;
  categoryName: string;
  variants: MenuItemVariant[];
}

/*
 * Request used when creating a menu item.
 *
 * The backend uses the same MenuItemDto for all CRUD operations.
 * We do not need categoryName when creating the item.
 */
export interface CreateMenuItemRequest {
  id?: string;
  name: string;
  slug: string;
  description: string;
  imageFile?: File | null;
  featured: boolean;
  popular: boolean;
  isActive: boolean;
  displayOrder: number;
  categoryId: string;
  categoryName?: string;
  variants: {
    id?: string;
    name: string;
    price: number;
    displayOrder: number;
    isActive: boolean;
  }[];
}

export interface UpdateMenuItemRequest extends CreateMenuItemRequest {
  id: string;
}

export const menuApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================================
    // GET ALL MENU ITEMS
    // GET /Menu
    // ============================================================

    getMenuItems: builder.query<MenuItem[], void>({
      query: () => ({
        url: "/Menu/GetMenuItems",
        method: "GET",
      }),

      transformResponse: (response: ApiResponse<MenuItem[]>) => {
        return response.data;
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({
                type: "MenuItem" as const,
                id: item.id,
              })),

              {
                type: "MenuItem" as const,
                id: "LIST",
              },
            ]
          : [
              {
                type: "MenuItem" as const,
                id: "LIST",
              },
            ],
    }),

    // ============================================================
    // GET MENU ITEM BY ID
    // GET /Menu/{id}
    // ============================================================

    getMenuItemById: builder.query<MenuItem, string>({
      query: (id) => ({
        url: `/Menu/GetMenuItem/${id}`,
        method: "GET",
      }),

      transformResponse: (response: ApiResponse<MenuItem>) => {
        return response.data;
      },

      providesTags: (_result, _error, id) => [
        {
          type: "MenuItem",
          id,
        },
      ],
    }),
  }),

  overrideExisting: false,
});

export const { useGetMenuItemsQuery, useGetMenuItemByIdQuery } = menuApi;
