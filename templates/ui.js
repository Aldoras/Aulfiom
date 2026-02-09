import { templates } from "./templates.js";
import { getLinkedSheetId, setLinkedSheetId, clearLinkedSheetId } from "./links.js";
import { loadStats } from "../stats/storage.js";
import { statSchema } from "../stats/schema.js";
import { writeStatsToSheet } from "../google/sheets.js";
import { openSpreadsheetPicker } from "../google/picker.js";

export function renderTemplatesPanel(root, { apiKey, getToken }) {
  root.innerHTML = "";

  const title = document.createElement("h3");
  title.textContent = "Templates";
  root.appendChild(title);

  const help = document.createElement("div");
  help.className = "muted";
  help.textContent =
    "Link a sheet copy from your Drive to each template. Then you can push stats into it anytime.";
  root.appendChild(help);

  const list = document.createElement("div");
  list.className = "template-list";
  root.appendChild(list);

  for (const t of templates) {
    const card = document.createElement("div");
    card.className = "template-card";

    const header = document.createElement("div");
    header.className = "template-header";
    header.innerHTML = `<div class="template-name">${t.name}</div><div class="muted">ID: ${t.id}</div>`;
    card.appendChild(header);

    const linkedId = getLinkedSheetId(t.id);

    const linked = document.createElement("div");
    linked.className = "template-linked";
    linked.innerHTML = linkedId
      ? `Linked sheet: <code>${linkedId}</code>`
      : `Linked sheet: <span class="muted">none</span>`;
    card.appendChild(linked);

    const actions = document.createElement("div");
    actions.className = "template-actions";

    const btnLink = document.createElement("button");
    btnLink.textContent = linkedId ? "Relink from Drive…" : "Link from Drive…";
    btnLink.onclick = () => {
      const token = getToken();
      openSpreadsheetPicker({
        apiKey,
        oauthToken: token,
        onPicked: (spreadsheetId) => {
          setLinkedSheetId(t.id, spreadsheetId);
          renderTemplatesPanel(root, { apiKey, getToken }); // refresh UI
        }
      });
    };

    const btnClear = document.createElement("button");
    btnClear.textContent = "Clear link";
    btnClear.disabled = !linkedId;
    btnClear.onclick = () => {
      clearLinkedSheetId(t.id);
      renderTemplatesPanel(root, { apiKey, getToken });
    };

    const btnPush = document.createElement("button");
    btnPush.textContent = "Push stats → linked sheet";
    btnPush.disabled = !linkedId;
    btnPush.onclick = async () => {
      const token = getToken();
      if (!token) return alert("Sign in with Google first.");

      const stats = loadStats(statSchema);
      await writeStatsToSheet(linkedId, t.mappings, stats, token);
      window.open(`https://docs.google.com/spreadsheets/d/${linkedId}/edit`, "_blank");
    };

    // Optional: quick test using the public template itself (only works if you have edit access)
    const btnPushToTemplate = document.createElement("button");
    btnPushToTemplate.textContent = "Push stats → template (test)";
    btnPushToTemplate.onclick = async () => {
      const token = getToken();
      if (!token) return alert("Sign in with Google first.");

      const stats = loadStats(statSchema);
      await writeStatsToSheet(t.spreadsheetId, t.mappings, stats, token);
      window.open(`https://docs.google.com/spreadsheets/d/${t.spreadsheetId}/edit`, "_blank");
    };

    actions.append(btnLink, btnClear, btnPush);
    // Comment out if you don't want it:
    // actions.append(btnPushToTemplate);

    card.appendChild(actions);
    list.appendChild(card);
  }
}
