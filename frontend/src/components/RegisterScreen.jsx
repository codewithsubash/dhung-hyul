import React from "react";
import { toast } from "react-toastify";

import RegisterForm from "./RegisterForm";
import { useRegisterUserMutation } from "../store/services/userApi";

const RegisterScreen = () => {
  // RTK Query
  const [registerUser, { isLoading: loadingUser }] = useRegisterUserMutation();
  // methods
  const handleRegister = (data) => {
    registerUser(data)
      .unwrap()
      .then(() => {
        toast.success("Registration successful! ");
      })
      .catch((err) => {
        toast.error(err?.data?.message || "Couldn't register user");
      });
  };

  return <RegisterForm isBusy={loadingUser} onSubmit={handleRegister} />;
};

export default RegisterScreen;
