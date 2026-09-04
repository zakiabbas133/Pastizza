import type { Deal } from "../types";
import type { ApiResponse } from "../types/category";
import { api } from "./api";

export const dealsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================================
    // GET ALL DEALS
    // ============================================================

    getDeals: builder.query<ApiResponse<Deal[]>, void>({
      query: () => ({
        url: "/Deal/ListDeals",
        method: "GET",
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.data.map((deal: Deal) => ({
                type: "Deals" as const,
                id: deal.id,
              })),
              {
                type: "Deals" as const,
                id: "LIST",
              },
            ]
          : [
              {
                type: "Deals" as const,
                id: "LIST",
              },
            ],
    }),

    // ============================================================
    // GET DEAL BY ID
    // ============================================================

    getDealById: builder.query<ApiResponse<Deal>, string>({
      query: (id) => ({
        url: `/Deal/DealDetails/${id}`,
        method: "GET",
      }),

      providesTags: (_result, _error, id) => [
        {
          type: "Deals",
          id,
        },
      ],
    }),
  }),

  overrideExisting: false,
});

export const { useGetDealsQuery, useGetDealByIdQuery } = dealsApi;
