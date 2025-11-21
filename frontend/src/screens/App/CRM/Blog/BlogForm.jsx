import React from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";

import { toast } from "react-toastify";

import RichTextEditor from "../../../../components/Shared/RichTextEditor";
import FileDropzone from "../../../../components/Shared/FileDropZone";
import { useCloudinaryUploadFile } from "../../../../hooks/useCloudinaryUploadFile";
import BaseAutocomplete from "../../../../components/Shared/Base/BaseAutocomplete";
import { formHookInputHelper } from "../../../../utils/formHookInputHelper";
import { useGetListDDLQuery } from "../../../../store/services/listApi";

const BlogForm = ({
  blogDetail = null,
  isBusy = false,
  onSubmit = () => {},
}) => {
  const navigate = useNavigate();
  const { handleUploadFiles } = useCloudinaryUploadFile();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      image: {
        existingFiles: [],
        newFiles: [],
      },
      title: "",
      author: "",
      content: "",
      tags: "",
      slug: "",
      isFeatured: false,
      isActive: true,
    },
  });

  const { data: blogCategories = [], isLoading: isLoadingCategories } =
    useGetListDDLQuery({
      type: "Blog Categories",
    });

  const handleOnBlogSubmit = async (data) => {
    let payload = { ...data, category: data?.category?._id };

    if (data.image?.newFiles?.length > 0) {
      try {
        const newUploadedFiles = await handleUploadFiles(
          data?.image?.newFiles,
          {
            folderName: "Blogs",
          }
        );

        payload.image = newUploadedFiles.uploadedFiles[0];
      } catch (error) {
        return toast.error(error.message);
      }
    } else {
      delete payload.image;
    }

    onSubmit(payload);
  };

  React.useEffect(() => {
    if (!blogDetail) return;

    const fileUploadData = {
      existingFiles: blogDetail?.image ? [blogDetail?.image] : [],
      newFiles: [],
    };

    reset({
      ...blogDetail,
      image: fileUploadData,
    });
  }, [blogDetail, reset]);

  return (
    <>
      <Box padding={3}>
        <Grid container spacing={2}>
          {/* Main Content Area */}
          <Grid size={{ xs: 12 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Title"
                      type="text"
                      size="small"
                      {...field}
                      error={!!errors.title}
                    />
                  )}
                />
                {errors.title && (
                  <p className="error">{errors.title.message}</p>
                )}
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="author"
                  control={control}
                  rules={{ required: "Author is required" }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Author"
                      type="text"
                      size="small"
                      {...field}
                      error={!!errors.author}
                    />
                  )}
                />
                {errors.author && (
                  <p className="error">{errors.author.message}</p>
                )}
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="tags"
                  control={control}
                  rules={{ required: "Tag is required" }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Tags"
                      type="text"
                      size="small"
                      {...field}
                      error={!!errors.tags}
                    />
                  )}
                />
                {errors.tags && <p className="error">{errors.tags.message}</p>}
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Please select an Category." }}
                  render={(props) => (
                    <BaseAutocomplete
                      {...formHookInputHelper(props)}
                      fullWidth
                      label="Category"
                      onChange={(_, data) => {
                        props?.field?.onChange(data);
                      }}
                      getOptionLabel={(opt) => opt && opt.name}
                      isOptionEqualToValue={(opt, value) =>
                        opt._id === value._id
                      }
                      options={blogCategories || []}
                      loading={isLoadingCategories}
                      loadingText="Loading Category..."
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={field.value}
                          {...field}
                          color="primary"
                        />
                      }
                      label="Is Active?"
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="isFeatured"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={field.value}
                          {...field}
                          color="primary"
                        />
                      }
                      label="Is Featured?"
                    />
                  )}
                />
              </Grid>
            </Grid>

            {/* Rich Text Editor */}
            <Grid size={12} mt={3}>
              <div
                style={{ color: "gray", fontSize: 15, marginBottom: ".75rem" }}
              >
                Content
              </div>
              <Controller
                name="content"
                control={control}
                rules={{ required: "Content is required" }}
                render={({ field: { onChange } }) => (
                  <RichTextEditor
                    initialValue={
                      blogDetail?.content
                        ? blogDetail.content
                        : "<p>Enter Blog Content.</p>"
                    }
                    onChange={onChange}
                    error={!!errors?.content}
                    helperText={errors?.content?.message}
                  />
                )}
              />
            </Grid>

            {/* File Upload */}
            <Grid size={12} mt={3}>
              <Controller
                name="image"
                control={control}
                rules={{
                  validate: (value) =>
                    value?.existingFiles?.length > 0 ||
                    value?.newFiles?.length > 0 ||
                    "File is required.",
                }}
                render={({ field }) => (
                  <FileDropzone
                    files={field.value}
                    onFileChange={(files) => {
                      field.onChange(files);
                      trigger("image");
                    }}
                    error={!!errors.image}
                    helperText={errors.image?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          {/* Optional Sidebar (you can expand later) */}
          <Grid size={{ xs: 12, md: 4 }}>
            {/* You can add sidebar widgets here later */}
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Box
        paddingX={3}
        paddingY={2}
        gap={2}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button disabled={isBusy} onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={isBusy}
          onClick={handleSubmit(handleOnBlogSubmit)}
        >
          {blogDetail ? "Update" : "Add"}
        </Button>
      </Box>
    </>
  );
};

export default BlogForm;
