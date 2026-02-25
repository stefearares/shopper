import { useState, useEffect, useRef, useCallback } from "react";
import { searchProducts } from "../../utils/productApi";
import ModalShell from "./ModalShell";
import styles from "./Modals.module.css";

export default function AddItemModal({ onAdd, onClose }) {
  const [tab, setTab] = useState("custom"); // 'custom' | 'search'

  // Custom tab state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Search tab state
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const debounceRef = useRef(null);

  const fetchProducts = useCallback(async (q, p, append = false) => {
    setIsSearching(true);
    setSearchError("");
    try {
      const data = await searchProducts(q, p);
      setResults((prev) => (append ? [...prev, ...data.items] : data.items));
      setHasMore(data.hasMore);
      setPage(p);
    } catch {
      setSearchError("Could not load products. Try again.");
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search when query changes
  useEffect(() => {
    if (tab !== "search") return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchProducts(query, 0, false);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [query, tab, fetchProducts]);

  // Initial load when switching to search tab
  useEffect(() => {
    if (tab === "search" && results.length === 0) {
      fetchProducts("", 0, false);
    }
  }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCustomAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name: name.trim(), price: parseFloat(price) || 0 });
    onClose();
  };

  const handleSearchAdd = (item) => {
    onAdd({ name: item.name, price: item.price });
    onClose();
  };

  const loadMore = () => {
    fetchProducts(query, page + 1, true);
  };

  return (
    <ModalShell title="Add Item" onClose={onClose}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === "custom" ? styles.active : ""}`}
          onClick={() => setTab("custom")}
          type="button"
        >
          Custom
        </button>
        <button
          className={`${styles.tab} ${tab === "search" ? styles.active : ""}`}
          onClick={() => setTab("search")}
          type="button"
        >
          Search products
        </button>
      </div>

      {tab === "custom" && (
        <form onSubmit={handleCustomAdd}>
          <div className={styles.field}>
            <label htmlFor="item-name">Name</label>
            <input
              id="item-name"
              type="text"
              placeholder="e.g. Olive oil"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="item-price">Price (optional)</label>
            <input
              id="item-price"
              type="number"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={!name.trim()}
            >
              Add
            </button>
          </div>
        </form>
      )}

      {tab === "search" && (
        <div>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />

          {searchError && <p className={styles.error}>{searchError}</p>}

          {results.length > 0 ? (
            <>
              <ul className={styles.resultsList}>
                {results.map((item) => (
                  <li key={item.id} className={styles.resultItem}>
                    <span className={styles.resultName}>{item.name}</span>
                    <span className={styles.resultPrice}>${item.price.toFixed(2)}</span>
                    <button
                      className={styles.resultAddBtn}
                      onClick={() => handleSearchAdd(item)}
                      type="button"
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
              {hasMore && (
                <button
                  className={styles.loadMoreBtn}
                  onClick={loadMore}
                  disabled={isSearching}
                  type="button"
                >
                  {isSearching ? "Loading…" : "Load more"}
                </button>
              )}
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
                    style={{ background: "none", border: "none", color: "var(--brand-color)", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem" }}
                    onClick={() => setTab("custom")}
                  >
                    Add it manually →
                  </button>
                </>
              )}
            </p>
          )}
        </div>
      )}
    </ModalShell>
  );
}
