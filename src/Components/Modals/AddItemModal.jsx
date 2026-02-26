import { useState, useEffect, useRef } from "react";
import ModalShell from "./ModalShell";
import styles from "./Modals.module.css";
import { useProductSearch } from "../../hooks/useProductSearch";
import ProductSearchTab from "./ProductSearchTab";

export default function AddItemModal({ onAdd, onClose }) {
  const [tab, setTab] = useState("custom");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [query, setQuery] = useState("");
  const debounceRef = useRef(null);

  const { results, page, hasMore, isSearching, searchError, fetchProducts } =
    useProductSearch();

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
        <ProductSearchTab
          query={query}
          onQueryChange={setQuery}
          results={results}
          isSearching={isSearching}
          searchError={searchError}
          hasMore={hasMore}
          onAdd={handleSearchAdd}
          onLoadMore={() => fetchProducts(query, page + 1, true)}
          onSwitchToCustom={() => setTab("custom")}
        />
      )}
    </ModalShell>
  );
}
