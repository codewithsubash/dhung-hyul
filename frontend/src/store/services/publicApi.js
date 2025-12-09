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

    getPublicBlogList: builder.query({
      query: (params) => ({ url: `${PUBLIC_BASE_URL}/blog-list`, params }),
      providesTags: (result) => result[{ type: "Blog", id: "LIST" }],
    }),

    getPublicBlogDetail: builder.query({
      query: (slug) => `${PUBLIC_BASE_URL}/blog/${slug}`,
      providesTags: (result, error, id) => [{ type: "Blog", id: "LIST" }],
    }),
    getPublicEventList: builder.query({
      query: (params) => ({ url: `${PUBLIC_BASE_URL}/event-list`, params }),
      providesTags: (result) => [{ type: "Event", id: "LIST" }],
    }),

    getPublicEventDetail: builder.query({
      query: (slug) => `${PUBLIC_BASE_URL}/event/${slug}`,
      providesTags: (result, error, id) => [{ type: "Event", id: "LIST" }],
    }),

    createEventRegistrationAndUser: builder.mutation({
      query: (payload) => ({
        url: `${PUBLIC_BASE_URL}/create/event-registration`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "EventRegistration", id: "LIST" }],
    }),
  }),
});

export const {
  useSubmitContactFormMutation,
  useGetPublicBlogListQuery,
  useLazyGetPublicBlogListQuery,
  useGetPublicBlogDetailQuery,
  useGetPublicEventListQuery,
  useGetPublicEventDetailQuery,
  useLazyGetPublicEventListQuery,
  useCreateEventRegistrationAndUserMutation,
} = publicApi;
