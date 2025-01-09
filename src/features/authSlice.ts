import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const API_END_POINT = `${import.meta.env.VITE_API_URL}/auth`;
axios.defaults.withCredentials = true;

interface IUser {
  _id: string;
  username: string;
  email: string;
}

interface userState {
  isLoading: boolean;
  userData: IUser;
}

const initialState: userState = {
  isLoading: false,
  userData: {} as IUser,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData: { username: string; email: string; password: string }) => {
    try {
      await axios.post(`${API_END_POINT}/signup`, userData);
      toast.success("Signup Completed successfully. Please Login");
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${API_END_POINT}/login`, userData);
      toast.success("Login Successful");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    try {
      await axios.post(`${API_END_POINT}/logout`);
      toast.success("Logout Successful");
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signup.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.userData = {} as IUser;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
