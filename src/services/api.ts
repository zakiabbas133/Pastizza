import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

export const baseUrl = import.meta.env.VITE_BASE_URL ?? "";

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers: Headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithoutAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  return rawBaseQuery(args, api, extraOptions);
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithoutAuth,
  tagTypes: [
    "Category",
    "MenuItem",
    "Deals",
    "Location",
    "Review",
    "Categories",
    "WebsiteSettings",
  ],
  endpoints: () => ({}),
});
