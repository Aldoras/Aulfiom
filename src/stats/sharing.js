function bytesToBase64Url(bytes) {
  let binary = "";
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlToBytes(base64url) {
  let base64 = base64url
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Compresses an object using deflate and converts it to a base64url string.
 */
export async function compressStats(stats) {
  try {
    const jsonStr = JSON.stringify(stats);
    const stream = new Blob([jsonStr]).stream();
    const compressedStream = stream.pipeThrough(new CompressionStream("deflate"));
    const response = new Response(compressedStream);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    return bytesToBase64Url(new Uint8Array(buffer));
  } catch (err) {
    console.error("Compression failed:", err);
    throw err;
  }
}

/**
 * Decompresses a base64url string and returns the parsed object.
 */
export async function decompressStats(base64url) {
  try {
    const bytes = base64UrlToBytes(base64url);
    const stream = new Blob([bytes]).stream();
    const decompressedStream = stream.pipeThrough(new DecompressionStream("deflate"));
    const response = new Response(decompressedStream);
    const text = await response.text();
    return JSON.parse(text);
  } catch (err) {
    console.error("Decompression failed:", err);
    return null;
  }
}

/**
 * Creates a shareable link from stats.
 */
export async function generateShareLink(stats) {
  const compressed = await compressStats(stats);
  const url = new URL(window.location.href);
  url.searchParams.set("share", compressed);
  return url.toString();
}

/**
 * Checks for a shared stats payload in the URL and returns it if present.
 */
export async function getSharedStatsFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const shareData = urlParams.get("share");
  if (!shareData) return null;
  return await decompressStats(shareData);
}

/**
 * Clears the share parameter from the URL bar without reloading the page.
 */
export function clearShareUrlParam() {
  const url = new URL(window.location.href);
  url.searchParams.delete("share");
  window.history.replaceState({}, document.title, url.pathname + url.search);
}
