import { useState, useCallback } from "react";
import { searchProducts, PAGE_SIZE } from "../utils/productApi";

export function useProductSearch() {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

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
          item.name.toLowerCase().includes(q.toLowerCase()),
        );
        nameMatched = [...nameMatched, ...matched];
        serverHasMore = data.hasMore;
        currentPage++;
      }

      setResults((prev) => (append ? [...prev, ...nameMatched] : nameMatched));
      setHasMore(serverHasMore);
      setPage(currentPage - 1);
    } catch {
      setSearchError("Could not load products. Try again.");
    } finally {
      setIsSearching(false);
    }
  }, []);

  return { results, page, hasMore, isSearching, searchError, fetchProducts };
}
