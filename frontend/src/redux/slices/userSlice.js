import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../../services/api"; // Make sure this is defined correctly
import { toast } from "react-hot-toast";
// Register user
export const registerUsers = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData); // Assuming registerUser returns a promise
      return response; // return the response to the fulfilled state
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Login user
export const loginUsers = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      localStorage.setItem("token", data.token);
      
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      toast.success("logging out...");
      localStorage.removeItem("cart"); // Clear user data from storage
      localStorage.removeItem("userInfo"); // Clear user data from storage
      localStorage.removeItem("token"); // Clear user data from storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUsers.pending, (state) => {
        // Updated to registerUsers
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        console.log("state.userifno",state.userInfo);
        
      })
      .addCase(loginUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
