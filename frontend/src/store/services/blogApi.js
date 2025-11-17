import { baseApi } from "./baseApi";

const BLOG_BASE_URL = "/blogs";

export const blogApi = baseApi.injectEndpoints({
  tagTypes: ["Blog"],

  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (payload) => ({
        url: `${BLOG_BASE_URL}/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: "Blog", id: "LIST" },
      ],
    }),
    getBlogList: builder.query({
      query: (params) => ({ url: `${BLOG_BASE_URL}/list`, params }),
      providesTags: (result) =>
        result
          ? [
              ...result?.data?.map(({ _id }) => ({ type: "Blog", _id })),
              { type: "Blog", id: "LIST" },
            ]
          : [{ type: "Blog", id: "LIST" }],
    }),

    getBlogDetail: builder.query({
      query: (id) => `${BLOG_BASE_URL}/${id}`,
      providesTags: (result, error, id) => [
        { type: "Blog", id },
        { type: "Blog", id: "LIST" },
      ],
    }),
    updateBlog: builder.mutation({
      query: (payload) => {
        const { _id, ...body } = payload;

        return {
          url: `${BLOG_BASE_URL}/${_id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { _id }) => [
        { type: "Blog", _id },
        { type: "Blog", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetBlogListQuery,
  useLazyGetBlogListQuery,
  useGetBlogDetailQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
} = blogApi;
