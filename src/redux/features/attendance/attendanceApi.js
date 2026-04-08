import { baseApi } from "../../api/baseApi";

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    markAttendance: builder.mutation({
      query: (body) => ({
        url: "/api/attendanc/mark",
        method: "POST",
        body,
      }),
    }),

  }),
});

export const {
  useMarkAttendanceMutation,
} = attendanceApi;