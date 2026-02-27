import { useSearchParams } from "react-router";

const VALID_SORTS = ["date_desc", "date_asc", "name_asc", "name_desc"];

function getSavedSort() {
  const stored = localStorage.getItem("sortPreference");
  return VALID_SORTS.includes(stored) ? stored : "date_desc";
}

export function useListSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const sort = searchParams.get("sort") ?? getSavedSort();

  const setQuery = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set("q", value);
      else next.delete("q");
      return next;
    });
  };

  const setSort = (value) => {
    localStorage.setItem("sortPreference", value);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sort", value);
      return next;
    });
  };

  return { query, sort, setQuery, setSort };
}
