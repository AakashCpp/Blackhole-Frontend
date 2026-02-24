import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import jobReducer from "./slices/jobSlice";
import phishingReducer from "./slices/phishSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    phish: phishingReducer,
  },
});

export default store;
