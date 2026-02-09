let tokenClient = null;
let accessToken = null;
let expiresAt = 0;

const TOKEN_KEY = "google_access_token";
const EXPIRES_KEY = "google_access_expires_at";
const SIGNED_IN_KEY = "google_signed_in";

export function initAuth({ clientId, scopes, onToken }) {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: scopes,
    callback: (resp) => {
      accessToken = resp.access_token;
      const expiresIn = Number(resp.expires_in ?? 0);
      expiresAt = Date.now() + expiresIn * 1000;
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(EXPIRES_KEY, String(expiresAt));
      localStorage.setItem(SIGNED_IN_KEY, "1");
      onToken?.(accessToken);
    }
  });

  // Try to reuse a still-valid token from previous session
  const storedToken = localStorage.getItem(TOKEN_KEY);
  const storedExpires = Number(localStorage.getItem(EXPIRES_KEY) ?? 0);
  if (storedToken && storedExpires > Date.now()) {
    accessToken = storedToken;
    expiresAt = storedExpires;
    onToken?.(accessToken);
  }
}

export function requestSignIn({ prompt = "consent" } = {}) {
  if (!tokenClient) throw new Error("Auth not initialized");
  tokenClient.requestAccessToken({ prompt });
}

export function getAccessToken() {
  if (!accessToken || expiresAt <= Date.now()) return null;
  return accessToken;
}

export function hasSignedInBefore() {
  return localStorage.getItem(SIGNED_IN_KEY) === "1";
}
