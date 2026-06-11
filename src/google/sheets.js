function flattenStats(list) {
  const result = [];
  for (const s of list ?? []) {
    if (s?.type === "section") {
      result.push(...flattenStats(s.stats ?? []));
    } else {
      result.push(s);
    }
  }
  return result;
}

function buildStatMetaMap(schema) {
  const map = new Map();
  for (const category of schema ?? []) {
    const lists = Array.isArray(category.tabs)
      ? category.tabs.map((tab) => tab.stats ?? [])
      : [category.stats ?? []];
    for (const list of lists) {
      for (const s of flattenStats(list)) {
        if (s?.type === "group") continue;
        if (s?.key) map.set(s.key, s);
      }
    }
  }
  return map;
}

function isPercentMeta(meta) {
  if (!meta) return false;
  const unit = meta.unit ?? meta.numberType ?? meta.format;
  return unit === "percent" || meta.unitLabel === "%";
}

export async function writeStatsToSheet(
  spreadsheetId,
  mappings,
  stats,
  accessToken,
  schema
) {
  const metaMap = schema ? buildStatMetaMap(schema) : null;
  const data = Object.entries(mappings).map(([key, mappingVal]) => {
    let range = "";
    let formatOverride = null;
    if (mappingVal && typeof mappingVal === "object") {
      range = mappingVal.range || "";
      formatOverride = mappingVal.format;
    } else {
      range = String(mappingVal);
    }

    const meta = metaMap?.get(key);
    let value = stats[key] ?? 0;

    const isPercent = formatOverride === "percent" || (!formatOverride && isPercentMeta(meta));

    if (isPercent) {
      value = Number(value) / 100;
    } else if (formatOverride === "number" || formatOverride === "double") {
      value = Number(value);
    } else if (formatOverride === "raw") {
      if (value === undefined || value === null) value = 0;
    } else {
      // Default auto format
      if (typeof value === "number") {
        // Keep as number
      } else if (!isNaN(Number(value))) {
        value = Number(value);
      }
    }

    return {
      range,
      values: [[value]]
    };
  });

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
