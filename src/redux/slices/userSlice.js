import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";

// ================= THUNKS =================

// GET PROFILE
export const fetchProfile = createAsyncThunk(
  "users/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/users/me");
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load profile",
      );
    }
  },
);

// UPDATE PROFILE
export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/users/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  },
);

// GET STATS
export const fetchStats = createAsyncThunk(
  "users/stats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/users/stats");
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Stats fetch failed",
      );
    }
  },
);

// ================= INITIAL STATE =================
const initialState = {
  profile: null,
  stats: null,
  loading: false,
  error: null,
  success: false,
};

// ================= SLICE =================
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH PROFILE
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE PROFILE
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH STATS
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = userSlice.actions;
export default userSlice.reducer;
