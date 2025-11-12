import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./services/baseApi";
import { authSlice } from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    // Add the generated reducer as a specific top-level slice
    [baseApi.reducerPath]: baseApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
