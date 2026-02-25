import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoadingAuth: false, // resolved immediately; set to true only when Supabase checks session
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLoadingAuth = false;
    },
    clearUser(state) {
      state.user = null;
      state.isLoadingAuth = false;
    },
    setAuthLoading(state, action) {
      state.isLoadingAuth = action.payload;
    },
  },
});

export const { setUser, clearUser, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
