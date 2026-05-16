export function formatImageUrlUtil(url: string | null) {
  if (!url) return null;

  return url.split(" ")[0];
}