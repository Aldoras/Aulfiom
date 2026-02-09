import { loadStats, saveStats } from "./storage.js";

/**
 * Renders the full stats UI into `root` using the schema.
 * - Category accordion
 * - Flat stats rows (icon + name/desc + input)
 * - Group stats rendered as cards (e.g., drones with named items)
 */
export function renderStats(root, schema) {
  if (!root) return;

  const stats = loadStats(schema);
  root.innerHTML = "";

  const onSave = () => saveStats(stats);

  for (const category of schema) {
    const cat = document.createElement("div");
    cat.className = "category";

    const header = document.createElement("button");
    header.className = "category-header";
    header.type = "button";
    if (category.icon) {
      const img = document.createElement("img");
      img.className = "category-icon";
      img.alt = category.name ?? category.id ?? "Category";
      img.src = category.icon;
      img.onerror = () => (img.style.visibility = "hidden");
      header.appendChild(img);
    }
    const title = document.createElement("span");
    title.textContent = category.name;
    header.appendChild(title);

    const body = document.createElement("div");
    body.className = "category-body";

    header.onclick = () => body.classList.toggle("open");

    if (Array.isArray(category.tabs) && category.tabs.length > 0) {
      renderCategoryTabs(body, category.tabs, stats, onSave);
    } else {
      renderStatList(body, category.stats, stats, onSave);
    }

    cat.append(header, body);
    root.appendChild(cat);
  }

  // Ensure any defaults we filled in are persisted
  saveStats(stats);
}

function renderCategoryTabs(parent, tabs, stats, onSave) {
  const wrapper = document.createElement("div");
  wrapper.className = "category-tabs";

  const tabList = document.createElement("div");
  tabList.className = "category-tab-list";

  const panels = document.createElement("div");
  panels.className = "category-tab-panels";

  let activeId = null;

  tabs.forEach((tab, index) => {
    const tabId = String(tab.id ?? index);
    if (activeId == null) activeId = tabId;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "category-tab";
    btn.textContent = tab.name ?? tab.id ?? `Tab ${index + 1}`;
    btn.dataset.tab = tabId;

    const panel = document.createElement("div");
    panel.className = "category-tab-panel";
    panel.dataset.tab = tabId;

    if (tabId === activeId) {
      btn.classList.add("is-active");
      panel.classList.add("is-active");
    }

    btn.addEventListener("click", () => {
      activeId = tabId;
      for (const child of tabList.querySelectorAll(".category-tab")) {
        child.classList.toggle("is-active", child.dataset.tab === activeId);
      }
      for (const child of panels.querySelectorAll(".category-tab-panel")) {
        child.classList.toggle("is-active", child.dataset.tab === activeId);
      }
    });

    renderStatList(panel, tab.stats, stats, onSave);
    tabList.appendChild(btn);
    panels.appendChild(panel);
  });

  wrapper.append(tabList, panels);
  parent.appendChild(wrapper);
}

function renderStatList(parent, list, stats, onSave) {
  let cardGrid = null;

  for (const s of list ?? []) {
    if (s.type === "section") {
      renderSection(parent, s, stats, onSave);
      cardGrid = null;
      continue;
    }

    const isCardToggle =
      s.type === "toggle" && (s.layout === "card" || s.layout === "card-5");
    if (!isCardToggle) cardGrid = null;

    if (isCardToggle) {
      if (!cardGrid) {
        cardGrid = document.createElement("div");
        cardGrid.className = "stat-card-grid";
        parent.appendChild(cardGrid);
      }
      renderToggleCard(cardGrid, s, stats, onSave);
    } else if (s.type === "group") {
      renderGroupStat(parent, s, stats, onSave);
    } else {
      renderFlatStatRow(parent, s, stats, onSave);
    }
  }
}

function renderSection(parent, section, stats, onSave) {
  const wrapper = document.createElement("div");
  wrapper.className = "stat-section";

  if (section.name || section.desc) {
    const header = document.createElement("button");
    header.type = "button";
    header.className = "stat-section-header";
    header.innerHTML = `
      <div class="stat-section-title">${escapeHtml(section.name ?? "")}</div>
      ${section.desc ? `<div class="stat-section-desc">${escapeHtml(section.desc)}</div>` : ``}
    `;
    wrapper.appendChild(header);
  }

  const body = document.createElement("div");
  body.className = "stat-section-body";
  renderStatList(body, section.stats, stats, onSave);

  if (section.name || section.desc) {
    const header = wrapper.querySelector(".stat-section-header");
    header?.addEventListener("click", () => {
      body.classList.toggle("open");
      header.classList.toggle("is-open");
    });
  }

  wrapper.appendChild(body);
  parent.appendChild(wrapper);
}

