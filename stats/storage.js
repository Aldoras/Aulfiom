const KEY = "gameStats";

/**
 * Loads stats from localStorage and fills in missing defaults based on the schema.
 * Supports:
 * - normal stats: { key, type: "number"|"checkbox"|"toggle", default }
 * - group stats:  { type:"group", key, items:[{id}], fields:[{key,type,default}] }
 */
export function loadStats(schema) {
  const stored = safeParse(localStorage.getItem(KEY)) ?? {};
  const stats = {};

  for (const category of schema) {
    const lists = Array.isArray(category.tabs)
      ? category.tabs.map((tab) => tab.stats ?? [])
      : [category.stats ?? []];

    for (const list of lists) {
      for (const s of flattenStats(list)) {
      if (s.type === "group") {
        const storedGroup =
          stored[s.key] && typeof stored[s.key] === "object" && !Array.isArray(stored[s.key])
            ? stored[s.key]
            : {};

        stats[s.key] = {};

        for (const item of s.items ?? []) {
          const existingItem =
            storedGroup[item.id] && typeof storedGroup[item.id] === "object"
              ? storedGroup[item.id]
              : {};

          const obj = {};
          for (const f of s.fields ?? []) {
            obj[f.key] = existingItem[f.key] ?? f.defaultValue ?? f.default ?? defaultForType(f.type);
          }
          stats[s.key][item.id] = obj;
        }
      } else {
        const def = s.defaultValue ?? s.default ?? defaultForType(s.type);
        stats[s.key] = stored[s.key] ?? def;
      }
      }
    }
  }

  return stats;
}

export function saveStats(stats) {
  localStorage.setItem(KEY, JSON.stringify(stats));
}

/**
 * Optional helper: updates one field and saves.
 * Works for both flat and group stats.
 */
export function setStatValue(stats, path, value) {
  // path examples:
  //  - "strength"
  //  - "drones.bear.level"
  const parts = path.split(".");
  if (parts.length === 1) {
    stats[parts[0]] = value;
  } else if (parts.length === 3) {
    const [groupKey, itemId, fieldKey] = parts;
    if (!stats[groupKey]) stats[groupKey] = {};
    if (!stats[groupKey][itemId]) stats[groupKey][itemId] = {};
    stats[groupKey][itemId][fieldKey] = value;
  } else {
    // If you ever add deeper nesting, extend this.
    throw new Error(`Unsupported stat path: ${path}`);
  }
  saveStats(stats);
}

function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function defaultForType(type) {
  if (type === "checkbox") return false;
  if (type === "toggle") return 0;
  return 0; // number
}

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
