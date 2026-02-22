import { createSlice } from "@reduxjs/toolkit";

const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;

const savedTheme = localStorage.getItem("theme");

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDark: savedTheme ? JSON.parse(savedTheme).isDark : preference,
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
