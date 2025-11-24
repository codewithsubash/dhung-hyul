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

    getUserDetail: builder.query({
      query: (id) => `${USER_BASE_URL}/detail`,
      providesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    editUserProfile: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `${USER_BASE_URL}/change-profile/${id}`,
          method: "PUT",
          body,
        };
      },
      // Invalidates all queries that subscribe to this User `id` only.
      // In this case, `detailUser` will be re-run. `listUser` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    editProfilePassword: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `${USER_BASE_URL}/change-profile-password/${id}`,
          method: "PUT",
          body,
        };
      },
      // Invalidates all queries that subscribe to this User `id` only.
      // In this case, `detailUser` will be re-run. `listUser` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    addUser: builder.mutation({
      query(body) {
        return {
          url: `${USER_BASE_URL}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    getUserList: builder.query({
      query: (params) => ({ url: `${USER_BASE_URL}/list`, params }),
      providesTags: (result) =>
        result
          ? [
              ...result?.data?.map(({ _id }) => ({ type: "User", _id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (payload) => {
        const { _id, ...body } = payload;

        return {
          url: `${USER_BASE_URL}/${_id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { _id }) => [
        { type: "User", _id },
        { type: "User", id: "LIST" },
      ],
    }),
    getSpecificUserDetail: builder.query({
      query: (id) => `${USER_BASE_URL}/${id}`,
      providesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),
  }),
});

// Export the auto-generated hook
export const {
  useRegisterUserMutation,
  useGetUserDetailQuery,
  useGetSpecificUserDetailQuery,
  useEditUserProfileMutation,
  useEditProfilePasswordMutation,
  useAddUserMutation,
  useGetUserListQuery,
  useLazyGetUserListQuery,
  useUpdateUserMutation,
} = userApi;
