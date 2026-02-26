import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import style from "./ListIdPage.module.css";
import { ShareModal, AddItemModal, ConfirmModal } from "../../Modals";
import { useAuth } from "../../../hooks/useAuth";
import {
  fetchActiveList,
  clearActiveList,
  addItem,
  updateItemStatus,
  deleteItem,
} from "../../../store/activeListSlice";
import { deleteList } from "../../../store/listsSlice";
import ListHeader from "./ListHeader";
import ItemColumn from "./ItemColumn";

function SkeletonColumn({ label }) {
  return (
    <section className={style.column} aria-label={label} aria-busy="true">
      <div className={`${style.skeleton} ${style.skeletonColumnTitle}`} />
      <ul className={style.itemList}>
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className={style.item}>
            <div className={style.itemInfo}>
              <div className={`${style.skeleton} ${style.skeletonItemName}`} />
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

export default function ListIdPage() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const { list, items, isLoading, hasError } = useSelector(
    (state) => state.activeList,
  );

  const isOwner = Boolean(user && list && user.id === list.user_id);

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDoneConfirmOpen, setIsDoneConfirmOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchActiveList(listId));
    return () => dispatch(clearActiveList());
  }, [dispatch, listId]);

  const toBuy = useMemo(
    () => items.filter((i) => i.status === "to_buy"),
    [items],
  );
  const bought = useMemo(
    () => items.filter((i) => i.status === "bought"),
    [items],
  );

  const moveToBought = (item) =>
    dispatch(updateItemStatus({ id: item.id, status: "bought" }));

  const moveToToBuy = (item) =>
    dispatch(updateItemStatus({ id: item.id, status: "to_buy" }));

  const handleDeleteItem = (id) => dispatch(deleteItem(id));

  const handleAddItem = ({ name, price }) =>
    dispatch(addItem({ listId, name, price }));

  const handleDoneConfirm = () => {
    dispatch(deleteList(listId));
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
            onClick={() => navigate(-1)}
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.pageWrapper}>
      <ListHeader
        list={list}
        listId={listId}
        isOwner={isOwner}
        onShareClick={() => setIsShareOpen(true)}
      />

      <div className={style.columnsGrid}>
        <ItemColumn
          title="To Buy"
          ariaLabel="Items to buy"
          items={toBuy}
          isOwner={isOwner}
          emptyMessage={
            isOwner ? "Nothing here yet... add something!" : "No items yet."
          }
          onMove={moveToBought}
          onDelete={handleDeleteItem}
          moveLabel="Move to bought"
          footer={
            <button
              className={style.footerBtn}
              onClick={() => setIsAddOpen(true)}
              type="button"
            >
              Add +
            </button>
          }
        />

        <ItemColumn
          title="Bought"
          ariaLabel="Bought items"
          items={bought}
          isOwner={isOwner}
          emptyMessage="Nothing bought yet!"
          onMove={moveToToBuy}
          onDelete={handleDeleteItem}
          moveLabel="Move back to to buy"
          isBought
          footer={
            <button
              className={`${style.footerBtn} ${style.doneBtn}`}
              onClick={() => setIsDoneConfirmOpen(true)}
              type="button"
            >
              Done
            </button>
          }
        />
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
