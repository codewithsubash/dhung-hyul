import { baseApi } from "./baseApi";

const DASHBOARD_BASE_URL = "/dashboard";

export const dashboardApi = baseApi.injectEndpoints({
  tagTypes: ["Dashboard"],

  endpoints: (builder) => ({
    getDashboardDetail: builder.query({
      query: (params) => ({ url: `${DASHBOARD_BASE_URL}/stat`, params }),
    }),
  }),
});

export const { useGetDashboardDetailQuery, useLazyGetDashboardDetailQuery } =
  dashboardApi;
