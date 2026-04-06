import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import alertReducer from './slices/alertSlice'
export const store = configureStore({
  reducer: {
     alert: alertReducer, // ✅ Alert Slice Added
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});