/* ----------------------- Flat stat row ----------------------- */

function renderFlatStatRow(parent, stat, stats, onSave) {
  const row = document.createElement("div");
  row.className = "stat-row";

  const icon = document.createElement("img");
  icon.alt = stat.name ?? stat.key;
  icon.src = stat.icon ?? "";
  // If icon missing, avoid broken icon taking focus; you can remove this if you prefer the broken image indicator
  icon.onerror = () => {
    icon.style.visibility = "hidden";
  };

  const text = document.createElement("div");
  text.innerHTML = `
    <div class="stat-name">${escapeHtml(stat.name ?? stat.key)}</div>
    <div class="stat-desc">${escapeHtml(stat.desc ?? "")}</div>
  `;

  const input = createInputForType(stat.type, stat);
  setInputValue(input, stat.type, stats[stat.key], stat);

  const inputWrap = document.createElement("div");
  inputWrap.className = "stat-input-wrap";
  if (stat.type === "checkbox") inputWrap.classList.add("is-checkbox");

  const inputLine = document.createElement("div");
  inputLine.className = "stat-input-line";
  inputLine.appendChild(input);

  const isSlider = isSliderStat(stat);
  let sliderValue = null;
  if (isSlider) {
    sliderValue = document.createElement("span");
    sliderValue.className = "stat-slider-value";
    sliderValue.textContent = input.value;
    inputLine.appendChild(sliderValue);
  }

  const unitLabel = getUnitLabel(stat);
  if (unitLabel) {
    const unit = document.createElement("span");
    unit.className = "stat-unit";
    unit.textContent = unitLabel;
    inputLine.appendChild(unit);
  }

  inputWrap.appendChild(inputLine);

  const rangeLabel = getRangeLabel(stat);
  if (rangeLabel) {
    const range = document.createElement("div");
    range.className = "stat-range";
    range.textContent = rangeLabel;
    inputWrap.appendChild(range);
  }

  bindInput(input, stat.type, (val) => {
    stats[stat.key] = val;
    onSave();
  }, stat);

  if (isSlider && sliderValue) {
    input.addEventListener("input", () => {
      sliderValue.textContent = input.value;
    });
  }

  row.append(icon, text, inputWrap);
  parent.appendChild(row);
}

/* ----------------------- Toggle card ----------------------- */

function renderToggleCard(parent, stat, stats, onSave) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "stat-card";

  const artWrap = document.createElement("div");
  artWrap.className = "stat-card-art";

  const backingImg = document.createElement("img");
  backingImg.className = "stat-card-backing";
  backingImg.alt = (stat.name ?? stat.key) + " backing";

  const typeImg = document.createElement("img");
  typeImg.className = "stat-card-type";
  typeImg.alt = (stat.name ?? stat.key) + " type";

  // const name = document.createElement("div");
  // name.className = "stat-card-name";
  // name.textContent = stat.name ?? "";

  // const desc = document.createElement("div");
  // desc.className = "stat-card-desc";
  // desc.textContent = stat.desc ?? "";

  const status = document.createElement("div");
  status.className = "stat-card-status";

  const body = document.createElement("div");
  body.className = "stat-card-body";
  body.append(status);

  const setState = (value) => {
    const states = Number(stat.states ?? 2);
    const safe = Number.isFinite(Number(value)) ? Number(value) : 0;
    const current = ((safe % states) + states) % states;
    const backingSrc =
      (Array.isArray(stat.images) ? stat.images[current] : null) ?? stat.icon ?? "";
    backingImg.src = backingSrc;
    backingImg.onerror = () => (backingImg.style.visibility = "hidden");
    if (stat.typeImage) {
      typeImg.src = stat.typeImage;
      typeImg.onerror = () => (typeImg.style.visibility = "hidden");
      typeImg.style.visibility = "visible";
    } else {
      typeImg.style.visibility = "hidden";
    }
    status.textContent = getToggleLabel(current, stat, states);
    card.classList.toggle("is-locked", current === 0);
  };

  setState(stats[stat.key]);

  card.addEventListener("click", () => {
    const states = Number(stat.states ?? 2);
    const current = Number(stats[stat.key] ?? 0);
    const next = (current + 1) % states;
    stats[stat.key] = next;
    setState(next);
    onSave();
  });

  artWrap.append(backingImg, typeImg);
  card.append(artWrap, body);
  parent.appendChild(card);
}

/* ----------------------- Group stat (named items) ----------------------- */

