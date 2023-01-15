import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isSignIn: true,
  },
  reducers: {
    toggleAuth: (state) => {
      state.isSignIn = !state.isSignIn;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
