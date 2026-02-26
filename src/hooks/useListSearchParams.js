import { useSearchParams } from "react-router";

export function useListSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const sort = searchParams.get("sort") ?? "date_desc";

  const setQuery = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set("q", value);
      else next.delete("q");
      return next;
    });
  };

  const setSort = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sort", value);
      return next;
    });
  };

  return { query, sort, setQuery, setSort };
}
