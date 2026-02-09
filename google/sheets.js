export async function writeStatsToSheet(
  spreadsheetId,
  mappings,
  stats,
  accessToken
) {
  const data = Object.entries(mappings).map(([key, range]) => ({
    range,
    values: [[stats[key] ?? 0]]
  }));

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        valueInputOption: "USER_ENTERED",
        data
      })
    }
  );
}
