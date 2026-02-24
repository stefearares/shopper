import React from "react";
import style from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={style.navbarWrapper}>
      <div className={style.leftSide} aria-label="Go to Shopper home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={style.navbarLogo}
          viewBox="0 0 16 16"
        >
          <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
        </svg>
        <h2 className={style.navbarTitle}>Shopper</h2>
      </div>

      <div className={style.centerSide}>
        <h2 className={style.navbarList}>List</h2>
        <h2 className={style.navbarContact}>Contact</h2>
      </div>

      <div className={style.rightSide} aria-label="Account settings.">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={style.navbarPerson}
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          />
        </svg>
      </div>
    </nav>
  );
}
