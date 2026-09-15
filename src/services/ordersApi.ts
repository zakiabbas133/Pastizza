import { api } from "./api";

export interface PlaceOrderType {
  id: string;
  orderType: string;
  size: string;
  crust: string;
  sauce: string;
  toppings: string;
  orderQuantity: number;
  totalPrice: number;
}

export interface PlaceOrderResponse {
  success: boolean;
  message: string;
  order: PlaceOrderType;
}

export const ordersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation<PlaceOrderResponse, FormData>({
      query: (formData) => ({
        url: "/CustomOrders/PlaceOrder",
        method: "POST",
        body: formData,
      }),

      transformResponse: (response: PlaceOrderResponse) => {
        return response;
      },

      invalidatesTags: [
        {
          type: "Orders",
          id: "LIST",
        },
      ],
    }),
  }),
});

export const { usePlaceOrderMutation } = ordersApi;
