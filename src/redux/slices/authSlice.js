import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";

const USER_KEY = "auth_user";

// Load user from localStorage (optional persistence)
const loadUser = () => {
  try {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const saveUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

const storedUser = loadUser();

const initialState = {
  user: storedUser,
  isAuthenticated: !!storedUser,
  loading: false,
  error: null,
  message: null,
};

// ✅ REGISTER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

// ✅ VERIFY EMAIL
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/verify-email", { token });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Verification failed",
      );
    }
  },
);

// ✅ LOGIN (cookie handled by backend)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", credentials, {
        withCredentials: true, // 🔥 IMPORTANT
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

// ✅ LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);

// ✅ FORGOT PASSWORD
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/forgot-password", { email });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Request failed");
    }
  },
);

// ✅ RESET PASSWORD
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/reset-password", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Reset failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // VERIFY EMAIL
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.message = action.payload.message;

        saveUser(action.payload.user); // only user stored
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        removeUser();
      })

      // FORGOT PASSWORD
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })

      // RESET PASSWORD
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
      });
  },
});

export const { clearError, clearMessage } = authSlice.actions;
export default authSlice.reducer;
