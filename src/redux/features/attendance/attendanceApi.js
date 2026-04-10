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

    // ✅ Get All Attendance (Calendar Screen)
    getAttendance: builder.query({
      query: (empId) => ({
        url: `/api/admin/attendances?empId=${empId}`,
        method: "GET",
      }),
      providesTags: ["Attendance"],
    }),
    getLeaves: builder.query({
      query: (empId) => `/api/leave/my/${empId}`
    }),

    getHolidays: builder.query({
      query: () => `/api/holidays/get`
    }),

  }),
});

export const {
  useMarkAttendanceMutation,
  useGetAttendanceQuery,   // ← ye add hoga
  useGetLeavesQuery,
  useGetHolidaysQuery
} = attendanceApi;