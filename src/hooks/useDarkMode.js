import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, setDarkMode } from "../store/uiSlice";

export function useDarkMode() {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.ui.darkMode);

  // Apply/remove .dark class on <html> whenever state changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Sync initial value from localStorage on first mount
  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      dispatch(setDarkMode(stored === "true"));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    isDark,
    toggle: () => dispatch(toggleDarkMode()),
  };
}
