import React from "react";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { EmailOutlined } from "@mui/icons-material";
import {
  Alert,
  Button,
  FormHelperText,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import SuccessCheck from "../Lottie/SuccessCheck";
import { useForgotPasswordMutation } from "../store/services/userApi";

const INITIAL_STATE = {
  email: "",
};

const ForgotPasswordForm = () => {
  const signInButtonRef = React.useRef();

  // react form hook
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: INITIAL_STATE,
  });

  // RTK Query
  const [forgotPassword, { data, isLoading: sendingLink, error }] =
    useForgotPasswordMutation();

  // methods
  const handleEnterPress = (e) => {
    if (e.key === "Enter")
      signInButtonRef?.current && signInButtonRef?.current?.click();
  };

  const handleSignIn = async (data) => {
    try {
      const res = await forgotPassword(data).unwrap();

      console.log(res);

      reset(INITIAL_STATE);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex h-full w-full flex-col" onKeyDown={handleEnterPress}>
      {!data ? (
        <div className="grid grid-cols-1 gap-8">
          <div>
            <div className="mb-4 text-xl font-medium">Forgot Password?</div>

            <p className="text-gray-500">
              Oops! It happens to the best of us. Please enter your email
              address below, and we'll send you a link to reset your password.
            </p>
          </div>

          <div>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Please provide your email." }}
              render={({ field }) => (
                <TextField
                  {...field}
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
              )}
            />
            {errors.email && (
              <FormHelperText error>{errors.email.message}</FormHelperText>
            )}
          </div>

          <Link to="/sign-in">
            <div className="text-sm text-blue-500">Sign in</div>
          </Link>

          <LoadingButton
            size="large"
            loading={sendingLink}
            loadingIndicator="Sending..."
            variant="contained"
            ref={signInButtonRef}
            onClick={handleSubmit((data) => handleSignIn(data))}
          >
            Send Reset Email
          </LoadingButton>
        </div>
      ) : (
        <>
          <Alert severity="success" className="mb-5">
            {data?.message ?? "Reset Link successfully sent!"}
          </Alert>

          <SuccessCheck />

          <Link to="/reset-password" className="mt-4">
            <Button variant="contained" size="large" className="w-full">
              Reset Password
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
