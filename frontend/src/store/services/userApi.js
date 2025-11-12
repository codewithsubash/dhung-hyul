import { baseApi } from "./baseApi";

const USER_BASE_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  tagTypes: ["Admin"],

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body) => ({
        url: `${USER_BASE_URL}/register`,
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export the auto-generated hook
export const { useRegisterUserMutation } = userApi;
