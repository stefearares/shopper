import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import authReducer from "./authSlice";
import listsReducer from "./listsSlice";
import activeListReducer from "./activeListSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    lists: listsReducer,
    activeList: activeListReducer,
  },
});

export default store;
