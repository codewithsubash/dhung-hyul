import { baseApi } from "./baseApi";

const EVENT_REG_BASE_URL = "/event-registration";

export const eventRegistrationApi = baseApi.injectEndpoints({
  tagTypes: ["EventRegistration"],

  endpoints: (builder) => ({
    // CREATE
    createEventRegistration: builder.mutation({
      query: (payload) => ({
        url: `${EVENT_REG_BASE_URL}/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "EventRegistration", id: "LIST" }],
    }),

    // LIST
    getEventRegistrationList: builder.query({
      query: (params) => ({
        url: `${EVENT_REG_BASE_URL}/list`,
        params,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((item) => ({
                type: "EventRegistration",
                id: item._id,
              })),
              { type: "EventRegistration", id: "LIST" },
            ]
          : [{ type: "EventRegistration", id: "LIST" }],
    }),

    // DELETE
    deleteRegisterUser: builder.mutation({
      query: ({ eventId, userId }) => ({
        url: `${EVENT_REG_BASE_URL}/event/${eventId}/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "EventRegistration", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateEventRegistrationMutation,
  useGetEventRegistrationListQuery,
  useLazyGetEventRegistrationListQuery,
  useDeleteRegisterUserMutation,
} = eventRegistrationApi;
