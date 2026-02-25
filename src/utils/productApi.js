const BASE_URL = "https://dummyjson.com";
const PAGE_SIZE = 10;

export async function searchProducts(query, page = 0) {
  const skip = page * PAGE_SIZE;
  const url = query.trim()
    ? `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${PAGE_SIZE}&skip=${skip}`
    : `${BASE_URL}/products?limit=${PAGE_SIZE}&skip=${skip}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();

  const items = data.products.map((p) => ({
    id: p.id,
    name: p.title,
    price: p.price,
  }));

  return {
    items,
    total: data.total,
    hasMore: skip + items.length < data.total,
  };
}
