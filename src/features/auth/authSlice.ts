// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "sender" | "receiver";
}

interface AuthState {
  token: string | null;
  role: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: Cookies.get("token") || null,
  role: Cookies.get("role") || null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; role: string; user: User }>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.user = action.payload.user;

      Cookies.set("token", action.payload.token, { expires: 7 });
      Cookies.set("role", action.payload.role, { expires: 7 });
    },
    clearCredentials: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;

      Cookies.remove("token");
      Cookies.remove("role");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
