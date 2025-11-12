import { createSlice } from "@reduxjs/toolkit";

const _currentUser = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: _currentUser,
  },

  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
      localStorage.setItem("userInfo", JSON.stringify(payload));
    },
    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;

export const selectLoggedInUser = (state) => state?.auth?.user ?? null;
