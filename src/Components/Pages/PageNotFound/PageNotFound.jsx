import React from "react";

import style from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <section className={style.wrapper} aria-labelledby="p-title">
      <div className={style.card}>
        <div className={style.code} aria-hidden="true">
          404
        </div>

        <h1 id="p-title" className={style.title}>
          Sorry, the page you are trying to access doesnt exist.
        </h1>
      </div>
    </section>
  );
}
