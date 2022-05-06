import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  reducerPath: "authApi",
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "users/signup",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useSignupMutation } = authApi;

export default authApi;
