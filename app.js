import { statSchema } from "./stats/schema.js";
import { renderStats } from "./stats/ui.js";

import { initAuth, requestSignIn, getAccessToken, hasSignedInBefore } from "./google/auth.js";
import { ensurePickerLoaded } from "./google/picker.js";

import { renderTemplatesPanel } from "./templates/ui.js";

// ======= CONFIG =======
const CLIENT_ID = "327402550159-ij11pkr61ukgirnm8eomvcgt5vobveb4.apps.googleusercontent.com";
const API_KEY = "AIzaSyC9vXCMmReUNnUFKlue80t1b4JOI_mI5rw";
const SCOPES =
  "https://www.googleapis.com/auth/drive.file " +
  "https://www.googleapis.com/auth/spreadsheets";

window.addEventListener("DOMContentLoaded", async () => {
  // Render stats UI
  const statsRoot = document.getElementById("stats-root");
  renderStats(statsRoot, statSchema);

  // Load Picker library
  await ensurePickerLoaded();

  // Auth init
  const status = document.getElementById("auth-status");
  initAuth({
    clientId: CLIENT_ID,
    scopes: SCOPES,
    onToken: () => {
      status.textContent = "Signed in (token acquired).";
      // Re-render templates panel so buttons become usable
      renderTemplatesPanel(document.getElementById("templates-root"), {
        apiKey: API_KEY,
        getToken: getAccessToken
      });
    }
  });

  // Sign-in button (force consent)
  document.getElementById("btnSignIn").onclick = () =>
    requestSignIn({ prompt: "consent" });

  // Try a silent refresh if they've signed in before
  if (hasSignedInBefore() && !getAccessToken()) {
    requestSignIn({ prompt: "" });
  }

  // Render templates panel initially
  renderTemplatesPanel(document.getElementById("templates-root"), {
    apiKey: API_KEY,
    getToken: getAccessToken
  });
});


