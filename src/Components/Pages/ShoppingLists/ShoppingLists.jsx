import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import style from "./ShoppingLists.module.css";
import Search from "../../Search/Search";
import { ConfirmModal, FilterModal, CreateListModal } from "../../Modals/index";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists, createList, deleteList } from "../../../store/listsSlice";
import { applyFilters } from "../../../utils/listFilters";
import { useListSearchParams } from "../../../hooks/useListSearchParams";

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
  const dispatch = useDispatch();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [confirmItem, setConfirmItem] = useState(null);

  const { items, isLoading, hasError } = useSelector((state) => state.lists);
  const { query, sort, setQuery, setSort } = useListSearchParams();

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  const filteredItems = useMemo(
    () => applyFilters(items, query, sort),
    [items, query, sort],
  );

  const handleCreateList = (listData) => {
    dispatch(createList(listData));
  };

  const handleDelete = (item) => setConfirmItem(item);
  const confirmDelete = () => {
    dispatch(deleteList(confirmItem.id));
    setConfirmItem(null);
  };

  if (hasError) {
    return (
      <main className={style.listsWrapper}>
        <div className={style.stateBox}>
          <p className={style.stateMessage}>Failed to load your lists.</p>
          <button
            className={style.retryBtn}
            type="button"
            onClick={() => dispatch(fetchLists())}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <Search
        defaultValue={query}
        onSearch={setQuery}
        onFilterClick={() => setIsFilterModalOpen(true)}
      />

      <main className={style.listsWrapper}>
        <section className={style.listPanel} aria-label="Shopping lists">
          <ul className={style.listItems}>
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => <SkeletonItem key={i} />)}
            {!isLoading && filteredItems.length === 0 && (
              <li className={style.emptyState}>
                {query
                  ? "No lists match your search."
                  : "No lists yet — create your first one!"}
              </li>
            )}

            {!isLoading &&
              filteredItems.map((item) => (
                <li key={item.id} className={style.listItem}>
                  <div className={style.itemMain}>
                    <h3 className={style.itemTitle}>
                      <span className={style.itemTitleText} title={item.title}>
                        {item.title}
                      </span>
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
                      title="View list"
                      onClick={() => navigate(`/lists/${item.id}`)}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M12 5c5.523 0 10 4 10 7s-4.477 7-10 7S2 15 2 12s4.477-7 10-7zm0 2C8.686 7 6 9.239 6 12s2.686 5 6 5s6-2.239 6-5s-2.686-5-6-5m0 2a3 3 0 1 1 0 6a3 3 0 0 1 0-6Z"
                        />
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
                        <path
                          fill="currentColor"
                          d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zm0 5h2v9H9zm4 0h2v9h-2z"
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
              onClick={() => setIsCreateModalOpen(true)}
              type="button"
            >
              Create +
            </button>
          </div>
        </section>
      </main>

      {isCreateModalOpen && (
        <CreateListModal
          onCreate={handleCreateList}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
      {isFilterModalOpen && (
        <FilterModal
          current={sort}
          onApply={setSort}
          onClose={() => setIsFilterModalOpen(false)}
        />
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
