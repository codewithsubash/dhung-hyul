import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const SignInForm = ({ loggingIn, onSubmit = () => {} }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const signInButtonRef = React.useRef();

  // RTK Query

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: INITIAL_STATE,
  });

  const handleSignIn = async (data) => {
    onSubmit(data);
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Modal-like form */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur-md">
        <a href="/">
          <h2 className="mb-6 text-center text-xl font-medium text-gray-800">
            Dhung Hyul
          </h2>
        </a>
        <h2 className="text-2xl font-semibold text-center mb-6">Log in</h2>

        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-6">
          {/* Email field */}
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Email className="text-gray-400" size={20} />
                </div>
                <input
                  {...field}
                  type="email"
                  placeholder="hello@hatypo.studio"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-700 focus:border-blue-400 focus:outline-none"
                />
              </div>
            )}
          />
          {errors.email && (
            <p className="pl-2 text-sm text-red-500">{errors.email.message}</p>
          )}

          {/* Password field */}
          <Controller
            name="password"
            control={control}
            rules={{ required: "Provide a password" }}
            render={({ field }) => (
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock className="text-gray-400" size={20} />
                </div>
                <input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-gray-700 focus:border-blue-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4"
                >
                  {showPassword ? (
                    <VisibilityOff className="text-gray-400" size={20} />
                  ) : (
                    <Visibility className="text-gray-400" size={20} />
                  )}
                </button>
              </div>
            )}
          />
          {errors.password && (
            <p className="pl-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Forgot password?
            </Link>
          </div>

          <LoadingButton
            size="large"
            loading={loggingIn}
            loadingIndicator="Signing in..."
            variant="contained"
            fullWidth
            color="primary"
            type="submit"
            ref={signInButtonRef}
            className="h-12"
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "16px",
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Sign In
          </LoadingButton>

          <p className="text-center text-sm mt-5 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
