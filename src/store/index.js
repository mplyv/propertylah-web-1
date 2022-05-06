import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { baseApi } from "../services/baseApi";

import authSlice from "./auth-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,

    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware.apply().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export default store;
