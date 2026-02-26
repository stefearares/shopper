export function applyFilters(items, query, sort) {
  let result = [...items];

  if (query.trim()) {
    const lower = query.toLowerCase();
    result = result.filter((item) => item.title.toLowerCase().includes(lower));
  }

  switch (sort) {
    case "date_asc":
      result.sort((a, b) => a.date.localeCompare(b.date));
      break;
    case "name_asc":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "name_desc":
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      result.sort((a, b) => b.date.localeCompare(a.date));
  }

  return result;
}
