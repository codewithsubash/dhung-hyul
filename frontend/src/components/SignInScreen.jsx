import React from "react";
import { toast } from "react-toastify";

import SignInForm from "./SignInForm";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../store/services/baseApi";
import { setUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import Header from "../screens/Header";
import Footer from "../screens/Footer";

const SignInScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // RTK Query
  const [loginUser, { isLoading: loggingIn }] = useLoginMutation();

  // methods
  const handleSignIn = async (data) => {
    try {
      const userData = await loginUser(data).unwrap();
      dispatch(setUser(userData));
      navigate("/app");
      toast.success("Login successful!");
    } catch (err) {
      toast.error(err?.data?.message ?? "Something went wrong!");
    }
  };

  return (
    <>
      <Header />
      <SignInForm isBusy={loggingIn} onSubmit={handleSignIn} />
      <Footer />
    </>
  );
};

export default SignInScreen;
