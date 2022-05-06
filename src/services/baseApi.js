import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://68.183.183.118:4088/api/v1/" }),
  reducerPath: "baseApi",
  endpoints: () => ({}),
});

export default baseApi;
