import { createSlice } from "@reduxjs/toolkit";

const stored = localStorage.getItem("darkMode");
const initialDark = stored !== null ? stored === "true" : false;

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    activeModal: null, // 'auth' | 'url' | null
    darkMode: initialDark,
  },
  reducers: {
    openModal(state, action) {
      state.activeModal = action.payload;
    },
    closeModal(state) {
      state.activeModal = null;
    },
    setDarkMode(state, action) {
      state.darkMode = action.payload;
      localStorage.setItem("darkMode", action.payload);
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode);
    },
  },
});

export const { openModal, closeModal, setDarkMode, toggleDarkMode } =
  uiSlice.actions;
export default uiSlice.reducer;
