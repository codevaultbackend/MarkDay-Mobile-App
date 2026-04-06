import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    queue: [],
    loadingMap: {},
  },

  reducers: {

    pushAlert: (state, action) => {
      const alertWithId = {
        id: `${Date.now()}-${Math.random()}`,
        ...action.payload,
      };
      state.queue.push(alertWithId);
    },

    removeAlertById: (state, action) => {
      const idToRemove = action.payload;
      state.queue = state.queue.filter(
        alert => alert.id !== idToRemove
      );
    },

    clearAllAlerts: (state) => {
      state.queue = [];
    },

    // setLoading: (state, action) => {
    //   const { key, value } = action.payload;
    //   state.loadingMap[key] = value;
    // },

    // clearLoadingKey: (state, action) => {
    //   const key = action.payload;
    //   delete state.loadingMap[key];
    // },

  },
});

export const {
  pushAlert,
  removeAlertById,
  clearAllAlerts,
//   setLoading,
//   clearLoadingKey
} = alertSlice.actions;

export default alertSlice.reducer;