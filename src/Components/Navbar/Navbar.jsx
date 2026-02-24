import React from "react";
import style from "./Navbar.module.css";
import Settings from "../Settings/Settings";
import { NavLink } from "react-router";
export default function Navbar() {
  return (
    <nav className={style.navbarWrapper}>
      <div className={style.leftSide} aria-label="Go to Shopper home">
        <NavLink to="/" end aria-label="Home" className={style.link}>
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
        <NavLink to="/list" aria-label="List" className={style.link}>
          List
        </NavLink>
        <NavLink to="/contact" aria-label="Contact" className={style.link}>
          Contact
        </NavLink>
      </div>

      <div className={style.rightSide} aria-label="Account settings.">
        <Settings />
      </div>
    </nav>
  );
}
