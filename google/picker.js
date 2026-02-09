export function ensurePickerLoaded() {
  return new Promise((resolve) => {
    // gapi.load is global from https://apis.google.com/js/api.js
    gapi.load("picker", () => resolve());
  });
}

export function openSpreadsheetPicker({ apiKey, oauthToken, onPicked }) {
  if (!oauthToken) {
    alert("Sign in with Google first.");
    return;
  }

  const picker = new google.picker.PickerBuilder()
    .addView(google.picker.ViewId.SPREADSHEETS)
    .setOAuthToken(oauthToken)
    .setDeveloperKey(apiKey)
    .setCallback((data) => {
      if (data.action === google.picker.Action.PICKED) {
        const doc = data.docs?.[0];
        if (doc?.id) onPicked(doc.id, doc);
      }
    })
    .build();

  picker.setVisible(true);
}
