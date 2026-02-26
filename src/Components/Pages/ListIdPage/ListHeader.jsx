import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateListMeta } from "../../../store/activeListSlice";
import style from "./ListIdPage.module.css";

export default function ListHeader({ list, listId, isOwner, onShareClick }) {
  const dispatch = useDispatch();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");

  const beginEditTitle = () => {
    if (!isOwner) return;
    setDraftTitle(list?.title ?? "");
    setIsEditingTitle(true);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    const trimmed = draftTitle.trim();
    if (trimmed && trimmed !== (list?.title ?? "")) {
      dispatch(
        updateListMeta({ id: listId, title: trimmed, date: list?.date ?? "" }),
      );
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Escape") e.target.blur();
  };

  const handleDateChange = (e) => {
    if (!list) return;
    dispatch(
      updateListMeta({
        id: listId,
        title: list.title ?? "",
        date: e.target.value,
      }),
    );
  };

  return (
    <header className={style.listHeader}>
      <div className={style.titleGroup}>
        {isOwner && isEditingTitle ? (
          <input
            className={style.titleInput}
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            autoFocus
          />
        ) : (
          <h1
            className={style.listTitle}
            onClick={beginEditTitle}
            style={isOwner ? undefined : { cursor: "default" }}
          >
            <span className={style.listTitleText} title={list?.title}>
              {list?.title ?? ""}
            </span>
            {isOwner && (
              <span className={style.editHint} aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                </svg>
              </span>
            )}
          </h1>
        )}
      </div>

      <input
        type="date"
        className={style.dateInput}
        value={list?.date ?? ""}
        onChange={handleDateChange}
        aria-label="List date"
        disabled={!isOwner}
      />

      {isOwner && (
        <button
          className={style.shareBtn}
          onClick={onShareClick}
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
      )}
    </header>
  );
}
