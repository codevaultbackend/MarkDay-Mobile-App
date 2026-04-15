  import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  export const baseApi = createApi({
    reducerPath: "baseApi",

    baseQuery: fetchBaseQuery({
  //   baseUrl: "https://attendance-backend-final-4.onrender.com",
     baseUrl: "https://e8e3-2401-4900-8842-2f04-c88f-b84e-890d-7509.ngrok-free.app",

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