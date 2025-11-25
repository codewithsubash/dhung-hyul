import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Box, Button, Divider, Grid, TextField } from "@mui/material";

import BreadcrumbLayout from "../../../../components/Shared/BreadCrumb/BreadcrumbLayout";
import { useAuth } from "../../../../hooks/useAuth";
import { useEditProfilePasswordMutation } from "../../../../store/services/userApi";

const ChangePasswordScreen = () => {
  const navigate = useNavigate();

  const { loggedInUser } = useAuth();

  const breadcrumbs = [
    {
      title: "My Profile",
      path: "/app/me",
    },
    { title: "Change Password" },
  ];

  // RTK Query
  const [updatePassword, { isLoading: updatingPassword }] =
    useEditProfilePasswordMutation();

  // react form hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = React.useRef({});
  password.current = watch("password", "");

  // methods
  const handleUpdatePassword = async (data) => {
    try {
      await updatePassword({
        id: loggedInUser?._id,
        previousPassword: data.previousPassword,
        password: data.password,
      }).unwrap();
      toast.success("Password successfully updated!");
      navigate(breadcrumbs[0]?.path);
    } catch (err) {
      toast.error(err?.data?.message ?? "Couldn't update password!");
    }
  };

  return (
    <BreadcrumbLayout breadcrumbs={breadcrumbs} isBusy={updatingPassword}>
      <BreadcrumbLayout.Paper>
        <Box padding={3}>
          <Grid container spacing={5}>
            <Grid item size={6}>
              <TextField
                {...register("previousPassword", {
                  required: "Please provide Current Password.",
                })}
                fullWidth
                label="Current Password"
                placeholder="Enter current password"
                size="small"
                type="password"
                InputLabelProps={{ shrink: true }}
              />
              {!!errors.previousPassword && (
                <p className="error">{errors.previousPassword.message}</p>
              )}
            </Grid>

            <Grid item size={6} />

            <Grid item size={6}>
              <TextField
                {...register("password", {
                  required: "Please provide New Password.",
                })}
                fullWidth
                label="New Password"
                placeholder="Enter new password"
                size="small"
                type="password"
                InputLabelProps={{ shrink: true }}
              />
              {!!errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </Grid>

            <Grid item size={6} />

            <Grid item size={6}>
              <TextField
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password.current || "Password didn't matched.",
                })}
                fullWidth
                label="Confirm Password"
                placeholder="Confirm new password"
                size="small"
                type="password"
                InputLabelProps={{ shrink: true }}
              />
              {!!errors.confirmPassword && (
                <p className="error">{errors.confirmPassword.message}</p>
              )}
            </Grid>
          </Grid>
        </Box>
        <Divider />

        <Box
          paddingX={3}
          gap={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingY: 3,
          }}
        >
          <Button onClick={() => navigate(breadcrumbs[0]?.path)}>Cancel</Button>

          <Button
            variant="contained"
            onClick={handleSubmit(handleUpdatePassword)}
          >
            Change Password
          </Button>
        </Box>
      </BreadcrumbLayout.Paper>
    </BreadcrumbLayout>
  );
};

export default ChangePasswordScreen;
