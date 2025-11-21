import React from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";

import { Box, Button, Divider, Grid, TextField } from "@mui/material";

import { toast } from "react-toastify";

import RichTextEditor from "../../../../components/Shared/RichTextEditor";
import FileDropzone from "../../../../components/Shared/FileDropZone";
import { useCloudinaryUploadFile } from "../../../../hooks/useCloudinaryUploadFile";
import BaseAutocomplete from "../../../../components/Shared/Base/BaseAutocomplete";
import BaseSelect from "../../../../components/Shared/Base/BaseSelect";
import BaseTextField from "../../../../components/Shared/Base/BaseTextField";
import { formHookInputHelper } from "../../../../utils/formHookInputHelper";
import { useGetListDDLQuery } from "../../../../store/services/listApi";

// Helper function to get current datetime in local format
const getCurrentDateTime = () => {
  return moment().format("YYYY-MM-DDTHH:mm");
};

// Validation function for future datetime
const validateFutureDateTime = (value) => {
  if (!value) return true;
  const selectedDate = moment(value);
  const now = moment();
  return selectedDate.isAfter(now) || "Date and time must be in the future";
};

const EventForm = ({
  eventDetail = null,
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
    watch,
  } = useForm({
    defaultValues: {
      image: {
        existingFiles: [],
        newFiles: [],
      },
      title: "",
      category: null,

      location: "",
      registrationStartDate: null,
      registrationEndDate: null,
      startDate: null,
      endDate: null,
      overview: "",
      whyThisMatters: "",
      whatToExpect: "",
      accessibilityVenuInfo: "",
      status: "Draft",
    },
  });

  const { data: eventCategories = [], isLoading: isLoadingCategories } =
    useGetListDDLQuery({
      type: "Event Categories",
    });

  const handleOnEventSubmit = async (data) => {
    // Validate date logic
    if (
      data.registrationStartDate &&
      data.registrationEndDate &&
      moment(data.registrationEndDate).isBefore(data.registrationStartDate)
    ) {
      toast.error("Registration end date must be after start date");
      return;
    }

    if (
      data.startDate &&
      data.endDate &&
      moment(data.endDate).isBefore(data.startDate)
    ) {
      toast.error("Event end date must be after start date");
      return;
    }

    let payload = { ...data, category: data?.category?._id };

    // Handle image upload
    if (data.image?.newFiles?.length > 0) {
      try {
        const newUploadedFiles = await handleUploadFiles(
          data?.image?.newFiles,
          {
            folderName: "Events",
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
    if (!eventDetail) return;

    const fileUploadData = {
      existingFiles: eventDetail?.image ? [eventDetail?.image] : [],
      newFiles: [],
    };

    reset({
      ...eventDetail,
      image: fileUploadData,
    });
  }, [eventDetail, reset]);

  return (
    <>
      <Box padding={3}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  required
                  label="Event Title"
                  type="text"
                  size="small"
                  {...field}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Please select a category" }}
              render={(props) => (
                <BaseAutocomplete
                  {...formHookInputHelper(props)}
                  fullWidth
                  required
                  label="Category"
                  onChange={(_, data) => {
                    props?.field?.onChange(data);
                  }}
                  getOptionLabel={(opt) => opt && opt.name}
                  isOptionEqualToValue={(opt, value) => opt._id === value._id}
                  options={eventCategories || []}
                  loading={isLoadingCategories}
                  loadingText="Loading Categories..."
                />
              )}
            />
          </Grid>

          {/* File Upload */}
          <Grid size={{ xs: 12 }}>
            <Box mt={2} mb={2}>
              <h3 style={{ margin: 0, marginBottom: 16 }}>Event Image *</h3>
            </Box>
          </Grid>

          <Grid size={12}>
            <Controller
              name="image"
              control={control}
              rules={{
                validate: (value) =>
                  value?.existingFiles?.length > 0 ||
                  value?.newFiles?.length > 0 ||
                  "Event image is required.",
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

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="registrationStartDate"
              control={control}
              rules={{
                required: "Registration start date is required",
                validate: validateFutureDateTime,
              }}
              render={({ field }) => (
                <TextField
                  required
                  fullWidth
                  label="Registration Start Date"
                  type="datetime-local"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: getCurrentDateTime(),
                  }}
                  value={
                    field.value
                      ? moment(field.value).format("YYYY-MM-DDTHH:mm")
                      : ""
                  }
                  onChange={(e) => {
                    field.onChange(
                      e.target.value ? moment(e.target.value).toDate() : null
                    );
                  }}
                  error={!!errors?.registrationStartDate}
                  helperText={errors?.registrationStartDate?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="registrationEndDate"
              control={control}
              rules={{
                required: "Registration end date is required",
                validate: validateFutureDateTime,
              }}
              render={({ field }) => (
                <TextField
                  required
                  fullWidth
                  label="Registration End Date"
                  type="datetime-local"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: getCurrentDateTime(),
                  }}
                  value={
                    field.value
                      ? moment(field.value).format("YYYY-MM-DDTHH:mm")
                      : ""
                  }
                  onChange={(e) => {
                    field.onChange(
                      e.target.value ? moment(e.target.value).toDate() : null
                    );
                  }}
                  error={!!errors?.registrationEndDate}
                  helperText={errors?.registrationEndDate?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="startDate"
              control={control}
              rules={{
                required: "Event start date is required",
                validate: validateFutureDateTime,
              }}
              render={({ field }) => (
                <TextField
                  required
                  fullWidth
                  label="Event Start Date"
                  type="datetime-local"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: getCurrentDateTime(),
                  }}
                  value={
                    field.value
                      ? moment(field.value).format("YYYY-MM-DDTHH:mm")
                      : ""
                  }
                  onChange={(e) => {
                    field.onChange(
                      e.target.value ? moment(e.target.value).toDate() : null
                    );
                  }}
                  error={!!errors?.startDate}
                  helperText={errors?.startDate?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="endDate"
              control={control}
              rules={{
                required: "Event end date is required",
                validate: validateFutureDateTime,
              }}
              render={({ field }) => (
                <TextField
                  required
                  fullWidth
                  label="Event End Date"
                  type="datetime-local"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: getCurrentDateTime(),
                  }}
                  value={
                    field.value
                      ? moment(field.value).format("YYYY-MM-DDTHH:mm")
                      : ""
                  }
                  onChange={(e) => {
                    field.onChange(
                      e.target.value ? moment(e.target.value).toDate() : null
                    );
                  }}
                  error={!!errors?.endDate}
                  helperText={errors?.endDate?.message}
                />
              )}
            />
          </Grid>

          {/* Content Section */}
          <Grid size={{ xs: 12 }}>
            <Box mt={2} mb={2}>
              <h3 style={{ margin: 0, marginBottom: 16 }}>Event Content</h3>
            </Box>
          </Grid>

          <Grid size={12}>
            <div
              style={{ color: "gray", fontSize: 15, marginBottom: ".75rem" }}
            >
              Overview *
            </div>
            <Controller
              name="overview"
              control={control}
              rules={{ required: "Overview is required" }}
              render={({ field: { onChange } }) => (
                <RichTextEditor
                  initialValue={
                    eventDetail?.overview
                      ? eventDetail.overview
                      : "<p>Enter event overview...</p>"
                  }
                  onChange={onChange}
                  error={!!errors?.overview}
                  helperText={errors?.overview?.message}
                />
              )}
            />
          </Grid>

          <Grid size={12} mt={3}>
            <div
              style={{ color: "gray", fontSize: 15, marginBottom: ".75rem" }}
            >
              Why This Matters
            </div>
            <Controller
              name="whyThisMatters"
              control={control}
              render={({ field: { onChange } }) => (
                <RichTextEditor
                  initialValue={
                    eventDetail?.whyThisMatters
                      ? eventDetail.whyThisMatters
                      : "<p>Explain why this event matters...</p>"
                  }
                  onChange={onChange}
                />
              )}
            />
          </Grid>

          <Grid size={12} mt={3}>
            <div
              style={{ color: "gray", fontSize: 15, marginBottom: ".75rem" }}
            >
              What to Expect
            </div>
            <Controller
              name="whatToExpect"
              control={control}
              render={({ field: { onChange } }) => (
                <RichTextEditor
                  initialValue={
                    eventDetail?.whatToExpect
                      ? eventDetail.whatToExpect
                      : "<p>Describe what attendees can expect...</p>"
                  }
                  onChange={onChange}
                />
              )}
            />
          </Grid>

          <Grid size={12} mt={3}>
            <Controller
              name="accessibilityVenuInfo"
              control={control}
              render={(props) => (
                <BaseTextField
                  {...formHookInputHelper(props)}
                  fullWidth
                  label="Accessibility and Venue Information"
                  multiline
                  rows={4}
                  placeholder="Enter accessibility details and venue information..."
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="location"
              control={control}
              rules={{ required: "Location is required" }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  required
                  label="Location"
                  type="text"
                  size="small"
                  {...field}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="status"
              control={control}
              rules={{ required: "Please select status" }}
              render={(props) => (
                <BaseSelect
                  {...formHookInputHelper(props)}
                  required
                  label="Status"
                  options={["Draft", "Published", "Cancelled", "Completed"]}
                  fullWidth
                />
              )}
            />
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
          onClick={handleSubmit(handleOnEventSubmit)}
        >
          {eventDetail ? "Update Event" : "Create Event"}
        </Button>
      </Box>
    </>
  );
};

export default EventForm;
