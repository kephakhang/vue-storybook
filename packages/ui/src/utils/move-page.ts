export function movePage(url: string | URL) {
  const urlString = url instanceof URL ? url.href : url;
  if (urlString === location.href) return;
  location.href = urlString;
}
