import { createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";

const initialState = {
  jobs: [{}],
  loading: false,
  error: null,
  message: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    createJob: (state, action) => {},
    fetchJobsOfUser: (state, action) => {},
    fetchJobById: (state, action) => {},
    fetchPublicJobs: (state, action) => {},
  },
});

export const { createJob, fetchJobsOfUser, fetchJobById, fetchPublicJobs } =
  jobSlice.actions;

export default jobSlice.reducer;
