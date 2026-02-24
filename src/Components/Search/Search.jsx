import React from "react";
import style from "./Search.module.css";

export default function Search({ onSearch, onFilterClick }) {
  const inputRef = React.useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.altKey) {
      if (e.nativeEvent?.isComposing) return;
      e.preventDefault();
      e.stopPropagation();
      onSearch?.(inputRef.current?.value ?? "");
    }
  };

  return (
    <section className={style.searchWrapper} aria-label="Search section">
      <div className={style.searchBar} role="search">
        <div className={style.inputGroup}>
          <input
            ref={inputRef}
            className={style.input}
            type="search"
            name="q"
            placeholder="Search…"
            aria-label="Search"
            autoComplete="off"
            enterKeyHint="search"
            onKeyDown={handleKeyDown}
          />
        </div>

        <button
          type="button"
          className={style.filterBtn}
          onClick={onFilterClick}
          aria-label="Open filters"
          title="Filters"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={style.filterIcon}
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5" />
          </svg>
        </button>
      </div>
    </section>
  );
}
