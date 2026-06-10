const SAVE_FILENAME = "acliom_save.json";
const BACKUP_FILENAME = "aulfiom_save.json"; // for backward compatibility

/**
 * Search Google Drive for a save file. Checks for new name first, then old.
 * @param {string} accessToken
 * @returns {Promise<{id: string, name: string}|null>}
 */
export async function searchSaveFile(accessToken) {
  const query = `(name = '${SAVE_FILENAME}' or name = '${BACKUP_FILENAME}') and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to search Google Drive: ${response.statusText}`);
  }

  const data = await response.json();
  const files = data.files || [];
  
  if (files.length === 0) return null;
  
  // Prefer the new name file if multiple found
  const preferNew = files.find(f => f.name === SAVE_FILENAME);
  return preferNew || files[0];
}

/**
 * Download the contents of a save file by its file ID.
 * @param {string} accessToken
 * @param {string} fileId
 * @returns {Promise<any>}
 */
export async function downloadSaveFile(accessToken, fileId) {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download save file: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Create a new save file on Google Drive containing the stats.
 * @param {string} accessToken
 * @param {any} stats
 * @returns {Promise<string>} Created file ID
 */
export async function createSaveFile(accessToken, stats) {
  const metadata = {
    name: SAVE_FILENAME,
    mimeType: "application/json",
  };

  const boundary = "acliom_boundary_sep";
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const body =
    delimiter +
    "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
    JSON.stringify(metadata) +
    delimiter +
    "Content-Type: application/json\r\n\r\n" +
    JSON.stringify(stats) +
    closeDelimiter;

  const url = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": `multipart/related; boundary=${boundary}`,
    },
    body: body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create save file: ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  return data.id;
}

/**
 * Update the contents of an existing Google Drive file.
 * @param {string} accessToken
 * @param {string} fileId
 * @param {any} stats
 * @returns {Promise<void>}
 */
export async function updateSaveFile(accessToken, fileId, stats) {
  const url = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stats),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update save file: ${response.statusText} - ${errorText}`);
  }
}
