import { baseApi } from "./baseApi";

const LIST_BASE_URL = "/customize-list";

export const listApi = baseApi.injectEndpoints({
  tagTypes: ["List"],
  endpoints: (build) => ({
    addList: build.mutation({
      query(body) {
        return {
          url: `${LIST_BASE_URL}/add`,
          method: "POST",
          body,
        };
      },

      invalidatesTags: (result, err) => [{ type: "List", id: "LIST" }],
    }),

    listList: build.query({
      query: (params) => {
        return {
          url: `${LIST_BASE_URL}`,
          params,
        };
      },
      providesTags: (result) =>
        // is result available?
        result && Array.isArray(result)
          ? // successful query
            [
              ...result.map(({ _id }) => ({ type: "List", id: _id })),
              { type: "List", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: '', id: 'LIST' }` is invalidated
            [{ type: "List", id: "LIST" }],
    }),

    getListDDL: build.query({
      query: (params) => {
        return {
          url: `${LIST_BASE_URL}/ddl`,
          params,
        };
      },
      providesTags: (result) =>
        // is result available?
        result && Array.isArray(result)
          ? // successful query
            [
              ...result.map(({ _id }) => ({ type: "List", id: _id })),
              { type: "List", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: '', id: 'LIST' }` is invalidated
            [{ type: "List", id: "LIST" }],
    }),

    detailList: build.query({
      query: (params) => {
        return {
          url: `${LIST_BASE_URL}/detail/${params.type}`,
          params,
        };
      },
      providesTags: (result, error, id) => [
        { type: "List", id },
        { type: "List", id: "LIST" },
      ],
    }),

    editList: build.mutation({
      query: (params) => {
        return {
          url: `${LIST_BASE_URL}/edit/${params.id}`,
          body: params,
          method: "PUT",
        };
      },
      invalidatesTags: (result, err) => [{ type: "List", id: "LIST" }],
    }),
  }),
});

export const {
  useListListQuery,
  useLazyListListQuery,
  useDetailListQuery,
  useLazyDetailListQuery,
  useAddListMutation,
  useEditListMutation,
  useGetListDDLQuery,
  useLazyGetListDDLQuery,
} = listApi;
