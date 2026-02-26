export function extractListPath(input) {
  const trimmed = input.trim();
  try {
    const url = new URL(trimmed);
    return url.pathname;
  } catch {
    if (trimmed.startsWith("/lists/")) return trimmed;
    return null;
  }
}
