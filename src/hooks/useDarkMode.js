import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../store/uiSlice";

export function useDarkMode() {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.ui.darkMode);

  // useLayoutEffect runs before the browser paints, preventing a flash of the wrong theme
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return {
    isDark,
    toggle: () => dispatch(toggleDarkMode()),
  };
}
