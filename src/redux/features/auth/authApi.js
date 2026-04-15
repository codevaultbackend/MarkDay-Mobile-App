import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
    }),

    register: builder.mutation({
      query: (body) => ({
        url: "register",
        method: "POST",
        body,
      }),
    }),



    getProfile: builder.query({
      query: (empId) => ({
        url: `/profile/emp/${empId}`,
        method: "GET",
      }),
      providesTags: ["My-Profile"],
    }),

  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery
} = authApi;