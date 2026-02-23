import React from "react";
import style from "./Landing.module.css";
import heroImg from "../../../assets/images/Hero-Landing-Page.png";

export default function Landing() {
  return (
    <div className={style.landingWrapper}>
      <main className={style.landingRightSide}>
        <h1 className={style.landingHeader}>Welcome Lorem ipsum!</h1>
        <p className={style.landingParagraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ultrices tellus non massa consequat porttitor. Duis eu sagittis velit,
          id mattis risus. Donec sollicitudin, orci quis laoreet semper, purus
          justo bibendum neque, sed volutpat erat est et felis. Donec non tempor
          nibh. Nullam commodo augue vel nisi iaculis finibus. Integer varius
          diam ut nulla pretium ornare. Sed mollis sapien eget augue lobortis,
          vitae ornare nisl elementum. Nunc ut lobortis risus.
        </p>
        <div className={style.landingButtonWrapper}>
          <button>Insert URL</button>
          <button>Login/Register</button>
        </div>
      </main>
      <aside className={style.landingHero}>
        <img
          className={style.heroImg}
          src={heroImg}
          alt="Image of a person checking a shopping list."
        />
      </aside>
    </div>
  );
}
