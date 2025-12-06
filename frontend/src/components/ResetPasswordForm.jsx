import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Code, EmailOutlined, LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  FormHelperText,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import SuccessCheck from "../Lottie/SuccessCheck";
import { useResetPasswordMutation } from "../store/services/userApi";

const INITIAL_STATE = {
  email: "",
  password: "",
  confirmPassword: "",
  otp: "",
};

const ResetPasswordForm = () => {
  const signInButtonRef = React.useRef();

  const [searchParams] = useSearchParams();

  // react form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: INITIAL_STATE,
  });

  const password = React.useRef({});
  password.current = watch("password", "");

  // RTK Query
  const [resetPassword, { data, isLoading: sendingLink, error }] =
    useResetPasswordMutation();

  // methods
  const handleEnterPress = (e) => {
    if (e.key === "Enter")
      signInButtonRef?.current && signInButtonRef?.current?.click();
  };

  const handleResetPassword = async (data) => {
    try {
      await resetPassword(data).unwrap();

      reset(INITIAL_STATE);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (!searchParams) return;

    reset({
      ...INITIAL_STATE,
      email: searchParams.get("email"),
      otp: searchParams.get("otp"),
    });
  }, [reset, searchParams]);

  return (
    <div className="flex h-full w-full flex-col" onKeyDown={handleEnterPress}>
      {!data ? (
        <div className="grid grid-cols-1 gap-8">
          <div>
            <div className="mb-4 text-xl font-medium">Reset Password</div>

            <p className="text-gray-500">
              Provide the following information to reset your password.
            </p>
          </div>

          <div>
            <TextField
              {...register("email", {
                required: "Please provide email.",
              })}
              fullWidth
              label="Email"
              placeholder="Enter email that you sign in with"
              size="small"
              type="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined />
                  </InputAdornment>
                ),
              }}
            />
            {errors.email && (
              <FormHelperText error>{errors.email.message}</FormHelperText>
            )}
          </div>

          <div>
            <TextField
              {...register("password", {
                required: "Provide a password.",
              })}
              fullWidth
              label="New Password"
              placeholder="Enter new password"
              size="small"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && (
              <FormHelperText error>{errors.password.message}</FormHelperText>
            )}
          </div>

          <div>
            <TextField
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
              fullWidth
              label="Confirm Password"
              placeholder="Confirm new password"
              size="small"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),
              }}
            />
            {errors.confirmPassword && (
              <FormHelperText error>
                {errors.confirmPassword.message}
              </FormHelperText>
            )}
          </div>

          <div>
            <TextField
              {...register("otp", {
                required: "Please provide OTP.",
              })}
              fullWidth
              label="OTP"
              placeholder="Enter OTP"
              size="large"
              type="email"
              color="success"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Code />
                  </InputAdornment>
                ),
              }}
            />
            {errors.otp && (
              <FormHelperText error>{errors.otp.message}</FormHelperText>
            )}
          </div>

          <LoadingButton
            size="large"
            loading={sendingLink}
            loadingIndicator="Sending..."
            variant="contained"
            ref={signInButtonRef}
            onClick={handleSubmit((data) => handleResetPassword(data))}
          >
            Reset Password
          </LoadingButton>
        </div>
      ) : (
        <>
          <Alert severity="success" className="mb-5">
            {data?.message ?? "Reset Link successfully sent!"}
          </Alert>

          <SuccessCheck />

          <Link to="/sign-in" className="mt-4">
            <Button variant="contained" size="large" className="w-full">
              Sign In
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default ResetPasswordForm;