function renderGroupStat(parent, group, stats, onSave) {
  const wrapper = document.createElement("div");
  wrapper.className = "group-wrapper";

  if (group.name || group.desc) {
    const title = document.createElement("div");
    title.className = "group-title";
    title.innerHTML = `
      <div class="stat-name">${escapeHtml(group.name ?? "")}</div>
      <div class="stat-desc">${escapeHtml(group.desc ?? "")}</div>
    `;
    wrapper.appendChild(title);
  }

  if (!stats[group.key] || typeof stats[group.key] !== "object") {
    stats[group.key] = {};
  }

  // ✅ New: "row" layout (perfect for drones)
  if (group.layout === "row") {
    const list = document.createElement("div");
    list.className = "group-row-list";

    for (const item of group.items ?? []) {
      if (!stats[group.key][item.id]) stats[group.key][item.id] = {};

      // ensure defaults exist
      for (const f of group.fields ?? []) {
        if (!(f.key in stats[group.key][item.id])) {
          stats[group.key][item.id][f.key] =
            f.defaultValue ?? f.default ?? defaultForType(f.type);
        }
      }

      const row = document.createElement("div");
      row.className = "group-row";

      // icon
      const icon = document.createElement("img");
      icon.className = "group-row-icon";
      icon.alt = item.label ?? item.id;
      icon.src = item.icon ?? "";
      icon.onerror = () => (icon.style.visibility = "hidden");

      // name + desc
      const text = document.createElement("div");
      text.className = "group-row-text";
      text.innerHTML = `
        <div class="group-row-name">${escapeHtml(item.label ?? item.id)}</div>
        ${item.desc ? `<div class="group-row-desc">${escapeHtml(item.desc)}</div>` : ``}
      `;

      // get fields by key (so order in schema doesn't matter)
      const getField = (k) => (group.fields ?? []).find((x) => x.key === k);

      const levelField = getField("level");
      const gradeField = getField("grade");
      const activeField = getField("active");
      const fueledField = getField("fueled");

      const level = document.createElement("input");
      level.type = "number";
      level.className = "group-row-num";
      level.value = stats[group.key][item.id].level ?? 0;
      level.oninput = () => {
        stats[group.key][item.id].level = Number(level.value);
        onSave();
      };
      level.title = levelField?.name ?? "Level";

      const grade = document.createElement("input");
      grade.type = "number";
      grade.className = "group-row-num";
      grade.value = stats[group.key][item.id].grade ?? 0;
      grade.oninput = () => {
        stats[group.key][item.id].grade = Number(grade.value);
        onSave();
      };
      grade.title = gradeField?.name ?? "Grade";

      const activeWrap = document.createElement("label");
      activeWrap.className = "group-row-check";
      const active = createInputForType(activeField?.type ?? "checkbox", activeField);
      setInputValue(active, activeField?.type ?? "checkbox", stats[group.key][item.id].active, activeField);
      bindInput(active, activeField?.type ?? "checkbox", (val) => {
        stats[group.key][item.id].active = val;
        onSave();
      }, activeField);
      activeWrap.append(active, document.createTextNode(activeField?.name ?? "Active"));

      const fueledWrap = document.createElement("label");
      fueledWrap.className = "group-row-check";
      const fueled = createInputForType(fueledField?.type ?? "checkbox", fueledField);
      setInputValue(fueled, fueledField?.type ?? "checkbox", stats[group.key][item.id].fueled, fueledField);
      bindInput(fueled, fueledField?.type ?? "checkbox", (val) => {
        stats[group.key][item.id].fueled = val;
        onSave();
      }, fueledField);
      fueledWrap.append(fueled, document.createTextNode(fueledField?.name ?? "Fueled"));

      row.append(icon, text, level, grade, activeWrap, fueledWrap);
      list.appendChild(row);
    }

    wrapper.appendChild(list);
    parent.appendChild(wrapper);
    return;
  }

  // Fallback: old "card grid" layout (keeps your generic groups working)
  const grid = document.createElement("div");
  grid.className = "group-grid";

  for (const item of group.items ?? []) {
    const card = document.createElement("div");
    card.className = "group-card";

    const cardHeader = document.createElement("div");
    cardHeader.className = "group-card-header";

    if (item.icon) {
      const img = document.createElement("img");
      img.className = "group-card-icon";
      img.alt = item.label ?? item.id;
      img.src = item.icon;
      img.onerror = () => (img.style.visibility = "hidden");
      cardHeader.appendChild(img);
    }

    const title = document.createElement("div");
    title.className = "group-card-title";
    title.textContent = item.label ?? item.id;

    cardHeader.appendChild(title);
    card.appendChild(cardHeader);

    if (!stats[group.key][item.id]) stats[group.key][item.id] = {};

    for (const field of group.fields ?? []) {
      if (!(field.key in stats[group.key][item.id])) {
        stats[group.key][item.id][field.key] =
          field.defaultValue ?? field.default ?? defaultForType(field.type);
      }

      const row = document.createElement("div");
      row.className = "group-field-row";

      const label = document.createElement("div");
      label.className = "group-field-label";
      label.textContent = field.name ?? field.key;

      const input = createInputForType(field.type, field);
      setInputValue(input, field.type, stats[group.key][item.id][field.key], field);

      bindInput(input, field.type, (val) => {
        stats[group.key][item.id][field.key] = val;
        onSave();
      }, field);

      row.append(label, input);
      card.appendChild(row);
    }

    grid.appendChild(card);
  }

  wrapper.appendChild(grid);
  parent.appendChild(wrapper);
}


