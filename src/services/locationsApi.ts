import type { ApiResponse } from "../types/category";
import type { Location } from "../types";
import { api } from "./api";

export const locationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query<Location[], void>({
      query: () => ({
        url: "/Locations/ListLocations",
        method: "GET",
      }),

      transformResponse: (response: ApiResponse<Location[]>) => {
        return response.data;
      },
    }),
  }),

  overrideExisting: false,
});

export const { useGetLocationsQuery } = locationsApi;
