import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
  role: string | null;
}

const initialState: AuthState = {
  token: Cookies.get("token") || null,
  role: Cookies.get("role") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; role: string }>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      Cookies.set("token", action.payload.token, { expires: 7 });
      Cookies.set("role", action.payload.role, { expires: 7 });
    },
    clearCredentials: (state) => {
      state.token = null;
      state.role = null;
      Cookies.remove("token");
      Cookies.remove("role");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
