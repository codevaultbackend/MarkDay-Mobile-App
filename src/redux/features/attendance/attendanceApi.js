import { baseApi } from "../../api/baseApi";

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    markAttendance: builder.mutation({
      query: (body) => ({
        url: "/api/attendanc/mark",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, body) => [
        { type: "My-Attendance", id: body.empId },
        { type: "My-Leaves", id: body.empId }
      ]
    }),

    // ✅ Get All Attendance (Calendar Screen)
    // getAttendance: builder.query({
    //   query: (empId) => ({
    //     url: `/api/admin/attendances?empId=${empId}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["My-Attendance"],
    // }),

    getAttendance: builder.query({
      query: (empId) => ({
        url: `/api/admin/attendances?empId=${empId}`,
        method: "GET",
      }),
      providesTags: (result, error, empId) => [
        { type: "My-Attendance", id: empId }
      ],
    }),
    getLeaves: builder.query({
      query: (empId) => `/api/leave/my/${empId}`,
      providesTags: (result, error, empId) => [
        { type: "My-Leaves", id: empId }
      ],
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
      invalidatesTags: (result, error, body) => [
        { type: "My-Attendance", id: body.empId },
        { type: "My-Leaves", id: body.empId }
      ]
    }),

  }),
});

export const {
  useMarkAttendanceMutation,
  useGetAttendanceQuery,   // ← ye add hoga
  useGetLeavesQuery,
  useGetHolidaysQuery,
  useApplyLeaveMutation
} = attendanceApi;