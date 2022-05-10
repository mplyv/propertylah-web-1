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
    getAllUsers: builder.query({
      query: () => ({
        url: "users",
        method: "GET",
      }),
      keepUnusedDataFor: 5,
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

export const {
  useGetAllUsersQuery,
  useGetMeQuery,
  useLazyGetMeQuery,
  useUpdateMeMutation,
} = userApi;

export default userApi;