/* ----------------------- Input helpers ----------------------- */

function createInputForType(type, meta) {
  if (type === "toggle") {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "toggle-btn";
    const states = Number(meta?.states ?? 2);
    btn.dataset.states = Number.isFinite(states) && states > 1 ? String(states) : "2";
    return btn;
  }

  const input = document.createElement("input");
  if (type === "checkbox") {
    input.type = "checkbox";
  } else {
    const wantsSlider = type === "range" || meta?.input === "slider";
    input.type = wantsSlider ? "range" : "number";
    const stepValue = meta?.step != null ? String(meta.step) : "";
    const unit = meta?.unit ?? meta?.numberType ?? meta?.format;
    const wantsDecimal = stepValue.includes(".") || unit === "decimal";
    input.inputMode = wantsDecimal ? "decimal" : "numeric";
    if (meta?.min != null) input.min = String(meta.min);
    if (meta?.max != null) input.max = String(meta.max);
    if (meta?.step != null) input.step = String(meta.step);
  }
  return input;
}

function setInputValue(input, type, value, meta) {
  if (type === "checkbox") {
    input.checked = !!value;
  } else if (type === "toggle") {
    const states = Number(input.dataset.states ?? 2);
    const safe = Number.isFinite(Number(value)) ? Number(value) : 0;
    const current = ((safe % states) + states) % states;
    input.dataset.value = String(current);
    input.textContent = getToggleLabel(current, meta, states);
    input.classList.toggle("is-on", current > 0);
  } else {
    input.value = Number.isFinite(Number(value)) ? String(value) : "0";
  }
}

function bindInput(input, type, onChangeValue, meta) {
  if (type === "checkbox") {
    input.addEventListener("change", () => onChangeValue(input.checked));
  } else if (type === "toggle") {
    input.addEventListener("click", () => {
      const states = Number(input.dataset.states ?? 2);
      const current = Number(input.dataset.value ?? 0);
      const next = (current + 1) % states;
      input.dataset.value = String(next);
      input.textContent = getToggleLabel(next, meta, states);
      input.classList.toggle("is-on", next > 0);
      onChangeValue(next);
    });
  } else {
    input.addEventListener("input", () => onChangeValue(Number(input.value)));
  }
}

/* ----------------------- tiny util ----------------------- */

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function defaultForType(type) {
  if (type === "checkbox") return false;
  if (type === "toggle") return 0;
  return 0; // number
}

function getToggleLabel(value, meta, states) {
  const labels = Array.isArray(meta?.labels) ? meta.labels : null;
  if (labels && labels[value] != null) return String(labels[value]);

  if (states === 2) return value ? "On" : "Off";
  if (states === 3) return ["Locked", "Unlocked", "Upgraded"][value] ?? `Stage ${value}`;
  if (states === 4) return ["Locked", "Unlocked", "Upgrade I", "Upgrade II"][value] ?? `Stage ${value}`;
  return `Stage ${value}`;
}

function getUnitLabel(meta) {
  if (!meta) return "";
  if (meta.unitLabel) return String(meta.unitLabel);
  const unit = meta.unit ?? meta.numberType ?? meta.format;
  if (unit === "percent") return "%";
  if (unit === "multiplier") return "x";
  if (unit === "decimal") return "";
  return "";
}

function getRangeLabel(meta) {
  if (!meta) return "";
  const hasMin = meta.min != null && meta.min !== "";
  const hasMax = meta.max != null && meta.max !== "";
  if (!hasMin && !hasMax) return "";
  if (hasMin && hasMax) return `${meta.min}-${meta.max}`;
  if (hasMin) return `>= ${meta.min}`;
  return `<= ${meta.max}`;
}

function isSliderStat(meta) {
  if (!meta) return false;
  return meta.type === "range" || meta.input === "slider";
}
