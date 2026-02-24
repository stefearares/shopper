import React from "react";
import style from "./ShoppingLists.module.css";
import Search from "../../Search/Search";

const sampleItems = [
  { id: 1, title: "Groceries for week", date: "2026-02-24" },
  { id: 2, title: "Hardware store run", date: "2026-02-22" },
  { id: 3, title: "Birthday party supplies", date: "2026-02-20" },
  { id: 4, title: "Groceries for week", date: "2026-02-24" },
  { id: 5, title: "Hardware store run", date: "2026-02-22" },
  { id: 6, title: "Birthday party supplies", date: "2026-02-20" },
  { id: 7, title: "Groceries for week", date: "2026-02-24" },
  { id: 8, title: "Hardware store run", date: "2026-02-22" },
  { id: 9, title: "Birthday party supplies", date: "2026-02-20" },
];

export default function ShoppingLists() {
  return (
    <>
      <Search
        onSearch={(q) => console.log("search:", q)}
        onFilterClick={() => console.log("open filter")}
      />

      <main className={style.listsWrapper}>
        <section className={style.listPanel} aria-label="Shopping lists">
          <ul className={style.listItems}>
            {sampleItems.map((item) => (
              <li key={item.id} className={style.listItem}>
                <div className={style.itemMain}>
                  <h3 className={style.itemTitle} title={item.title}>
                    {item.title}
                    <span className={style.itemSep} aria-hidden="true">
                      {" "}
                      |{" "}
                    </span>
                    <time className={style.itemDate} dateTime={item.date}>
                      {new Date(item.date).toLocaleDateString()}
                    </time>
                  </h3>
                </div>

                <div className={style.itemActions}>
                  <button
                    className={style.actionBtn}
                    aria-label="View"
                    type="button"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M12 5c5.523 0 10 4 10 7s-4.477 7-10 7S2 15 2 12s4.477-7 10-7zm0 2C8.686 7 6 9.239 6 12s2.686 5 6 5s6-2.239 6-5s-2.686-5-6-5m0 2a3 3 0 1 1 0 6a3 3 0 0 1 0-6Z"
                      />
                    </svg>
                  </button>

                  <button
                    className={style.actionBtn}
                    aria-label="Mark as done"
                    type="button"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M9.55 16.4 5.1 12l1.4-1.4l3.05 3.05l8-8l1.4 1.4z"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={style.createPanel}>
            <button
              className={style.createBtn}
              onClick={() => console.log("create list")}
              type="button"
            >
              Create +
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
