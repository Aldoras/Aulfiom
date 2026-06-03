import { statSchema } from "./schema.js";
import { flattenStats } from "./storage.js";

/**
 * Compares two stats objects (local and shared) against the schema and returns a list of differences.
 */
export function getStatsDiff(local, shared) {
  const diffs = [];

  for (const category of statSchema) {
    const lists = Array.isArray(category.tabs)
      ? category.tabs.map((tab) => tab.stats ?? [])
      : [category.stats ?? []];

    for (const list of lists) {
      for (const s of flattenStats(list)) {
        if (s.type === "group") {
          const groupKey = s.key;
          const localGroup = local[groupKey] ?? {};
          const sharedGroup = shared[groupKey] ?? {};

          for (const item of s.items ?? []) {
            const itemId = item.id;
            const itemLabel = item.label ?? itemId;
            const localItem = localGroup[itemId] ?? {};
            const sharedItem = sharedGroup[itemId] ?? {};

            for (const f of s.fields ?? []) {
              const fieldKey = f.key;
              const fieldName = f.name ?? fieldKey;
              const localVal = localItem[fieldKey] ?? f.defaultValue ?? f.default ?? 0;
              const sharedVal = sharedItem[fieldKey] ?? f.defaultValue ?? f.default ?? 0;

              if (localVal !== sharedVal) {
                diffs.push({
                  category: category.name,
                  name: `${itemLabel} (${fieldName})`,
                  local: formatValue(localVal, f.type),
                  shared: formatValue(sharedVal, f.type),
                  isUpgrade: isUpgrade(localVal, sharedVal, f.type)
                });
              }
            }
          }
        } else {
          const localVal = local[s.key] ?? s.defaultValue ?? s.default ?? 0;
          const sharedVal = shared[s.key] ?? s.defaultValue ?? s.default ?? 0;

          if (localVal !== sharedVal) {
            diffs.push({
              category: category.name,
              name: s.name ?? s.key,
              local: formatValue(localVal, s.type, s),
              shared: formatValue(sharedVal, s.type, s),
              isUpgrade: isUpgrade(localVal, sharedVal, s.type)
            });
          }
        }
      }
    }
  }

  return diffs;
}

function formatValue(val, type, meta = null) {
  if (type === "checkbox") {
    return val ? "Yes" : "No";
  }
  if (type === "toggle") {
    const states = meta?.states ?? 2;
    const labels = meta?.labels;
    if (labels && labels[val] != null) return String(labels[val]);
    if (states === 2) return val ? "Unlocked" : "Locked";
    return `Level ${val}`;
  }
  
  // Number/multiplier unit formatting
  const unit = meta?.unit ?? meta?.numberType ?? meta?.format;
  if (unit === "percent") return `${val}%`;
  if (unit === "multiplier") return `${val}x`;
  return String(val);
}

function isUpgrade(localVal, sharedVal, type) {
  if (type === "checkbox") {
    return !localVal && sharedVal; // false -> true is upgrade
  }
  // For number and toggles, larger is usually upgrade
  return Number(sharedVal) > Number(localVal);
}
