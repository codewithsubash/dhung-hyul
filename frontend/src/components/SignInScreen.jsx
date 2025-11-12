import React from "react";
import { toast } from "react-toastify";

import SignInForm from "./SignInForm";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../store/services/baseApi";

const SignInScreen = () => {
  const dispatch = useDispatch();
  // RTK Query
  const [loginUser, { isLoading: loggingIn }] = useLoginMutation();

  // methods
  const handleSignIn = async (data) => {
    try {
      const userData = await loginUser(data).unwrap();
      dispatch(setUser(userData));
      reset(INITIAL_STATE);
      toast.success("Login successful!");
    } catch (err) {
      toast.error(err?.data?.message ?? "Something went wrong!");
    }
  };

  return <SignInForm isBusy={loggingIn} onSubmit={handleSignIn} />;
};

export default SignInScreen;
