import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import style from "./Navbar.module.css";
import Settings from "../Settings/Settings";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useAuth } from "../../hooks/useAuth";
import { openModal } from "../../store/uiSlice";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { isDark, toggle } = useDarkMode();
  const { isAuthenticated, logout } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  // Close on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    if (isMenuOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isMenuOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") closeMenu(); };
    if (isMenuOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => { closeMenu(); }, [location.pathname]);

  const handleAuthAction = () => {
    closeMenu();
    if (isAuthenticated) logout();
    else dispatch(openModal("auth"));
  };

  return (
    <nav className={style.navbarWrapper} ref={menuRef}>
      {/* Logo */}
      <div className={style.leftSide} aria-label="Go to Shopper home">
        <NavLink to="/" end aria-label="Home" className={style.link} title="Home">
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

      {/* Desktop center nav */}
      <div className={style.centerSide}>
        <NavLink to="/lists" aria-label="List" className={style.link}>List</NavLink>
        <NavLink to="/contact" aria-label="Contact" className={style.link}>Contact</NavLink>
      </div>

      {/* Desktop right: Settings dropdown */}
      <div className={style.rightSide} aria-label="Account settings">
        <Settings />
      </div>

      {/* Mobile: hamburger button */}
      <button
        className={style.hamburger}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        type="button"
      >
        {isMenuOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className={style.mobileMenu} role="menu">
          <NavLink to="/lists" className={style.mobileLink} role="menuitem" onClick={closeMenu}>
            Lists
          </NavLink>
          <NavLink to="/contact" className={style.mobileLink} role="menuitem" onClick={closeMenu}>
            Contact
          </NavLink>

          <hr className={style.mobileDivider} />

          <label className={style.mobileDarkRow} role="menuitem">
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

          <button className={style.mobileAuthBtn} type="button" role="menuitem" onClick={handleAuthAction}>
            {isAuthenticated ? "Logout" : "Login / Sign Up"}
          </button>
        </div>
      )}
    </nav>
  );
}
