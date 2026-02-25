import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import style from "./ShoppingLists.module.css";
import Search from "../../Search/Search";
import { ConfirmModal, FilterModal } from "../../Modals/index";

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

function applyFilters(items, query, sort) {
  let result = [...items];
  if (query.trim()) {
    const lower = query.toLowerCase();
    result = result.filter((item) => item.title.toLowerCase().includes(lower));
  }
  switch (sort) {
    case "date_asc":  result.sort((a, b) => a.date.localeCompare(b.date)); break;
    case "name_asc":  result.sort((a, b) => a.title.localeCompare(b.title)); break;
    case "name_desc": result.sort((a, b) => b.title.localeCompare(a.title)); break;
    default:          result.sort((a, b) => b.date.localeCompare(a.date));
  }
  return result;
}

// Skeleton row component
function SkeletonItem() {
  return (
    <li className={style.listItem} aria-hidden="true">
      <div className={style.itemMain}>
        <div className={`${style.skeleton} ${style.skeletonTitle}`} />
      </div>
      <div className={style.itemActions}>
        <div className={`${style.skeleton} ${style.skeletonBtn}`} />
        <div className={`${style.skeleton} ${style.skeletonBtn}`} />
      </div>
    </li>
  );
}

export default function ShoppingLists() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [confirmItem, setConfirmItem] = useState(null);

  // These will be driven by Redux when the lists slice is wired in
  const isLoading = false;
  const hasError = false;

  const query = searchParams.get("q") ?? "";
  const sort = searchParams.get("sort") ?? "date_desc";

  const setQuery = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set("q", value);
      else next.delete("q");
      return next;
    });
  };

  const setSort = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sort", value);
      return next;
    });
  };

  const filteredItems = useMemo(
    () => applyFilters(sampleItems, query, sort),
    [query, sort]
  );

  const handleDelete = (item) => setConfirmItem(item);
  const confirmDelete = () => {
    console.log("delete list:", confirmItem?.id);
    setConfirmItem(null);
  };

  // ── Error state ────────────────────────────────────────────
  if (hasError) {
    return (
      <main className={style.listsWrapper}>
        <div className={style.stateBox}>
          <p className={style.stateMessage}>Failed to load your lists.</p>
          <button className={style.retryBtn} type="button" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <Search defaultValue={query} onSearch={setQuery} onFilterClick={() => setIsFilterModalOpen(true)} />

      <main className={style.listsWrapper}>
        <section className={style.listPanel} aria-label="Shopping lists">
          <ul className={style.listItems}>
            {/* ── Loading skeleton ── */}
            {isLoading && Array.from({ length: 5 }).map((_, i) => <SkeletonItem key={i} />)}

            {/* ── Empty state ── */}
            {!isLoading && filteredItems.length === 0 && (
              <li className={style.emptyState}>
                {query ? "No lists match your search." : "No lists yet — create your first one!"}
              </li>
            )}

            {/* ── List items ── */}
            {!isLoading && filteredItems.map((item) => (
              <li key={item.id} className={style.listItem}>
                <div className={style.itemMain}>
                  <h3 className={style.itemTitle} title={item.title}>
                    {item.title}
                    <span className={style.itemSep} aria-hidden="true">{" "}|{" "}</span>
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
                    title="View list"
                    onClick={() => navigate(`/lists/${item.id}`)}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="currentColor" d="M12 5c5.523 0 10 4 10 7s-4.477 7-10 7S2 15 2 12s4.477-7 10-7zm0 2C8.686 7 6 9.239 6 12s2.686 5 6 5s6-2.239 6-5s-2.686-5-6-5m0 2a3 3 0 1 1 0 6a3 3 0 0 1 0-6Z" />
                    </svg>
                  </button>

                  <button
                    className={`${style.actionBtn} ${style.deleteAction}`}
                    aria-label="Delete list"
                    type="button"
                    title="Delete list"
                    onClick={() => handleDelete(item)}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="currentColor" d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zm0 5h2v9H9zm4 0h2v9h-2z" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={style.createPanel}>
            <button className={style.createBtn} onClick={() => console.log("create list")} type="button">
              Create +
            </button>
          </div>
        </section>
      </main>

      {isFilterModalOpen && (
        <FilterModal current={sort} onApply={setSort} onClose={() => setIsFilterModalOpen(false)} />
      )}
      {confirmItem && (
        <ConfirmModal
          message={`Delete "${confirmItem.title}"? This action cannot be undone.`}
          confirmLabel="Delete"
          isDanger
          onConfirm={confirmDelete}
          onClose={() => setConfirmItem(null)}
        />
      )}
    </>
  );
}
