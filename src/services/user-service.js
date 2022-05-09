import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  reducerPath: "userApi",
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "users/me",
        method: "GET",
      }),
    }),
    updateMe: builder.mutation({
      query: (data) => ({
        url: "users/updateMe",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetMeQuery, useLazyGetMeQuery, useUpdateMeMutation } =
  userApi;

export default userApi;
