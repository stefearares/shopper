import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import style from "./ListIdPage.module.css";
import { ShareModal, AddItemModal, ConfirmModal } from "../../Modals/index";

function SkeletonColumn({ label }) {
  return (
    <section className={style.column} aria-label={label} aria-busy="true">
      <div className={`${style.skeleton} ${style.skeletonColumnTitle}`} />
      <ul className={style.itemList}>
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className={style.item}>
            <div className={style.itemInfo}>
              <div className={`${style.skeleton} ${style.skeletonItemName}`} />
              <div className={`${style.skeleton} ${style.skeletonItemPrice}`} />
            </div>
            <div className={style.itemActions}>
              <div className={`${style.skeleton} ${style.skeletonIconBtn}`} />
              <div className={`${style.skeleton} ${style.skeletonIconBtn}`} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const SAMPLE = {
  title: "Groceries for week",
  date: "2026-02-24",
  toBuy: [
    { id: 1, name: "Whole Milk", price: "2.99" },
    { id: 2, name: "Sourdough Bread", price: "3.49" },
    { id: 3, name: "Cheddar Cheese", price: "5.99" },
  ],
  bought: [{ id: 4, name: "Free Range Eggs", price: "4.99" }],
};

export default function ListIdPage() {
  const { listId } = useParams();
  const navigate = useNavigate();

  // These will come from Redux
  const isLoading = false;
  const hasError = false;

  const [title, setTitle] = useState(SAMPLE.title);
  const [date, setDate] = useState(SAMPLE.date);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [toBuy, setToBuy] = useState(SAMPLE.toBuy);
  const [bought, setBought] = useState(SAMPLE.bought);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDoneConfirmOpen, setIsDoneConfirmOpen] = useState(false);

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Escape") setIsEditingTitle(false);
  };

  const moveToBought = useCallback((item) => {
    setToBuy((prev) => prev.filter((i) => i.id !== item.id));
    setBought((prev) => [...prev, item]);
  }, []);

  const moveToToBuy = useCallback((item) => {
    setBought((prev) => prev.filter((i) => i.id !== item.id));
    setToBuy((prev) => [...prev, item]);
  }, []);

  const deleteFromToBuy = useCallback((id) => {
    setToBuy((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const deleteFromBought = useCallback((id) => {
    setBought((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const handleAddItem = useCallback((item) => {
    setToBuy((prev) => [...prev, { ...item, id: Date.now() }]);
  }, []);

  const handleDoneConfirm = () => {
    console.log("list done:", listId);
    navigate("/lists");
  };

  if (isLoading) {
    return (
      <div className={style.pageWrapper} aria-busy="true">
        <header className={style.listHeader}>
          <div className={style.titleGroup}>
            <div className={`${style.skeleton} ${style.skeletonListTitle}`} />
          </div>
          <div className={`${style.skeleton} ${style.skeletonDate}`} />
        </header>
        <div className={style.columnsGrid}>
          <SkeletonColumn label="To Buy loading" />
          <SkeletonColumn label="Bought loading" />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={style.pageWrapper}>
        <div className={style.errorBox}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className={style.errorMessage}>This list could not be loaded.</p>
          <p className={style.errorSub}>
            It may have been deleted or you may not have access.
          </p>
          <button
            className={style.errorBack}
            type="button"
            onClick={() => navigate("/lists")}
          >
            Back to your lists
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.pageWrapper}>
      <header className={style.listHeader}>
        <div className={style.titleGroup}>
          {isEditingTitle ? (
            <input
              className={style.titleInput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={handleTitleKeyDown}
              autoFocus
            />
          ) : (
            <h1
              className={style.listTitle}
              onClick={() => setIsEditingTitle(true)}
              title="Click to edit"
            >
              {title}
              <span className={style.editHint} aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                </svg>
              </span>
            </h1>
          )}
        </div>

        <input
          type="date"
          className={style.dateInput}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-label="List date"
        />
        <button
          className={style.shareBtn}
          onClick={() => setIsShareOpen(true)}
          aria-label="Share list"
          type="button"
          title="Share"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </button>
      </header>

      <div className={style.columnsGrid}>
        <section className={style.column} aria-label="Items to buy">
          <h2 className={style.columnTitle}>To Buy</h2>

          <ul className={style.itemList}>
            {toBuy.length === 0 && (
              <li className={style.emptyState}>
                Nothing here — add something!
              </li>
            )}
            {toBuy.map((item) => (
              <li key={item.id} className={style.item}>
                <div className={style.itemInfo}>
                  <span className={style.itemName}>{item.name}</span>
                  <span className={style.itemPrice}>${item.price}</span>
                </div>
                <div className={style.itemActions}>
                  <button
                    className={style.iconBtn}
                    onClick={() => moveToBought(item)}
                    type="button"
                    aria-label={`Move ${item.name} to bought`}
                    title="Move to bought"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                      />
                    </svg>
                  </button>
                  <button
                    className={`${style.iconBtn} ${style.deleteBtn}`}
                    onClick={() => deleteFromToBuy(item.id)}
                    type="button"
                    aria-label={`Delete ${item.name}`}
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={style.columnFooter}>
            <button
              className={style.footerBtn}
              onClick={() => setIsAddOpen(true)}
              type="button"
            >
              Add +
            </button>
          </div>
        </section>

        <section className={style.column} aria-label="Bought items">
          <h2 className={style.columnTitle}>Bought</h2>

          <ul className={style.itemList}>
            {bought.length === 0 && (
              <li className={style.emptyState}>Nothing bought yet!</li>
            )}
            {bought.map((item) => (
              <li key={item.id} className={`${style.item} ${style.itemBought}`}>
                <button
                  className={style.iconBtn}
                  onClick={() => moveToToBuy(item)}
                  type="button"
                  aria-label={`Move ${item.name} back to to-buy`}
                  title="Move back"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                    />
                  </svg>
                </button>
                <div className={style.itemInfo}>
                  <span className={style.itemName}>{item.name}</span>
                  <span className={style.itemPrice}>${item.price}</span>
                </div>
                <button
                  className={`${style.iconBtn} ${style.deleteBtn}`}
                  onClick={() => deleteFromBought(item.id)}
                  type="button"
                  aria-label={`Delete ${item.name}`}
                  title="Delete"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <div className={style.columnFooter}>
            <button
              className={`${style.footerBtn} ${style.doneBtn}`}
              onClick={() => setIsDoneConfirmOpen(true)}
              type="button"
            >
              Done
            </button>
          </div>
        </section>
      </div>

      {isShareOpen && <ShareModal onClose={() => setIsShareOpen(false)} />}
      {isAddOpen && (
        <AddItemModal
          onAdd={handleAddItem}
          onClose={() => setIsAddOpen(false)}
        />
      )}
      {isDoneConfirmOpen && (
        <ConfirmModal
          message="Mark this list as done? It will be removed from your dashboard."
          confirmLabel="Done Shopping"
          isDanger
          onConfirm={handleDoneConfirm}
          onClose={() => setIsDoneConfirmOpen(false)}
        />
      )}
    </div>
  );
}
