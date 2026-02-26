import { useState, useEffect, useRef, useCallback } from "react";
import { searchProducts, PAGE_SIZE } from "../../utils/productApi";
import ModalShell from "./ModalShell";
import styles from "./Modals.module.css";

export default function AddItemModal({ onAdd, onClose }) {
  const [tab, setTab] = useState("custom");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

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
      if (!q.trim()) {
        const data = await searchProducts(q, p);
        setResults((prev) => (append ? [...prev, ...data.items] : data.items));
        setHasMore(data.hasMore);
        setPage(p);
        return;
      }

      let currentPage = p;
      let nameMatched = [];
      let serverHasMore = true;

      while (nameMatched.length < PAGE_SIZE && serverHasMore) {
        const data = await searchProducts(q, currentPage);
        const matched = data.items.filter((item) =>
          item.name.toLowerCase().includes(q.toLowerCase())
        );
        nameMatched = [...nameMatched, ...matched];
        serverHasMore = data.hasMore;
        currentPage++;
      }

      setResults((prev) => (append ? [...prev, ...nameMatched] : nameMatched));
      setHasMore(serverHasMore);
      setPage(currentPage - 1); // last page we actually fetched
    } catch {
      setSearchError("Could not load products. Try again.");
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    if (tab !== "search") return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchProducts(query, 0, false);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [query, tab, fetchProducts]);

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
            <label htmlFor="item-price">Price ~ optional</label>
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
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={onClose}
            >
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
                    <span className={styles.resultPrice}>
                      ${item.price.toFixed(2)}
                    </span>
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
              <button
                className={styles.loadMoreBtn}
                onClick={loadMore}
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
                    onClick={() => setTab("custom")}
                  >
                    Custom Item
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
