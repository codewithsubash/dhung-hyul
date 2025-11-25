import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BaseTextField from "./Shared/Base/BaseTextField";
import { LoadingButton } from "./Shared/LoadingButton";
import { Link } from "react-router-dom";

const INITIAL_STATE = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const RegisterForm = ({ onSubmit = () => {}, loadingUser }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: INITIAL_STATE,
  });

  // RTK Query mutation

  const handleRegister = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    onSubmit(data);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?technology,abstract')",
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <a href="/">
          <h2 className="mb-6 text-center text-xl font-medium text-gray-800">
            Dhung Hyul
          </h2>
        </a>
        <h2 className="text-2xl font-semibold text-center mb-6">
          Register a new account
        </h2>

        <div className="flex flex-col gap-4">
          {/* Name */}
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <BaseTextField
                {...field}
                fullWidth
                label="Full Name"
                placeholder="Enter your full name"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <BaseTextField
                {...field}
                fullWidth
                label="Email Address"
                placeholder="Enter your email"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          {/* Phone */}
          <Controller
            name="phone"
            control={control}
            rules={{ required: "Phone is required" }}
            render={({ field }) => (
              <BaseTextField
                {...field}
                fullWidth
                label="Phone Number"
                placeholder="Enter your phone number"
                type="number"
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <BaseTextField
                {...field}
                fullWidth
                label="Password"
                placeholder="Enter your password"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={control}
            rules={{ required: "Please confirm your password" }}
            render={({ field }) => (
              <BaseTextField
                {...field}
                fullWidth
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            )}
          />

          {/* Submit Button */}
          <LoadingButton
            fullWidth
            variant="contained"
            size="large"
            loading={loadingUser}
            onClick={handleSubmit(handleRegister)}
            loadingText="Registering..."
          >
            Register
          </LoadingButton>
          <div className="text-center">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-700 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
