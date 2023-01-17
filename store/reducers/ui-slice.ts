import { createSlice, current } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isSignIn: true,
    isHabitListEmpty: true,
    currentIndex: 0,
  },
  reducers: {
    toggleAuth: (state) => {
      state.isSignIn = !state.isSignIn;
    },
    setIsListEmpty: (state, action) => {
      state.isHabitListEmpty = action.payload;
    },
    increaseIndex: (state, action) => {
      if (state.currentIndex < action.payload - 1) state.currentIndex++;
    },
    decreaseIndex: (state) => {
      if (state.currentIndex > 0) state.currentIndex--;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
