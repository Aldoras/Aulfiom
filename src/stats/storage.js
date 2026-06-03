const KEY = "gameStats";

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

function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export function defaultForType(type) {
  if (type === "checkbox") return false;
  if (type === "toggle" || type === "skill") return 0;
  return 0; // number
}

export function flattenStats(list) {
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
