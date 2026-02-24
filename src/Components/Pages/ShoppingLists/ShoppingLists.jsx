import React from "react";
import style from "./ShoppingLists.module.css";
import Search from "../../Search/Search";
export default function ShoppingLists() {
  return (
    <>
      <Search />
      <main className={style.listsWrapper}></main>
    </>
  );
}
