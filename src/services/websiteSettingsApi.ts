import { api } from "./api";
import type { ApiResponse } from "../types/category";
import type { WebsiteSettings } from "../types/websiteSettings";

export const websiteSettingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ==========================================
    // GET WEBSITE SETTINGS
    // ==========================================
    getWebsiteSettings: builder.query<WebsiteSettings, void>({
      query: () => ({
        url: "/WebsiteSettings/GetSettings",
        method: "GET",
      }),

      transformResponse: (response: ApiResponse<WebsiteSettings>) => {
        return response.data;
      },
    }),
  }),

  overrideExisting: false,
});

export const { useGetWebsiteSettingsQuery } = websiteSettingsApi;
