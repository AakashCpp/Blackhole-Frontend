import { createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";

const initialState = {
  user: JSON.parse(localStorage.getItem(USER_KEY)) || null,
  token: localStorage.getItem(TOKEN_KEY) || null,
  isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
  loading: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register : (state, action) = {},
    verify : (state, action) = {},
    login : (state, action) = {},
    logout : (state, action) = {},
    forgetPassword : (state, action) = {},
    resetPassword : (state, action) = {},
  },
});