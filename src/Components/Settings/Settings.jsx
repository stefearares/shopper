import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/uiSlice";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useAuth } from "../../hooks/useAuth";
import style from "./Settings.module.css";

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { isDark, toggle } = useDarkMode();
  const { isAuthenticated, logout } = useAuth();

  // Close on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  const handleAuthAction = () => {
    setIsOpen(false);
    if (isAuthenticated) {
      logout();
    } else {
      dispatch(openModal("auth"));
    }
  };

  return (
    <div className={style.settingsWrapper} ref={dropdownRef}>
      <button
        className={style.iconBtn}
        aria-label="Open settings menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={style.Settings}
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={style.dropdown} role="menu" aria-label="Settings menu">
          {/* Dark mode toggle */}
          <label className={style.darkModeRow} role="menuitem">
            <span className={style.rowLabel}>Dark mode</span>
            <span className={style.toggleTrack} aria-hidden="true">
              <input
                type="checkbox"
                className={style.toggleInput}
                checked={isDark}
                onChange={toggle}
                aria-label="Toggle dark mode"
              />
              <span className={style.toggleThumb} />
            </span>
          </label>

          <hr className={style.divider} />

          {/* Auth action */}
          <button
            className={style.authBtn}
            type="button"
            role="menuitem"
            onClick={handleAuthAction}
          >
            {isAuthenticated ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                </svg>
                Logout
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.105 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
                Login / Sign Up
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
