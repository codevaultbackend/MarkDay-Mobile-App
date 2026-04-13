import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import alertReducer from "./slices/alertSlice";
import todayAttendanceReducer from "./slices/attendanceSlice";

import {
  persistStore,
  persistReducer
} from "redux-persist";

import { reduxPersistStorage } from "./mmkvPersistStorage";


const persistConfig = {
  key: "root",
  storage: reduxPersistStorage, // ✅ MMKV
  whitelist: ["todayAttendance"] // only this persist
};


const appReducer = {
  alert: alertReducer,
  todayAttendance: todayAttendanceReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};


const rootReducer = (state, action) => {

  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return {
    alert: appReducer.alert(state?.alert, action),

    todayAttendance:
      appReducer.todayAttendance(
        state?.todayAttendance,
        action
      ),

    [baseApi.reducerPath]:
      appReducer[baseApi.reducerPath](
        state?.[baseApi.reducerPath],
        action
      ),
  };
};


const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);


export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);