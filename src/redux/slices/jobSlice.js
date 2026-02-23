import { createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";

const initialState = {
  jobs: JSON.parse(localStorage.getItem(JOBS_KEY)) || [],
  activeJob: JSON.parse(localStorage.getItem(ACTIVE_JOB_KEY)) || null,
  loading: false,
  error: null,
  message: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    //
  },
});
