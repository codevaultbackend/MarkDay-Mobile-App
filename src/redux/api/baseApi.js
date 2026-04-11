import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ff9e-2401-4900-8843-9201-a9e4-ceb0-e31d-e5b1.ngrok-free.app",

    prepareHeaders: (headers, { getState }) => {
      // const token = getState()?.auth?.token;

      // if (token) {
      //   headers.set("authorization", `Bearer ${token}`);
      // }

      return headers;
    },
  }),

  endpoints: () => ({}),
});