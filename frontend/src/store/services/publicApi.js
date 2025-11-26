import { baseApi } from "./baseApi";

const PUBLIC_BASE_URL = "/public";

export const publicApi = baseApi.injectEndpoints({
  tagTypes: ["Public"],

  endpoints: (builder) => ({
    submitContactForm: builder.mutation({
      query: (body) => ({
        url: `${PUBLIC_BASE_URL}/contact`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Public", id: "LIST" }],
    }),
  }),
});

export const { useSubmitContactFormMutation } = publicApi;
