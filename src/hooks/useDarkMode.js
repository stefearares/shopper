import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, setDarkMode } from "../store/uiSlice";

export function useDarkMode() {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.ui.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      dispatch(setDarkMode(stored === "true"));
    }
  }, []);
  return {
    isDark,
    toggle: () => dispatch(toggleDarkMode()),
  };
}
