import { baseApi } from "./baseApi";

const BLOG_BASE_URL = "/events";

export const eventApi = baseApi.injectEndpoints({
  tagTypes: ["Event"],

  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (payload) => ({
        url: `${BLOG_BASE_URL}/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: "Event", id: "LIST" },
      ],
    }),
    getEventList: builder.query({
      query: (params) => ({ url: `${BLOG_BASE_URL}/list`, params }),
      providesTags: (result) =>
        result
          ? [
              ...result?.data?.map(({ _id }) => ({ type: "Event", _id })),
              { type: "Event", id: "LIST" },
            ]
          : [{ type: "Event", id: "LIST" }],
    }),

    getEventDetail: builder.query({
      query: (id) => `${BLOG_BASE_URL}/${id}`,
      providesTags: (result, error, id) => [
        { type: "Event", id },
        { type: "Event", id: "LIST" },
      ],
    }),
    updateEvent: builder.mutation({
      query: (payload) => {
        const { _id, ...body } = payload;

        return {
          url: `${BLOG_BASE_URL}/${_id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { _id }) => [
        { type: "Event", _id },
        { type: "Event", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetEventListQuery,
  useLazyGetEventListQuery,
  useGetEventDetailQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
} = eventApi;
