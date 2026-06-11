// Load default templates dynamically from individual files in the sheets/ directory
const modules = import.meta.glob("./sheets/*.js", { eager: true });
const defaultTemplates = [];

for (const path in modules) {
  const moduleExports = modules[path];
  for (const key in moduleExports) {
    const template = moduleExports[key];
    if (template && typeof template === "object" && template.id) {
      defaultTemplates.push(template);
    }
  }
}

const KEY = "linker_templates";

export function loadTemplates() {
  const custom = localStorage.getItem(KEY);
  if (custom) {
    try {
      const parsed = JSON.parse(custom);
      if (Array.isArray(parsed)) {
        // Merge custom templates with default templates.
        // Custom templates override defaults if they share the same ID.
        const merged = [...defaultTemplates];
        parsed.forEach((customTemp) => {
          const idx = merged.findIndex((t) => t.id === customTemp.id);
          if (idx !== -1) {
            merged[idx] = customTemp;
          } else {
            merged.push(customTemp);
          }
        });
        return merged;
      }
    } catch (e) {
      console.error("Failed to parse custom linker templates:", e);
    }
  }
  return defaultTemplates;
}

export function saveCustomTemplate(template) {
  const custom = localStorage.getItem(KEY);
  let list = [];
  if (custom) {
    try {
      const parsed = JSON.parse(custom);
      if (Array.isArray(parsed)) {
        list = parsed;
      }
    } catch (e) {
      console.error("Failed to parse custom linker templates on save:", e);
    }
  }
  
  const idx = list.findIndex((t) => t.id === template.id);
  if (idx !== -1) {
    list[idx] = template;
  } else {
    list.push(template);
  }
  
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function deleteCustomTemplate(templateId) {
  const custom = localStorage.getItem(KEY);
  if (custom) {
    try {
      const parsed = JSON.parse(custom);
      if (Array.isArray(parsed)) {
        const filtered = parsed.filter((t) => t.id !== templateId);
        localStorage.setItem(KEY, JSON.stringify(filtered));
      }
    } catch (e) {
      console.error("Failed to parse custom linker templates on delete:", e);
    }
  }
}

export function resetTemplatesToDefault() {
  localStorage.removeItem(KEY);
}
