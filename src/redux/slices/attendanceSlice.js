import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  today: null,
  checkInTime: null,
  checkOutTime: null,
  workDuration: null,
  inLocation: null,
  outLocation: null,
  status: "not-checked-in",
};

const attendanceSlice = createSlice({
  name: "todayAttendance",

  initialState,

  reducers: {

    setTodayAttendance: (state, action) => {

      const data = action.payload;

      state.today = {
        ...state.today,
        ...data
      };

      state.checkInTime = state.today?.inTime || null;
      state.checkOutTime = state.today?.outTime || null;

      state.inLocation = state.today?.inLocation || null;
      state.outLocation = state.today?.outLocation || null;

      if (state.checkInTime && !state.checkOutTime) {
        state.status = "checked-in";
      }

      if (state.checkInTime && state.checkOutTime) {
        state.status = "checked-out";
      }

    },

    setWorkDuration: (state, action) => {
      state.workDuration = action.payload;
    },

    resetTodayAttendance: () => initialState

  }

});

export const {
  setTodayAttendance,
  setWorkDuration,
  resetTodayAttendance
} = attendanceSlice.actions;

export default attendanceSlice.reducer;