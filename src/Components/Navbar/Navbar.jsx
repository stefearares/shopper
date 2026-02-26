import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import style from "./Navbar.module.css";
import Settings from "../Settings/Settings";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useAuth } from "../../hooks/useAuth";
import { openModal } from "../../store/uiSlice";

export default function Navbar() {
  const [menuOpenPath, setMenuOpenPath] = useState(null);

  const menuRef = useRef(null);
  const { isDark, toggle } = useDarkMode();
  const { user, isAuthenticated, logout } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();

  const isMenuOpen = menuOpenPath === location.pathname;

  const openMenu = () => setMenuOpenPath(location.pathname);
  const closeMenu = () => setMenuOpenPath(null);
  const toggleMenu = () => (isMenuOpen ? closeMenu() : openMenu());

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isMenuOpen]);

  const handleAuthAction = () => {
    closeMenu();
    if (isAuthenticated) logout();
    else dispatch(openModal("auth"));
  };

  const mobileMenuId = "navbar-mobile-menu";

  return (
    <nav className={style.navbarWrapper} ref={menuRef}>
      <div className={style.leftSide} aria-label="Go to Shopper home">
        <NavLink
          to="/"
          end
          aria-label="Home"
          className={style.link}
          title="Home"
          onClick={closeMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className={style.navbarLogo}
            viewBox="0 0 16 16"
          >
            <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
          </svg>
          <h2 className={style.navbarTitle}>Shopper</h2>
        </NavLink>
      </div>

      <div className={style.centerSide}>
        {isAuthenticated && (
          <NavLink
            to="/lists"
            aria-label="My Lists"
            className={style.link}
            onClick={closeMenu}
          >
            My Lists
          </NavLink>
        )}
        <NavLink
          to="/contact"
          aria-label="Contact"
          className={style.link}
          onClick={closeMenu}
        >
          Contact
        </NavLink>
      </div>

      <div className={style.rightSide} aria-label="Account settings">
        <Settings />
      </div>

      <button
        className={style.hamburger}
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls={mobileMenuId}
        type="button"
      >
        {isMenuOpen ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {isMenuOpen && (
        <div id={mobileMenuId} className={style.mobileMenu}>
          {isAuthenticated && (
            <NavLink
              to="/lists"
              className={style.mobileLink}
              onClick={closeMenu}
            >
              Lists
            </NavLink>
          )}
          <NavLink
            to="/contact"
            className={style.mobileLink}
            onClick={closeMenu}
          >
            Contact
          </NavLink>

          <hr className={style.mobileDivider} />

          {isAuthenticated && (
            <p className={style.mobileEmail}>{user?.email}</p>
          )}
          <label className={style.mobileDarkRow}>
            <span>Dark mode</span>
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

          <button
            className={style.mobileAuthBtn}
            type="button"
            onClick={handleAuthAction}
          >
            {isAuthenticated ? "Logout" : "Login / Sign Up"}
          </button>
        </div>
      )}
    </nav>
  );
}
