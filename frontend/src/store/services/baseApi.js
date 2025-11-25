// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  tagTypes: ["User", "Admin", "cloudinary", "Blog", "Event"],

  reducerPath: "baseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api",

    prepareHeaders: (headers, { getState }) => {
      const user = getState().auth.user;

      if (user) headers.set("authorization", [`Bearer ${user.token}`]);

      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = baseApi;
