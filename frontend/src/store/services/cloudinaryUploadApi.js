import { baseApi } from "./baseApi";

const DO_SPACE_URL = "/cloudinary";

export const cloudinaryUploadApi = baseApi.injectEndpoints({
  tagTypes: ["cloudinary"],
  endpoints: (builder) => ({
    cloudinaryFileUpload: builder.mutation({
      query: ({ file, accountId, filePath }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("accountId", accountId);
        formData.append("filePath", filePath);

        return {
          url: `${DO_SPACE_URL}`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
    }),

    cloudinaryFileDelete: builder.mutation({
      query: (payload) => ({
        url: `${DO_SPACE_URL}`,
        method: "DELETE",
        body: payload,
      }),
    }),
  }),
});

export const {
  useCloudinaryFileUploadMutation,
  useCloudinaryFileDeleteMutation,
} = cloudinaryUploadApi;
