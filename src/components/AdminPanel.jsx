import React, { useState, useMemo } from "react";
import { Plus, Trash2, Copy, Download, Check, Layers, ChevronDown, ChevronRight, Lock, ArrowUp, ArrowDown } from "lucide-react";
import { statSchema } from "../stats/schema.js";
import { gameStatsCategory } from "../stats/schema/gameStats.js";
import { formatCardName, getNewKeyFromTypeImage } from "../stats/schema/cardAssets.js";
import IconPickerModal from "./IconPickerModal.jsx";

// Clean variable name builder
function getVarName(catId) {
  const clean = (catId || "newCategory").replace(/[^a-zA-Z0-9]/g, "");
  return `${clean}Category`;
}

// Generate camelCase key from display name with type suffix
function generateKeyFromDisplayName(name, type) {
  if (!name) return "";
  const clean = name.replace(/[^a-zA-Z0-9\s]/g, "");
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 0) return type ? type.charAt(0).toUpperCase() + type.slice(1) : "";
  
  const camel = words
    .map((word, i) => {
      const lower = word.toLowerCase();
      if (i === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
  
  const suffix = type ? type.charAt(0).toUpperCase() + type.slice(1) : "";
  
  if (suffix && camel.toLowerCase().endsWith(suffix.toLowerCase())) {
    const base = camel.slice(0, -suffix.length);
    return `${base}${suffix}`;
  }
  return `${camel}${suffix}`;
}

export default function AdminPanel() {
  const [selectedCatId, setSelectedCatId] = useState(statSchema[0]?.id || "");
  const [category, setCategory] = useState(() => JSON.parse(JSON.stringify(statSchema[0] || {})));
  const [exportModalCode, setExportModalCode] = useState(null);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [collapsedTabs, setCollapsedTabs] = useState({});

  // Icon picker state
  const [iconPicker, setIconPicker] = useState({
    isOpen: false,
    title: "",
    onSelect: null
  });

  const openIconPicker = (title, onSelect) => {
    const scrollY = window.scrollY;
    setIconPicker({
      isOpen: true,
      title,
      onSelect: (path) => {
        onSelect(path);
        setIconPicker((prev) => ({ ...prev, isOpen: false }));
        setTimeout(() => {
          window.scrollTo({
            top: scrollY,
            behavior: "instant"
          });
        }, 0);
      }
    });
  };

  // Dropdown options
  const categoryOptions = useMemo(() => {
    return [
      ...statSchema.map((c) => ({ id: c.id, name: c.name })),
      { id: "gameStats", name: "📋 Game Stats Page" },
      { id: "new", name: "➕ Create New Category" }
    ];
  }, []);

  const handleSelectCategory = (catId) => {
    setSelectedCatId(catId);
    if (catId === "new") {
      setCategory({
        id: "newCategory",
        name: "New Category",
        icon: "icons/menus/Prestige.webp",
        stats: []
      });
    } else if (catId === "gameStats") {
      const saved = localStorage.getItem("gameStatsSchemaConfig");
      if (saved) {
        try {
          setCategory(JSON.parse(saved));
        } catch {
          setCategory(JSON.parse(JSON.stringify(gameStatsCategory)));
        }
      } else {
        setCategory(JSON.parse(JSON.stringify(gameStatsCategory)));
      }
    } else {
      const saved = localStorage.getItem(`schemaOverride_${catId}`);
      if (saved) {
        try {
          setCategory(JSON.parse(saved));
          return;
        } catch (e) {
          console.error(`Failed to parse override for ${catId}:`, e);
        }
      }
      const match = statSchema.find((c) => c.id === catId);
      if (match) {
        setCategory(JSON.parse(JSON.stringify(match)));
      }
    }
  };

  const handleSaveLiveSchema = () => {
    if (selectedCatId === "gameStats") {
      localStorage.setItem("gameStatsSchemaConfig", JSON.stringify(category));
    } else {
      localStorage.setItem(`schemaOverride_${selectedCatId}`, JSON.stringify(category));
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleResetToDefault = () => {
    const isGameStats = selectedCatId === "gameStats";
    const displayName = isGameStats ? "Game Stats" : (category.name || "category");
    if (window.confirm(`Are you sure you want to discard your custom changes and reset the ${displayName} schema to default?`)) {
      if (isGameStats) {
        localStorage.removeItem("gameStatsSchemaConfig");
        setCategory(JSON.parse(JSON.stringify(gameStatsCategory)));
      } else {
        localStorage.removeItem(`schemaOverride_${selectedCatId}`);
        const match = statSchema.find((c) => c.id === selectedCatId);
        if (match) {
          setCategory(JSON.parse(JSON.stringify(match)));
        }
      }
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  const handleMetadataChange = (field, val) => {
    setCategory((prev) => ({ ...prev, [field]: val }));
  };

  const handleAddTab = () => {
    setCategory((prev) => {
      const tabs = prev.tabs ? [...prev.tabs] : [];
      tabs.push({ id: `tab${tabs.length + 1}`, name: `Tab ${tabs.length + 1}`, stats: [] });
      const next = { ...prev, tabs };
      delete next.stats; // tabbed categories don't have top-level stats array
      return next;
    });
  };

  const handleRemoveTab = (index) => {
    const tabName = category.tabs?.[index]?.name || `Tab #${index + 1}`;
    if (!window.confirm(`Are you sure you want to delete the tab "${tabName}" and all of its stats?`)) {
      return;
    }
    setCategory((prev) => {
      const tabs = prev.tabs ? prev.tabs.filter((_, i) => i !== index) : [];
      const next = { ...prev, tabs };
      if (tabs.length === 0) {
        delete next.tabs;
        next.stats = [];
      }
      return next;
    });
  };

  const handleTabChange = (index, field, val) => {
    setCategory((prev) => {
      const tabs = prev.tabs ? [...prev.tabs] : [];
      tabs[index] = { ...tabs[index], [field]: val };
      return { ...prev, tabs };
    });
  };

  const handleMoveTab = (index, direction) => {
    setCategory((prev) => {
      if (!prev.tabs) return prev;
      const tabs = [...prev.tabs];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      
      // Swap elements if within bounds
      if (targetIndex >= 0 && targetIndex < tabs.length) {
        const temp = tabs[index];
        tabs[index] = tabs[targetIndex];
        tabs[targetIndex] = temp;
      }
      return { ...prev, tabs };
    });
  };

  // Stat item creators
  const createDefaultStat = (type) => {
    const key = `newField_${Date.now().toString().slice(-4)}`;
    if (type === "skill") {
      return {
        key: `${key}Skill`,
        name: "New Skill Node",
        type: "skill",
        typeImage: "icons/skill_tree/Lucky_Strikes.webp",
        default: 0,
        states: 2,
        x: 50,
        y: 50,
        prereqs: [],
        hasCrystals: false
      };
    }
    if (type === "number") {
      return { key, name: "New Slider Stat", type: "number", default: 0, min: 0, max: 100, step: 1, input: "slider" };
    }
    if (type === "checkbox") {
      return { key, name: "New Checkbox", type: "checkbox", default: false };
    }
    if (type === "toggle") {
      return category.id === "cards"
        ? { key, typeImage: "" }
        : { key, name: "New Toggle Card", type: "toggle", layout: "card-5", states: 5, default: 0, labels: ["Locked", "Normal", "Gilded", "Polychrome", "Infernal"], typeImage: "" };
    }
    if (type === "group") {
      return {
        key,
        name: "New Group",
        type: "group",
        desc: "Configure list items",
        layout: "row",
        items: [{ id: "item1", label: "Item 1", icon: "" }],
        fields: [{ key: "level", name: "Level", type: "number", default: 0 }]
      };
    }
    if (type === "drone") {
      return {
        key,
        name: "New Drone",
        type: "drone",
        icon: "icons/drones/Drone_Bear.png",
        default: { level: 0, grade: 0, active: false, fueled: false }
      };
    }
    if (type === "section") {
      return { type: "section", name: "New Section", stats: [] };
    }
    return { key, name: "Stat Name", type: "number", default: 0 };
  };

  // Add stat to list (either category.stats or tab.stats)
  const handleAddStat = (tabIndex = null, type = "number") => {
    setCategory((prev) => {
      const newItem = createDefaultStat(type);
      if (tabIndex !== null && prev.tabs) {
        const tabs = [...prev.tabs];
        const stats = tabs[tabIndex].stats ? [...tabs[tabIndex].stats] : [];
        stats.push(newItem);
        tabs[tabIndex] = { ...tabs[tabIndex], stats };
        return { ...prev, tabs };
      } else {
        const stats = prev.stats ? [...prev.stats] : [];
        stats.push(newItem);
        return { ...prev, stats };
      }
    });
  };

  const handleRemoveStat = (statIndex, tabIndex = null) => {
    const statsList = tabIndex !== null && category.tabs ? category.tabs[tabIndex].stats : category.stats;
    const statName = statsList?.[statIndex]?.name || statsList?.[statIndex]?.key || `Item #${statIndex + 1}`;
    if (!window.confirm(`Are you sure you want to delete the item "${statName}"?`)) {
      return;
    }

    setCategory((prev) => {
      if (tabIndex !== null && prev.tabs) {
        const tabs = [...prev.tabs];
        tabs[tabIndex] = {
          ...tabs[tabIndex],
          stats: tabs[tabIndex].stats.filter((_, i) => i !== statIndex)
        };
        return { ...prev, tabs };
      } else {
        return {
          ...prev,
          stats: prev.stats.filter((_, i) => i !== statIndex)
        };
      }
    });
  };

  const handleStatChange = (statIndex, field, val, tabIndex = null) => {
    setCategory((prev) => {
      if (tabIndex !== null && prev.tabs) {
        const tabs = [...prev.tabs];
        const stats = [...tabs[tabIndex].stats];
        stats[statIndex] = { ...stats[statIndex], [field]: val };
        tabs[tabIndex] = { ...tabs[tabIndex], stats };
        return { ...prev, tabs };
      } else {
        const stats = [...prev.stats];
        stats[statIndex] = { ...stats[statIndex], [field]: val };
        return { ...prev, stats };
      }
    });
  };

  const handleDuplicateStat = (statIndex, tabIndex = null) => {
    setCategory((prev) => {
      let statsList;
      if (tabIndex !== null && prev.tabs) {
        statsList = prev.tabs[tabIndex].stats;
      } else {
        statsList = prev.stats;
      }
      if (!statsList || !statsList[statIndex]) return prev;

      const original = statsList[statIndex];
      // Deep copy the original stat
      const copy = JSON.parse(JSON.stringify(original));
      
      // Append copy suffix to key and name if they exist
      if (copy.key) {
        const baseKey = copy.key.replace(/_copy(_\d+)?$/, "");
        copy.key = `${baseKey}_copy_${Date.now().toString().slice(-4)}`;
      }
      if (copy.name) {
        copy.name = `${copy.name} (Copy)`;
      }

      // Insert the copy right after the duplicated element
      const updatedStatsList = [...statsList];
      updatedStatsList.splice(statIndex + 1, 0, copy);

      if (tabIndex !== null && prev.tabs) {
        const tabs = [...prev.tabs];
        tabs[tabIndex] = { ...tabs[tabIndex], stats: updatedStatsList };
        return { ...prev, tabs };
      } else {
        return { ...prev, stats: updatedStatsList };
      }
    });
  };

  const handleMoveStatToTab = (statIndex, sourceTabIndex, targetTabId) => {
    setCategory((prev) => {
      if (!prev.tabs) return prev;
      
      const tabs = [...prev.tabs];
      const sourceTab = tabs[sourceTabIndex];
      if (!sourceTab || !sourceTab.stats || !sourceTab.stats[statIndex]) return prev;

      // Extract the stat
      const statToMove = sourceTab.stats[statIndex];
      const updatedSourceStats = sourceTab.stats.filter((_, i) => i !== statIndex);
      tabs[sourceTabIndex] = { ...sourceTab, stats: updatedSourceStats };

      // Add to target tab
      const targetTabIndex = tabs.findIndex(t => t.id === targetTabId);
      if (targetTabIndex !== -1) {
        const targetTab = tabs[targetTabIndex];
        const updatedTargetStats = targetTab.stats ? [...targetTab.stats] : [];
        updatedTargetStats.push(statToMove);
        tabs[targetTabIndex] = { ...targetTab, stats: updatedTargetStats };
      }

      return { ...prev, tabs };
    });
  };

  const handleReorderStat = (statIndex, direction, tabIndex = null) => {
    setCategory((prev) => {
      let statsList;
      if (tabIndex !== null && prev.tabs) {
        statsList = prev.tabs[tabIndex].stats;
      } else {
        statsList = prev.stats;
      }
      if (!statsList) return prev;

      const targetIndex = direction === "up" ? statIndex - 1 : statIndex + 1;
      if (targetIndex < 0 || targetIndex >= statsList.length) return prev;

      const updatedStatsList = [...statsList];
      const temp = updatedStatsList[statIndex];
      updatedStatsList[statIndex] = updatedStatsList[targetIndex];
      updatedStatsList[targetIndex] = temp;

      if (tabIndex !== null && prev.tabs) {
        const tabs = [...prev.tabs];
        tabs[tabIndex] = { ...tabs[tabIndex], stats: updatedStatsList };
        return { ...prev, tabs };
      } else {
        return { ...prev, stats: updatedStatsList };
      }
    });
  };

  // Serialize to code
  const handleExport = () => {
    const varName = getVarName(category.id);
    const code = `// Automatically generated schema configuration for ACLIOM\nexport const ${varName} = ${JSON.stringify(
      category,
      null,
      2
    )};\n`;
    setExportModalCode({
      filename: `${category.id || "newCategory"}.js`,
      code
    });
  };

  const handleCopyCode = () => {
    if (!exportModalCode) return;
    navigator.clipboard.writeText(exportModalCode.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    if (!exportModalCode) return;
    const blob = new Blob([exportModalCode.code], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = exportModalCode.filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Layers className="w-8 h-8 text-indigo-400" />
          <span>Developer Schema Sculptor</span>
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Visually edit existing categories or create new ones, then download the code file to replace in the project.
        </p>
      </div>

      {/* Select Category */}
      <div className="p-4 rounded-xl border border-white/5 bg-gray-900/40 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Category:</span>
          <select
            value={selectedCatId}
            onChange={(e) => handleSelectCategory(e.target.value)}
            className="bg-gray-950 border border-white/10 hover:border-white/20 text-sm text-white px-3 py-1.5 rounded-lg outline-none cursor-pointer"
          >
            {categoryOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          {selectedCatId !== "new" && (
            <>
              <button
                onClick={handleSaveLiveSchema}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{savedSuccess ? "Saved Live!" : "Save Live Schema"}</span>
              </button>
              <button
                onClick={handleResetToDefault}
                className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                title="Discard custom overrides and reset to defaults"
              >
                <Trash2 className="w-4 h-4" />
                <span>Reset to Default</span>
              </button>
            </>
          )}

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Export Category File</span>
          </button>
        </div>
      </div>

      {/* Metadata Editor */}
      <div className="p-5 rounded-2xl border border-white/5 bg-gray-900/20 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">Category Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400">Category ID (File name)</label>
            <input
              type="text"
              value={category.id || ""}
              onChange={(e) => handleMetadataChange("id", e.target.value)}
              placeholder="e.g. prestige"
              className="w-full bg-gray-950/60 border border-white/10 text-xs text-white p-2 rounded-lg outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400">Display Name</label>
            <input
              type="text"
              value={category.name || ""}
              onChange={(e) => handleMetadataChange("name", e.target.value)}
              placeholder="e.g. Prestige"
              className="w-full bg-gray-950/60 border border-white/10 text-xs text-white p-2 rounded-lg outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400">Icon Path</label>
            <div className="flex gap-2 items-center">
              {category.icon && (
                <div className="w-8 h-8 rounded-lg bg-gray-950 flex items-center justify-center p-1 border border-white/10 shrink-0">
                  <img src={`${import.meta.env.BASE_URL}${category.icon}`} className="max-w-full max-h-full object-contain filter drop-shadow" alt="" />
                </div>
              )}
              <input
                type="text"
                value={category.icon || ""}
                onChange={(e) => handleMetadataChange("icon", e.target.value)}
                placeholder="e.g. icons/menus/Prestige.webp"
                className="flex-1 bg-gray-950/60 border border-white/10 text-xs text-white p-2 rounded-lg outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => openIconPicker("Select Category Icon", (path) => handleMetadataChange("icon", path))}
                className="px-3.5 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/20 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-sm"
              >
                Browse
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs list (if Prestige or Construct) */}
      <div className="p-5 rounded-2xl border border-white/5 bg-gray-900/20 space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">Tabs Structure</h3>
          <div className="flex items-center gap-2">
            {category.tabs && category.tabs.length > 0 && (
              <button
                onClick={() => {
                  const allCollapsed = category.tabs.every(t => collapsedTabs[t.id || t.name]);
                  const nextState = {};
                  category.tabs.forEach(t => {
                    nextState[t.id || t.name] = !allCollapsed;
                  });
                  setCollapsedTabs(nextState);
                }}
                className="px-3 py-1 bg-white/5 hover:bg-white/10 text-xs font-semibold border border-white/10 rounded-lg transition-colors text-indigo-300 cursor-pointer"
              >
                {category.tabs.every(t => collapsedTabs[t.id || t.name]) ? "Expand All" : "Collapse All"}
              </button>
            )}
            <button
              onClick={handleAddTab}
              className="flex items-center gap-1 px-3 py-1 bg-white/5 hover:bg-white/10 text-xs font-semibold border border-white/10 rounded-lg transition-colors text-indigo-300 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Tab</span>
            </button>
          </div>
        </div>

        {category.tabs && category.tabs.length > 0 ? (
          <div className="space-y-3">
            {category.tabs.map((tab, idx) => {
              const tabKey = tab.id || tab.name || `tab-${idx}`;
              const isCollapsed = !!collapsedTabs[tabKey];
              return (
                <div key={idx} className="p-3 bg-gray-950/50 border border-white/5 rounded-xl space-y-3">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCollapsedTabs(prev => ({ ...prev, [tabKey]: !prev[tabKey] }))}
                        className="p-1 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
                        title={isCollapsed ? "Expand Tab" : "Collapse Tab"}
                      >
                        {isCollapsed ? (
                          <ChevronRight className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <span className="text-xs font-bold text-gray-500">Tab #{idx + 1}</span>
                      <input
                        type="text"
                        value={tab.name || ""}
                        onChange={(e) => handleTabChange(idx, "name", e.target.value)}
                        placeholder="Tab Name"
                        className="bg-transparent border-b border-white/10 text-xs font-bold text-white focus:border-indigo-500 outline-none px-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-500">ID:</span>
                      <input
                        type="text"
                        value={tab.id || ""}
                        onChange={(e) => handleTabChange(idx, "id", e.target.value)}
                        placeholder="tab_id"
                        className="bg-transparent border-b border-white/10 text-[10px] text-gray-300 focus:border-indigo-500 outline-none px-1 w-20"
                      />
                      <button
                        disabled={idx === 0}
                        onClick={() => handleMoveTab(idx, "up")}
                        className="p-1 rounded text-gray-500 hover:text-indigo-400 hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                        title="Move Tab Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        disabled={idx === category.tabs.length - 1}
                        onClick={() => handleMoveTab(idx, "down")}
                        className="p-1 rounded text-gray-500 hover:text-indigo-400 hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                        title="Move Tab Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleRemoveTab(idx)}
                        className="p-1 rounded text-gray-500 hover:text-rose-400 hover:bg-white/5 transition-all cursor-pointer"
                        title="Delete Tab"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Tab Stats list */}
                  {!isCollapsed && (
                    <div className="pl-4 border-l border-white/10 space-y-2">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Tab Items:</div>
                      <StatEditorList
                        categoryId={category.id}
                        list={tab.stats || []}
                        onStatChange={(sIdx, f, v) => handleStatChange(sIdx, f, v, idx)}
                        onRemoveStat={(sIdx) => handleRemoveStat(sIdx, idx)}
                        onDuplicateStat={(sIdx) => handleDuplicateStat(sIdx, idx)}
                        onReorderStat={(sIdx, direction) => handleReorderStat(sIdx, direction, idx)}
                        onMoveStat={(sIdx, targetTabId) => handleMoveStatToTab(sIdx, idx, targetTabId)}
                        availableTabs={category.tabs.map(t => ({ id: t.id, name: t.name }))}
                        currentTabId={tab.id}
                        openIconPicker={openIconPicker}
                      />
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => handleAddStat(idx, "number")}
                          className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] font-semibold text-gray-300 border border-white/5 cursor-pointer"
                        >
                          + Slider / Number
                        </button>
                        <button
                          onClick={() => handleAddStat(idx, "toggle")}
                          className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] font-semibold text-gray-300 border border-white/5 cursor-pointer"
                        >
                          + Toggle Card
                        </button>
                        <button
                          onClick={() => handleAddStat(idx, "checkbox")}
                          className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] font-semibold text-gray-300 border border-white/5 cursor-pointer"
                        >
                          + Checkbox
                        </button>
                        <button
                          onClick={() => handleAddStat(idx, "section")}
                          className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] font-semibold text-gray-300 border border-white/5 cursor-pointer"
                        >
                          + Section
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <div className="text-xs text-gray-500 pb-2">No tabs defined. Adding parameters directly to Category stats.</div>
            <StatEditorList
              categoryId={category.id}
              list={category.stats || []}
              onStatChange={(sIdx, f, v) => handleStatChange(sIdx, f, v)}
              onRemoveStat={(sIdx) => handleRemoveStat(sIdx)}
              onDuplicateStat={(sIdx) => handleDuplicateStat(sIdx)}
              onReorderStat={(sIdx, direction) => handleReorderStat(sIdx, direction)}
              openIconPicker={openIconPicker}
            />
            <div className="flex items-center gap-2 pt-3 flex-wrap">
              {category.id === "skillTree" ? (
                <button
                  onClick={() => handleAddStat(null, "skill")}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill Node</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleAddStat(null, "number")}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-gray-300 border border-white/5 cursor-pointer"
                  >
                    + Add Slider / Number
                  </button>
                  <button
                    onClick={() => handleAddStat(null, "toggle")}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-gray-300 border border-white/5 cursor-pointer"
                  >
                    + Add Toggle Card
                  </button>
                  <button
                    onClick={() => handleAddStat(null, "checkbox")}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-gray-300 border border-white/5 cursor-pointer"
                  >
                    + Add Checkbox
                  </button>
                  <button
                    onClick={() => handleAddStat(null, "drone")}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-gray-300 border border-white/5 cursor-pointer"
                  >
                    + Add Drone
                  </button>
                  <button
                    onClick={() => handleAddStat(null, "group")}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-gray-300 border border-white/5 cursor-pointer"
                  >
                    + Add Group (Drones)
                  </button>
                  <button
                    onClick={() => handleAddStat(null, "section")}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-gray-300 border border-white/5 cursor-pointer"
                  >
                    + Add Section (Accordion)
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Export modal overlay */}
      {exportModalCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl glass-panel pulse-glow-indigo animate-slide-up flex flex-col max-h-[85vh]">
            <div className="p-5 border-b border-white/10 bg-indigo-950/20 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">Export Schema File</h3>
                <p className="text-xs text-gray-400 mt-0.5">Filename: src/stats/schema/{exportModalCode.filename}</p>
              </div>
              <button
                onClick={() => setExportModalCode(null)}
                className="text-gray-400 hover:text-white font-bold text-sm px-2 py-1 bg-white/5 rounded-lg border border-white/5"
              >
                Close
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1 font-mono text-xs text-gray-300 bg-gray-950/90 whitespace-pre-wrap select-all">
              {exportModalCode.code}
            </div>

            <div className="p-5 border-t border-white/10 bg-gray-900/50 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleCopyCode}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-white/10 hover:bg-white/5 text-xs font-bold rounded-xl text-white transition-all"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copied!" : "Copy Code"}</span>
                </button>
                <button
                  onClick={handleDownloadFile}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold rounded-xl text-white transition-all shadow-md shadow-indigo-600/10"
                >
                  <Download className="w-4 h-4" />
                  <span>Download file</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Icon Picker modal overlay */}
      <IconPickerModal
        isOpen={iconPicker.isOpen}
        onClose={() => setIconPicker((prev) => ({ ...prev, isOpen: false }))}
        onSelect={iconPicker.onSelect}
        title={iconPicker.title}
      />
    </div>
  );
}

/* ----------------------- Stats Editor List ----------------------- */
function StatEditorList({ categoryId, list, onStatChange, onRemoveStat, onDuplicateStat, onReorderStat, onMoveStat, availableTabs, currentTabId, openIconPicker }) {
  if (list.length === 0) {
    return <div className="text-[10px] text-gray-500 italic py-1">No items. Click add buttons below to populate.</div>;
  }

  return (
    <div className="space-y-2">
      {list.map((stat, idx) => (
        <StatEditorItem
          key={idx}
          index={idx}
          stat={stat}
          categoryId={categoryId}
          onChange={(f, v) => onStatChange(idx, f, v)}
          onRemove={() => onRemoveStat(idx)}
          onDuplicate={() => onDuplicateStat && onDuplicateStat(idx)}
          onReorder={(direction) => onReorderStat && onReorderStat(idx, direction)}
          isFirst={idx === 0}
          isLast={idx === list.length - 1}
          onMoveToTab={(targetTabId) => onMoveStat && onMoveStat(idx, targetTabId)}
          availableTabs={availableTabs}
          currentTabId={currentTabId}
          openIconPicker={openIconPicker}
          allItems={list}
        />
      ))}
    </div>
  );
}

/* ----------------------- Individual Stat Editor Card ----------------------- */
function StatEditorItem({ stat, index, onChange, onRemove, onDuplicate, onReorder, isFirst, isLast, onMoveToTab, availableTabs, currentTabId, openIconPicker, allItems, categoryId }) {
  // Sections are expanded by default for discoverability
  const [isExpanded, setIsExpanded] = useState(stat.type === "section");

  const isGroup = stat.type === "group";
  const isSection = stat.type === "section";

  const handleSubStatRemove = (subIdx) => {
    const subList = stat.stats || [];
    const subName = subList[subIdx]?.name || subList[subIdx]?.key || `Sub-item #${subIdx + 1}`;
    if (window.confirm(`Are you sure you want to delete the sub-item "${subName}" from section "${stat.name || 'Unnamed'}"?`)) {
      const updatedSubStats = subList.filter((_, i) => i !== subIdx);
      onChange("stats", updatedSubStats);
    }
  };

  return (
    <div className="border border-white/5 rounded-xl bg-gray-900/30 overflow-hidden">
      {/* Summary Line */}
      <div className="flex items-center justify-between p-2.5 bg-white/5 hover:bg-white/10 transition-colors">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-left flex-1 min-w-0 text-xs text-white"
        >
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
          <span className="font-bold text-gray-500 truncate w-14 uppercase">#{index + 1} ({categoryId === "cards" && !isSection ? "toggle" : (stat.type || "number")})</span>
          <span className="font-semibold text-gray-200 truncate">
            {categoryId === "cards" && !isSection
              ? formatCardName(stat.key, stat.typeImage)
              : (stat.name || stat.key || "Unnamed item/section")}
          </span>
          <span className="text-[10px] text-gray-500 font-mono font-medium truncate opacity-60">
            {stat.key ? `[key: ${stat.key}]` : ""}
            {isSection ? `[items: ${stat.stats?.length || 0}]` : ""}
          </span>
        </button>

        <div className="flex items-center gap-1">
          <button
            disabled={isFirst}
            onClick={() => onReorder("up")}
            className="p-1 rounded hover:bg-white/5 text-gray-500 hover:text-indigo-400 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
            title="Move Up"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            disabled={isLast}
            onClick={() => onReorder("down")}
            className="p-1 rounded hover:bg-white/5 text-gray-500 hover:text-indigo-400 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
            title="Move Down"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDuplicate}
            className="p-1 rounded hover:bg-white/5 text-gray-500 hover:text-indigo-400 transition-all cursor-pointer"
            title="Duplicate Row"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRemove}
            className="p-1 rounded hover:bg-white/5 text-gray-500 hover:text-rose-400 transition-all cursor-pointer"
            title="Delete Row"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expanded Editor Form */}
      {isExpanded && (
        <div className="p-3 bg-gray-950/20 border-t border-white/5 space-y-3 text-xs">
          {categoryId === "cards" && !isSection ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Type Image Overlay */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Type Image Overlay</label>
                <div className="flex gap-1.5 items-center">
                  {stat.typeImage && (
                    <div className="w-7 h-7 rounded bg-gray-950 flex items-center justify-center p-0.5 border border-white/10 shrink-0">
                      <img src={`${import.meta.env.BASE_URL}${stat.typeImage}`} className="max-w-full max-h-full object-contain filter drop-shadow" alt="" />
                    </div>
                  )}
                  <input
                    type="text"
                    value={stat.typeImage || ""}
                    onChange={(e) => onChange("typeImage", e.target.value)}
                    placeholder="e.g. icons/ores/Tin_Ore.png"
                    className="flex-1 bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500 min-w-0"
                  />
                  <button
                    type="button"
                    onClick={() => openIconPicker(`Select Overlay for Card`, (path) => onChange("typeImage", path))}
                    className="px-2 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold rounded transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-sm"
                  >
                    Browse
                  </button>
                </div>
              </div>

              {/* Field Key */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase block">Field Key</label>
                <div className="flex gap-1.5 items-center">
                  <input
                    type="text"
                    value={stat.key || ""}
                    onChange={(e) => onChange("key", e.target.value)}
                    placeholder="e.g. tinOre"
                    className="flex-1 bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500 min-w-0"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newKey = getNewKeyFromTypeImage(stat.typeImage);
                      if (newKey) onChange("key", newKey);
                    }}
                    className="px-2.5 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold rounded transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-sm"
                    title="Generate key from image path"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {/* Stat Type Selector dropdown */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Stat Type</label>
              <select
                value={stat.type || "number"}
                onChange={(e) => onChange("type", e.target.value)}
                className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none cursor-pointer focus:border-indigo-500 font-semibold"
              >
                <option value="number">Number</option>
                <option value="chance">Chance (%)</option>
                <option value="multi">Multiplier (x)</option>
                <option value="cap">Cap / Capacity</option>
                <option value="reduction">Reduction (-%)</option>
                <option value="checkbox">Checkbox</option>
                <option value="toggle">Toggle Card</option>
                <option value="drone">Drone</option>
                <option value="group">Group (Drone Bay)</option>
                <option value="section">Section (Accordion)</option>
                <option value="skill">Skill Tree Node</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">{isSection ? "Section Name" : "Display Name"}</label>
              <input
                type="text"
                value={stat.name || ""}
                onChange={(e) => onChange("name", e.target.value)}
                placeholder={isSection ? "e.g. Ores Cards" : "e.g. Tin Ore"}
                className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
              />
            </div>

            {!isSection && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase block">Field Key</label>
                <div className="flex gap-1.5 items-center">
                  <input
                    type="text"
                    value={stat.key || ""}
                    onChange={(e) => onChange("key", e.target.value)}
                    placeholder={categoryId === "cards" ? "e.g. tinOre" : "e.g. tin_ore_card"}
                    className="flex-1 bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500 min-w-0"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newKey = generateKeyFromDisplayName(stat.name, stat.type);
                      if (newKey) onChange("key", newKey);
                    }}
                    className="px-2.5 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold rounded transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-sm"
                    title="Generate key from display name"
                  >
                    Generate
                  </button>
                </div>
              </div>
            )}

            {/* Move to Tab Option */}
            {availableTabs && availableTabs.length > 1 && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                  <Layers className="w-3 h-3 text-indigo-400" />
                  <span>Move to Tab</span>
                </label>
                <select
                  value={currentTabId || ""}
                  onChange={(e) => onMoveToTab(e.target.value)}
                  className="w-full bg-gray-950 border border-indigo-500/20 hover:border-indigo-500/40 text-xs text-indigo-300 px-2 py-1 rounded outline-none cursor-pointer focus:border-indigo-500 font-semibold transition-colors"
                >
                  {availableTabs.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} {t.id === currentTabId ? "(Current)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {!isSection && stat.type !== "skill" && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Icon Link</label>
                <div className="flex gap-1.5 items-center">
                  {stat.icon && (
                    <div className="w-7 h-7 rounded bg-gray-950 flex items-center justify-center p-0.5 border border-white/10 shrink-0">
                      <img src={`${import.meta.env.BASE_URL}${stat.icon}`} className="max-w-full max-h-full object-contain filter drop-shadow" alt="" />
                    </div>
                  )}
                  <input
                    type="text"
                    value={stat.icon || ""}
                    onChange={(e) => onChange("icon", e.target.value)}
                    placeholder="icons/..."
                    className="flex-1 bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500 min-w-0"
                  />
                  <button
                    type="button"
                    onClick={() => openIconPicker(`Select Icon for ${stat.name || 'Stat'}`, (path) => onChange("icon", path))}
                    className="px-2 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold rounded transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-sm"
                  >
                    Browse
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Description</label>
                <input
                  type="text"
                  value={stat.desc || ""}
                  onChange={(e) => onChange("desc", e.target.value)}
                  placeholder="Stat details and multipliers"
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Layout Style</label>
                <input
                  type="text"
                  value={stat.layout || ""}
                  onChange={(e) => onChange("layout", e.target.value)}
                  placeholder="card, card-5, row, or blank"
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Suffix</label>
                <input
                  type="text"
                  value={stat.suffix || ""}
                  onChange={(e) => onChange("suffix", e.target.value)}
                  placeholder="e.g. /s, s, etc."
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {/* Conditional: Section (Recursive list builder) */}
          {isSection && (
            <div className="pl-4 border-l-2 border-indigo-500/30 space-y-3 mt-1">
              <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                Section Sub-Items ({stat.stats?.length || 0} items)
              </div>
              
              <StatEditorList
                categoryId={categoryId}
                list={stat.stats || []}
                onStatChange={(subIdx, f, v) => {
                  const updatedSubStats = [...(stat.stats || [])];
                  updatedSubStats[subIdx] = { ...updatedSubStats[subIdx], [f]: v };
                  onChange("stats", updatedSubStats);
                }}
                onRemoveStat={handleSubStatRemove}
                onDuplicateStat={(subIdx) => {
                  const subList = stat.stats || [];
                  if (!subList[subIdx]) return;
                  const original = subList[subIdx];
                  const copy = JSON.parse(JSON.stringify(original));
                  if (copy.key) {
                    const baseKey = copy.key.replace(/_copy(_\d+)?$/, "");
                    copy.key = `${baseKey}_copy_${Date.now().toString().slice(-4)}`;
                  }
                  if (copy.name) {
                    copy.name = `${copy.name} (Copy)`;
                  }
                  const updatedSubStats = [...subList];
                  updatedSubStats.splice(subIdx + 1, 0, copy);
                  onChange("stats", updatedSubStats);
                }}
                onReorderStat={(subIdx, direction) => {
                  const subList = stat.stats || [];
                  const targetIndex = direction === "up" ? subIdx - 1 : subIdx + 1;
                  if (targetIndex < 0 || targetIndex >= subList.length) return;
                  const updatedSubStats = [...subList];
                  const temp = updatedSubStats[subIdx];
                  updatedSubStats[subIdx] = updatedSubStats[targetIndex];
                  updatedSubStats[targetIndex] = temp;
                  onChange("stats", updatedSubStats);
                }}
                openIconPicker={openIconPicker}
              />
              
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    const key = `newCard_${Date.now().toString().slice(-4)}`;
                    const newItem = categoryId === "cards"
                      ? { key, typeImage: "" }
                      : { key, type: "toggle", layout: "card-5", states: 5, default: 0, labels: ["Locked", "Normal", "Gilded", "Polychrome", "Infernal"], typeImage: "" };
                    const updated = [...(stat.stats || []), newItem];
                    onChange("stats", updated);
                  }}
                  className="px-2.5 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-[9px] font-bold text-indigo-300 border border-indigo-500/20 rounded-lg transition-all"
                >
                  + Add Card to Section
                </button>
                <button
                  onClick={() => {
                    const key = `newField_${Date.now().toString().slice(-4)}`;
                    const newItem = { key, name: "New Stat", type: "number", default: 0, min: 0, max: 100, step: 1 };
                    const updated = [...(stat.stats || []), newItem];
                    onChange("stats", updated);
                  }}
                  className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-[9px] font-bold text-gray-300 border border-white/5 rounded-lg transition-all"
                >
                  + Add Slider to Section
                </button>
              </div>
            </div>
          )}

          {/* Conditional: Number Ranges (With Input Style configuration) */}
          {stat.type === "number" && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1.5 border-t border-white/5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Input Style</label>
                <select
                  value={stat.input || ""}
                  onChange={(e) => onChange("input", e.target.value)}
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none cursor-pointer focus:border-indigo-500 font-semibold"
                >
                  <option value="">Number Box</option>
                  <option value="slider">Slider (Range)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Min</label>
                <input
                  type="number"
                  value={stat.min ?? ""}
                  onChange={(e) => onChange("min", parseFloat(e.target.value) || 0)}
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Max</label>
                <input
                  type="number"
                  value={stat.max ?? ""}
                  onChange={(e) => onChange("max", parseFloat(e.target.value) || 100)}
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Step</label>
                <input
                  type="number"
                  step="0.01"
                  value={stat.step ?? ""}
                  onChange={(e) => onChange("step", parseFloat(e.target.value) || 1)}
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Unit Format</label>
                <select
                  value={stat.unit || ""}
                  onChange={(e) => onChange("unit", e.target.value)}
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none cursor-pointer focus:border-indigo-500"
                >
                  <option value="">None (Decimal)</option>
                  <option value="percent">Percent (%)</option>
                  <option value="multiplier">Multiplier (x)</option>
                </select>
              </div>
            </div>
          )}

          {/* Conditional: Toggles (Cards) */}
          {((stat.type === "toggle" && categoryId !== "cards") || (categoryId === "cards")) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1.5 border-t border-white/5">
              {categoryId !== "cards" && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">States (Count)</label>
                    <input
                      type="number"
                      value={stat.states ?? 2}
                      onChange={(e) => onChange("states", parseInt(e.target.value) || 2)}
                      className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Labels (comma-separated)</label>
                    <input
                      type="text"
                      value={stat.labels ? stat.labels.join(",") : ""}
                      onChange={(e) => onChange("labels", e.target.value.split(","))}
                      placeholder="e.g. Locked,Normal,Gilded"
                      className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                    />
                  </div>
                </>
              )}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Type Image Overlay</label>
                <div className="flex gap-1.5 items-center">
                  {stat.typeImage && (
                    <div className="w-7 h-7 rounded bg-gray-950 flex items-center justify-center p-0.5 border border-white/10 shrink-0">
                      <img src={`${import.meta.env.BASE_URL}${stat.typeImage}`} className="max-w-full max-h-full object-contain filter drop-shadow" alt="" />
                    </div>
                  )}
                  <input
                    type="text"
                    value={stat.typeImage || ""}
                    onChange={(e) => onChange("typeImage", e.target.value)}
                    placeholder="e.g. icons/ores/Tin_Ore.png"
                    className="flex-1 bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500 min-w-0"
                  />
                  <button
                    type="button"
                    onClick={() => openIconPicker(`Select Overlay for ${stat.name || 'Stat'}`, (path) => onChange("typeImage", path))}
                    className="px-2 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold rounded transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-sm"
                  >
                    Browse
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Conditional: Skill Nodes */}
          {stat.type === "skill" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1.5 border-t border-white/5 items-end">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">X Coordinate (px)</label>
                <input
                  type="number"
                  value={stat.x ?? 50}
                  onChange={(e) => onChange("x", parseInt(e.target.value) || 0)}
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Y Coordinate (px)</label>
                <input
                  type="number"
                  value={stat.y ?? 50}
                  onChange={(e) => onChange("y", parseInt(e.target.value) || 0)}
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                />
              </div>
              
              <PrerequisitesSelector
                stat={stat}
                allItems={allItems}
                onChange={onChange}
              />

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">States (Count)</label>
                <input
                  type="number"
                  value={stat.states ?? 2}
                  onChange={(e) => onChange("states", parseInt(e.target.value) || 2)}
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2 pb-2 h-[34px]">
                <input
                  type="checkbox"
                  id={`hasCrystals_${stat.key}`}
                  checked={!!stat.hasCrystals}
                  onChange={(e) => onChange("hasCrystals", e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-gray-950 accent-indigo-600 outline-none cursor-pointer"
                />
                <label htmlFor={`hasCrystals_${stat.key}`} className="text-xs font-bold text-gray-300 cursor-pointer select-none">
                  Has Crystals
                </label>
              </div>

              <div className="space-y-1 col-span-1 sm:col-span-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Overlay Image</label>
                <div className="flex gap-1.5 items-center">
                  {stat.typeImage && (
                    <div className="w-7 h-7 rounded bg-gray-950 flex items-center justify-center p-0.5 border border-white/10 shrink-0">
                      <img src={`/${stat.typeImage}`} className="max-w-full max-h-full object-contain filter drop-shadow" alt="" />
                    </div>
                  )}
                  <input
                    type="text"
                    value={stat.typeImage || ""}
                    onChange={(e) => onChange("typeImage", e.target.value)}
                    placeholder="e.g. icons/skill_tree/Lucky_Strikes.webp"
                    className="flex-1 bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500 min-w-0"
                  />
                  <button
                    type="button"
                    onClick={() => openIconPicker(`Select Overlay for ${stat.name || 'Skill'}`, (path) => onChange("typeImage", path))}
                    className="px-2 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold rounded transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-sm"
                  >
                    Browse
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Group details (drones) */}
          {isGroup && (
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <div className="text-[10px] uppercase font-bold text-indigo-400">Drone list config:</div>
              <div className="text-gray-400 text-[10px] italic">
                Group items and fields will be serialized into the exported file structure.
              </div>
            </div>
          )}
        
            </>
          )}</div>
      )}
    </div>
  );
}

/* ----------------------- Prerequisites Autocomplete Selector ----------------------- */
function PrerequisitesSelector({ stat, allItems, onChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  const prereqs = stat.prereqs || [];
  
  const otherSkills = (allItems || [])
    .filter((s) => s.type === "skill" && s.key !== stat.key && s.key && !prereqs.includes(s.key));
  
  const filteredSkills = otherSkills.filter((s) => 
    (s.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-1 col-span-1 sm:col-span-2 relative">
      <label className="text-[10px] font-bold text-gray-400 uppercase block">Prerequisites</label>
      
      {/* Selected Tags list */}
      <div className="flex flex-wrap gap-1.5 mb-1.5 min-h-[20px] items-center">
        {prereqs.map((key) => {
          const matchedNode = (allItems || []).find((s) => s.key === key);
          const displayName = matchedNode ? (matchedNode.name || matchedNode.key) : key;
          return (
            <span key={key} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/25 border border-indigo-500/30 text-[10px] font-semibold text-indigo-300">
              <span>{displayName}</span>
              <button
                type="button"
                onClick={() => {
                  const nextPrereqs = prereqs.filter((k) => k !== key);
                  onChange("prereqs", nextPrereqs);
                }}
                className="hover:text-white font-bold ml-0.5 cursor-pointer text-xs focus:outline-none"
              >
                ×
              </button>
            </span>
          );
        })}
        {prereqs.length === 0 && (
          <span className="text-[10px] text-gray-500 italic">No prerequisites (Starting Node)</span>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Type to search and add prerequisite..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            // Delay closing to allow clicks to register on dropdown items
            setTimeout(() => setIsOpen(false), 200);
          }}
          className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
        />
        
        {isOpen && filteredSkills.length > 0 && (
          <div className="absolute left-0 right-0 mt-1 max-h-36 overflow-y-auto border border-white/15 rounded-lg bg-gray-950 shadow-xl z-50 scrollbar-thin divide-y divide-white/5">
            {filteredSkills.map((other) => (
              <button
                key={other.key}
                type="button"
                onClick={() => {
                  onChange("prereqs", [...prereqs, other.key]);
                  setSearchTerm("");
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-indigo-600/20 text-gray-300 hover:text-white text-xs transition-colors flex justify-between items-center cursor-pointer"
              >
                <span className="font-semibold">{other.name || other.key}</span>
                <span className="text-[9px] text-gray-500 font-mono">({other.key})</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
