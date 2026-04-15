  import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  export const baseApi = createApi({
    reducerPath: "baseApi",

    baseQuery: fetchBaseQuery({
  //   baseUrl: "https://attendance-backend-final-4.onrender.com",
     baseUrl: "https://9d90-2401-4900-8840-6edd-8917-d7c2-4428-b712.ngrok-free.app",

      prepareHeaders: (headers, { getState }) => {
        return headers;
      },
    }),

    // ✅ Correct place
    tagTypes: [
      "My-Attendance",
      "My-Leaves",
      "Holidays",
      "My-Profile"
    ],

    endpoints: () => ({}),
  });