  import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  export const baseApi = createApi({
    reducerPath: "baseApi",

    baseQuery: fetchBaseQuery({
     baseUrl: "https://attendance-backend-final-4.onrender.com",
     // baseUrl: "https://64a8-2401-4900-8842-2f04-51f6-d0d-e5fc-102c.ngrok-free.app",

      prepareHeaders: (headers, { getState }) => {
        return headers;
      },
    }),

    // ✅ Correct place
    tagTypes: [
      "My-Attendance",
      "My-Leaves",
      "Holidays"
    ],

    endpoints: () => ({}),
  });