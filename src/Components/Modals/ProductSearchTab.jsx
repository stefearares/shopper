import styles from "./Modals.module.css";

export default function ProductSearchTab({
  query,
  onQueryChange,
  results,
  isSearching,
  searchError,
  hasMore,
  onAdd,
  onLoadMore,
  onSwitchToCustom,
}) {
  return (
    <div>
      <input
        className={styles.searchInput}
        type="search"
        placeholder="Search products…"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        autoFocus
      />

      {searchError && <p className={styles.error}>{searchError}</p>}

      {results.length > 0 ? (
        <>
          <ul className={styles.resultsList}>
            {results.map((item) => (
              <li key={item.id} className={styles.resultItem}>
                <span className={styles.resultName}>{item.name}</span>
                <span className={styles.resultPrice}>
                  ${item.price.toFixed(2)}
                </span>
                <button
                  className={styles.resultAddBtn}
                  onClick={() => onAdd(item)}
                  type="button"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
          <button
            className={styles.loadMoreBtn}
            onClick={onLoadMore}
            disabled={!hasMore || isSearching}
            type="button"
          >
            {isSearching ? "Loading…" : "Load more"}
          </button>
        </>
      ) : isSearching ? (
        <p className={styles.emptyState}>Searching…</p>
      ) : (
        <p className={styles.emptyState}>
          {query ? "No products found." : "Start typing to search."}
          {query && (
            <>
              {" "}
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--brand-color)",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
                onClick={onSwitchToCustom}
              >
                Custom Item
              </button>
            </>
          )}
        </p>
      )}
    </div>
  );
}
