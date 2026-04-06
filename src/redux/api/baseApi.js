import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://attendance-backend-final-4.onrender.com",

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