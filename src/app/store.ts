// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../services/apiSlice";
import { userApiSlice } from "../services/userApiSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(apiSlice.middleware, userApiSlice.middleware),
});

// ✅ Types for the whole app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
