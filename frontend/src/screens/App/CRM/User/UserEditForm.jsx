import React from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import LoadingWrapper from "../../../../components/Shared/Loading/LoadingWrapper";

const INITIAL_STATE = { name: "", email: "", phone: "" };

const UserEditForm = ({
  userDetail = null,
  onSubmit = () => {},
  isBusy = false,
}) => {
  const navigate = useNavigate();

  // react form hook
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { ...INITIAL_STATE },
  });

  React.useEffect(() => {
    if (!userDetail) return;

    reset({
      name: userDetail?.name,
      email: userDetail?.email,
      phone: userDetail?.phone,
    });

    return () => {
      reset({ ...INITIAL_STATE });
    };
  }, [userDetail, reset]);

  return (
    <LoadingWrapper loading={isBusy}>
      <Box padding={3}>
        <Grid container spacing={4}>
          <Grid item size={4}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  placeholder="Enter name"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </Grid>

          <Grid item size={4}>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              disabled
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  placeholder="Enter email"
                  size="small"
                  type="email"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </Grid>

          <Grid item size={4}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Phone"
                  placeholder="Enter Contact Number"
                  size="small"
                  type="tel"
                  InputLabelProps={{ shrink: true }}
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
        style={{
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
          onClick={handleSubmit((data) => onSubmit(data))}
        >
          Update
        </Button>
      </Box>
    </LoadingWrapper>
  );
};

export default UserEditForm;
