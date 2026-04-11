import { baseApi } from "../../api/baseApi";

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    markAttendance: builder.mutation({
      query: (body) => ({
        url: "/api/attendanc/mark",
        method: "POST",
        body,
        invalidatesTags: ["My-Attendance", "My-Leaves"]
      }),
    }),

    // ✅ Get All Attendance (Calendar Screen)
    getAttendance: builder.query({
      query: (empId) => ({
        url: `/api/admin/attendances?empId=${empId}`,
        method: "GET",
      }),
      providesTags: ["My-Attendance"],
    }),
    getLeaves: builder.query({
      query: (empId) => `/api/leave/my/${empId}`,
      providesTags: ["My-Leaves"],
    }),

    getHolidays: builder.query({
      query: () => `/api/holidays/get`
    }),

    applyLeave: builder.mutation({
      query: (body) => ({
        url: "/api/leave/apply",
        method: "POST",
        body
      }),
      invalidatesTags: ["My-Attendance", "My-Leaves"]
    }),

  }),
});

export const {
  useMarkAttendanceMutation,
  useGetAttendanceQuery,   // ← ye add hoga
  useGetLeavesQuery,
  useGetHolidaysQuery ,
  useApplyLeaveMutation
} = attendanceApi;