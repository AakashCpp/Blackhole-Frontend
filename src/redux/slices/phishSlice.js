import { createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";

const initialState = {
  results: [{}],
  loading: false,
  error: null,
  message: null,
};

const phishingSlice = createSlice({
  name: "phish",
  initialState,
  reducers: {
    detect: (state, action) => {},
    fetchAllResults: (state, action) => {},
  },
});

export const { detect, fetchAllResults } = phishingSlice.actions;
export default phishingSlice.reducer;
