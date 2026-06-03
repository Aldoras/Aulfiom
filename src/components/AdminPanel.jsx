import React, { useState, useMemo } from "react";
import { Plus, Trash2, Copy, Download, Check, Layers, ChevronDown, ChevronRight, Lock } from "lucide-react";
import { statSchema } from "../stats/schema.js";

// Clean variable name builder
function getVarName(catId) {
  const clean = (catId || "newCategory").replace(/[^a-zA-Z0-9]/g, "");
  return `${clean}Category`;
}

export default function AdminPanel() {
  const [selectedCatId, setSelectedCatId] = useState(statSchema[0]?.id || "");
  const [category, setCategory] = useState(() => JSON.parse(JSON.stringify(statSchema[0] || {})));
  const [exportModalCode, setExportModalCode] = useState(null);
  const [copied, setCopied] = useState(false);

  // Dropdown options
  const categoryOptions = useMemo(() => {
    return [...statSchema.map((c) => ({ id: c.id, name: c.name })), { id: "new", name: "➕ Create New Category" }];
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
    } else {
      const match = statSchema.find((c) => c.id === catId);
      if (match) {
        setCategory(JSON.parse(JSON.stringify(match)));
      }
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

  // Stat item creators
  const createDefaultStat = (type) => {
    const key = `newField_${Date.now().toString().slice(-4)}`;
    if (type === "number") {
      return { key, name: "New Slider Stat", type: "number", default: 0, min: 0, max: 100, step: 1, input: "slider" };
    }
    if (type === "checkbox") {
      return { key, name: "New Checkbox", type: "checkbox", default: false };
    }
    if (type === "toggle") {
      return { key, name: "New Toggle Card", type: "toggle", layout: "card-5", states: 5, default: 0, labels: ["Locked", "Normal", "Gilded", "Polychrome", "Infernal"], typeImage: "" };
    }
    if (type === "skill") {
      return {
        key,
        name: "New Skill Node",
        type: "skill",
        layout: "card",
        states: 2,
        default: 0,
        labels: ["Locked", "Unlocked"],
        typeImage: "",
        x: 50,
        y: 50,
        prereqs: [],
        hasCrystals: false
      };
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

  // Serialize to code
  const handleExport = () => {
    const varName = getVarName(category.id);
    const code = `// Automatically generated schema configuration for Idle Obelisk Miner Hub\nexport const ${varName} = ${JSON.stringify(
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

        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>Export Category File</span>
        </button>
      </div>

      {/* Metadata Editor */}
      <div className="p-5 rounded-2xl border border-white/5 bg-gray-900/20 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">Category Info</h3>
        <div className={`grid grid-cols-1 ${category.id === "skillTree" ? "md:grid-cols-4" : "md:grid-cols-3"} gap-4`}>
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
            <input
              type="text"
              value={category.icon || ""}
              onChange={(e) => handleMetadataChange("icon", e.target.value)}
              placeholder="e.g. icons/menus/Prestige.webp"
              className="w-full bg-gray-950/60 border border-white/10 text-xs text-white p-2 rounded-lg outline-none focus:border-indigo-500"
            />
          </div>

          {category.id === "skillTree" && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400">Canvas Scroll Height (px)</label>
              <input
                type="number"
                value={category.canvasHeight ?? 2000}
                onChange={(e) => handleMetadataChange("canvasHeight", parseInt(e.target.value) || 2000)}
                placeholder="e.g. 2000"
                className="w-full bg-gray-950/60 border border-white/10 text-xs text-white p-2 rounded-lg outline-none focus:border-indigo-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Tabs list (if Prestige or Construct) */}
      <div className="p-5 rounded-2xl border border-white/5 bg-gray-900/20 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">Tabs Structure</h3>
          <button
            onClick={handleAddTab}
            className="flex items-center gap-1 px-3 py-1 bg-white/5 hover:bg-white/10 text-xs font-semibold border border-white/10 rounded-lg transition-colors text-indigo-300"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Tab</span>
          </button>
        </div>

        {category.tabs && category.tabs.length > 0 ? (
          <div className="space-y-3">
            {category.tabs.map((tab, idx) => (
              <div key={idx} className="p-3 bg-gray-950/50 border border-white/5 rounded-xl space-y-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
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
                      onClick={() => handleRemoveTab(idx)}
                      className="p-1 rounded text-gray-500 hover:text-rose-400 hover:bg-white/5 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Tab Stats list */}
                <div className="pl-4 border-l border-white/10 space-y-2">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Tab Items:</div>
                  <StatEditorList
                    list={tab.stats || []}
                    onStatChange={(sIdx, f, v) => handleStatChange(sIdx, f, v, idx)}
                    onRemoveStat={(sIdx) => handleRemoveStat(sIdx, idx)}
                  />
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => handleAddStat(idx, "number")}
                      className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] font-semibold text-gray-300 border border-white/5"
                    >
                      + Slider / Number
                    </button>
                    <button
                      onClick={() => handleAddStat(idx, "toggle")}
                      className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] font-semibold text-gray-300 border border-white/5"
                    >
                      + Toggle Card
                    </button>
                    <button
                      onClick={() => handleAddStat(idx, "checkbox")}
                      className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] font-semibold text-gray-300 border border-white/5"
                    >
                      + Checkbox
                    </button>
                    <button
                      onClick={() => handleAddStat(idx, "section")}
                      className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] font-semibold text-gray-300 border border-white/5"
                    >
                      + Section
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="text-xs text-gray-500 pb-2">No tabs defined. Adding parameters directly to Category stats.</div>
            <StatEditorList
              list={category.stats || []}
              onStatChange={(sIdx, f, v) => handleStatChange(sIdx, f, v)}
              onRemoveStat={(sIdx) => handleRemoveStat(sIdx)}
            />
            <div className="flex items-center gap-2 pt-3">
              <button
                onClick={() => handleAddStat(null, "number")}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-gray-300 border border-white/5"
              >
                + Add Slider / Number
              </button>
              <button
                onClick={() => handleAddStat(null, "toggle")}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-gray-300 border border-white/5"
              >
                + Add Toggle Card
              </button>
              <button
                onClick={() => handleAddStat(null, "checkbox")}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-gray-300 border border-white/5"
              >
                + Add Checkbox
              </button>
              {category.id === "skillTree" && (
                <button
                  onClick={() => handleAddStat(null, "skill")}
                  className="px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/55 rounded-xl text-xs font-bold text-indigo-300 border border-indigo-500/25 transition-all"
                >
                  + Add Skill Node
                </button>
              )}
              <button
                onClick={() => handleAddStat(null, "group")}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-gray-300 border border-white/5"
              >
                + Add Group (Drones)
              </button>
              <button
                onClick={() => handleAddStat(null, "section")}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-gray-300 border border-white/5"
              >
                + Add Section (Accordion)
              </button>
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
    </div>
  );
}

/* ----------------------- Stats Editor List ----------------------- */
function StatEditorList({ list, onStatChange, onRemoveStat }) {
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
          onChange={(f, v) => onStatChange(idx, f, v)}
          onRemove={() => onRemoveStat(idx)}
        />
      ))}
    </div>
  );
}

/* ----------------------- Individual Stat Editor Card ----------------------- */
function StatEditorItem({ stat, index, onChange, onRemove }) {
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
          <span className="font-bold text-gray-500 truncate w-14 uppercase">#{index + 1} ({stat.type || "number"})</span>
          <span className="font-semibold text-gray-200 truncate">{stat.name || stat.key || "Unnamed item/section"}</span>
          <span className="text-[10px] text-gray-500 font-mono font-medium truncate opacity-60">
            {stat.key ? `[key: ${stat.key}]` : ""}
            {isSection ? `[items: ${stat.stats?.length || 0}]` : ""}
          </span>
        </button>

        <button
          onClick={onRemove}
          className="p-1 rounded hover:bg-white/5 text-gray-500 hover:text-rose-400 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Expanded Editor Form */}
      {isExpanded && (
        <div className="p-3 bg-gray-950/20 border-t border-white/5 space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {/* Stat Type Selector dropdown */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Stat Type</label>
              <select
                value={stat.type || "number"}
                onChange={(e) => onChange("type", e.target.value)}
                className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none cursor-pointer focus:border-indigo-500 font-semibold"
              >
                <option value="number">Slider / Number</option>
                <option value="checkbox">Checkbox</option>
                <option value="toggle">Toggle Card</option>
                <option value="skill">Skill Tree Node</option>
                <option value="group">Group (Drone Bay)</option>
                <option value="section">Section (Accordion)</option>
              </select>
            </div>

            {!isSection && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Field Key</label>
                <input
                  type="text"
                  value={stat.key || ""}
                  onChange={(e) => onChange("key", e.target.value)}
                  placeholder="e.g. tin_ore_card"
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                />
              </div>
            )}

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
          </div>

          {!isSection && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Icon Link</label>
                <input
                  type="text"
                  value={stat.icon || ""}
                  onChange={(e) => onChange("icon", e.target.value)}
                  placeholder="icons/..."
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                />
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
            </div>
          )}

          {/* Conditional: Section (Recursive list builder) */}
          {isSection && (
            <div className="pl-4 border-l-2 border-indigo-500/30 space-y-3 mt-1">
              <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                Section Sub-Items ({stat.stats?.length || 0} items)
              </div>
              
              <StatEditorList
                list={stat.stats || []}
                onStatChange={(subIdx, f, v) => {
                  const updatedSubStats = [...(stat.stats || [])];
                  updatedSubStats[subIdx] = { ...updatedSubStats[subIdx], [f]: v };
                  onChange("stats", updatedSubStats);
                }}
                onRemoveStat={handleSubStatRemove}
              />
              
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    const key = `newCard_${Date.now().toString().slice(-4)}`;
                    const newItem = { key, type: "toggle", layout: "card-5", states: 5, default: 0, labels: ["Locked", "Normal", "Gilded", "Polychrome", "Infernal"], typeImage: "" };
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
          {stat.type === "toggle" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1.5 border-t border-white/5">
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
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Type Image Overlay</label>
                <input
                  type="text"
                  value={stat.typeImage || ""}
                  onChange={(e) => onChange("typeImage", e.target.value)}
                  placeholder="e.g. icons/ores/Tin_Ore.png"
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {/* Conditional: Skill Nodes */}
          {stat.type === "skill" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1.5 border-t border-white/5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">X Position (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={stat.x ?? 50}
                  onChange={(e) => onChange("x", parseFloat(e.target.value) ?? 50)}
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Y Position (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={stat.y ?? 50}
                  onChange={(e) => onChange("y", parseFloat(e.target.value) ?? 50)}
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Prerequisites (comma-sep)</label>
                <input
                  type="text"
                  value={stat.prereqs ? stat.prereqs.join(",") : ""}
                  onChange={(e) => onChange("prereqs", e.target.value ? e.target.value.split(",").map(s => s.trim()).filter(Boolean) : [])}
                  placeholder="e.g. swingHarderSkill"
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1 flex flex-col justify-end pb-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stat.hasCrystals ?? false}
                    onChange={(e) => onChange("hasCrystals", e.target.checked)}
                    className="rounded border-white/10 bg-gray-950 text-indigo-600 focus:ring-0 cursor-pointer w-4 h-4"
                  />
                  <span>Show Corner Crystals</span>
                </label>
              </div>
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
                <label className="text-[10px] font-bold text-gray-400 uppercase">Labels (comma-sep)</label>
                <input
                  type="text"
                  value={stat.labels ? stat.labels.join(",") : ""}
                  onChange={(e) => onChange("labels", e.target.value.split(","))}
                  placeholder="e.g. Locked,Unlocked"
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Type Image Overlay</label>
                <input
                  type="text"
                  value={stat.typeImage || ""}
                  onChange={(e) => onChange("typeImage", e.target.value)}
                  placeholder="e.g. icons/skill_tree/Swing_Harder.webp"
                  className="w-full bg-gray-950 border border-white/10 text-xs text-white px-2 py-1 rounded outline-none focus:border-indigo-500"
                />
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
        </div>
      )}
    </div>
  );
}
