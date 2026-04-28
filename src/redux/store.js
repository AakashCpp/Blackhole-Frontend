import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import phishReducer from "./slices/phishSlice";
import jobReducer from "./slices/jobSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    phish: phishReducer,
    job: jobReducer,
  },
});

export default store;
