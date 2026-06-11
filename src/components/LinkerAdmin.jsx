import React, { useState, useMemo } from "react";
import { 
  Plus, 
  Trash2, 
  Copy, 
  Download, 
  Check, 
  Link, 
  ArrowLeft, 
  FileSpreadsheet, 
  Search, 
  Sparkles, 
  ExternalLink, 
  AlertCircle, 
  X,
  RefreshCw
} from "lucide-react";
import { statSchema } from "../stats/schema.js";
import { gameStatsCategory } from "../stats/schema/gameStats.js";
import { 
  loadTemplates, 
  saveCustomTemplate, 
  deleteCustomTemplate,
  resetTemplatesToDefault 
} from "../templates/storage.js";

// Helper to extract spreadsheet ID from URL
const extractSpreadsheetId = (input) => {
  const match = input.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : input.trim();
};

// Local helper to flatten sections recursively
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

// Gather all stats into a single searchable list
function getAllStatsList() {
  const list = [];

  // 1. Add Game Stats
  let gameStatsCat = gameStatsCategory;
  const savedGameStats = localStorage.getItem("gameStatsSchemaConfig");
  if (savedGameStats) {
    try {
      gameStatsCat = JSON.parse(savedGameStats);
    } catch (e) {
      console.error("Failed to parse custom gameStats schema config", e);
    }
  }

  (gameStatsCat.tabs || []).forEach((tab) => {
    flattenStats(tab.stats).forEach((stat) => {
      if (stat.type === "group") return;
      if (!stat.key) return; // skip if no key
      list.push({
        key: stat.key,
        name: stat.name || stat.key,
        categoryName: "Game Stats",
        tabName: tab.name,
        icon: stat.icon || "icons/menus/Prestige.webp",
      });
    });
  });

  // 2. Add Tracking Menu stats
  statSchema.forEach((category) => {
    let resolvedCategory = category;
    const saved = localStorage.getItem(`schemaOverride_${category.id}`);
    if (saved) {
      try {
        resolvedCategory = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse override schema for " + category.id, e);
      }
    }

    const lists = Array.isArray(resolvedCategory.tabs)
      ? resolvedCategory.tabs.map((tab) => ({ stats: tab.stats ?? [], tabName: tab.name }))
      : [{ stats: resolvedCategory.stats ?? [], tabName: null }];

    lists.forEach(({ stats, tabName }) => {
      flattenStats(stats).forEach((stat) => {
        if (stat.type === "group") return;
        if (!stat.key) return; // skip if no key
        list.push({
          key: stat.key,
          name: stat.name || stat.key,
          categoryName: resolvedCategory.name,
          tabName: tabName,
          icon: stat.icon || resolvedCategory.icon || "icons/menus/Prestige.webp",
        });
      });
    });
  });

  return list;
}

export default function LinkerAdmin() {
  const [templatesList, setTemplatesList] = useState(() => loadTemplates());
  const [editingTemplate, setEditingTemplate] = useState(null); // template object or null
  const [isNewTemplate, setIsNewTemplate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Stat Picker Modal State
  const [pickerState, setPickerState] = useState({
    isOpen: false,
    mappingIndex: null, // index of mapping row being edited
  });
  const [pickerSearch, setPickerSearch] = useState("");

  // Export State
  const [exportModalCode, setExportModalCode] = useState(null);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const allStats = useMemo(() => getAllStatsList(), []);

  // Format templates back into mappings dictionary for persistence
  const getMappingsFromRows = (rows) => {
    const mappings = {};
    rows.forEach((r) => {
      if (r.statKey && r.range) {
        if (r.format && r.format !== "default") {
          mappings[r.statKey] = {
            range: r.range.trim(),
            format: r.format,
          };
        } else {
          mappings[r.statKey] = r.range.trim();
        }
      }
    });
    return mappings;
  };

  // Convert mappings dictionary to table rows structure for editing
  const getRowsFromMappings = (mappings) => {
    return Object.entries(mappings || {}).map(([statKey, mappingVal]) => {
      const isObj = mappingVal && typeof mappingVal === "object";
      return {
        statKey,
        range: isObj ? mappingVal.range : String(mappingVal),
        format: isObj ? mappingVal.format : "default",
      };
    });
  };

  const handleCreateTemplate = () => {
    setEditingTemplate({
      id: "new_template_" + Date.now().toString().slice(-4),
      name: "New Spreadsheet Linker",
      type: "spreadsheet",
      spreadsheetId: "",
      rows: [],
    });
    setIsNewTemplate(true);
  };

  const handleEditTemplate = (temp) => {
    // Determine if it is a custom template by checking if it exists in local custom list
    const customListRaw = localStorage.getItem("linker_templates");
    let isCustom = false;
    if (customListRaw) {
      try {
        const parsed = JSON.parse(customListRaw);
        isCustom = Array.isArray(parsed) && parsed.some(x => x.id === temp.id);
      } catch {}
    }

    setEditingTemplate({
      ...temp,
      rows: getRowsFromMappings(temp.mappings),
      isCustomTemplate: isCustom,
    });
    setIsNewTemplate(false);
  };

  const handleAddMappingRow = () => {
    if (!editingTemplate) return;
    setEditingTemplate((prev) => ({
      ...prev,
      rows: [
        ...prev.rows,
        { statKey: "", range: "", format: "default" }
      ],
    }));
  };

  const handleRemoveMappingRow = (index) => {
    if (!editingTemplate) return;
    setEditingTemplate((prev) => ({
      ...prev,
      rows: prev.rows.filter((_, idx) => idx !== index),
    }));
  };

  const handleRowChange = (index, field, val) => {
    if (!editingTemplate) return;
    setEditingTemplate((prev) => {
      const rows = [...prev.rows];
      rows[index] = { ...rows[index], [field]: val };
      return { ...prev, rows };
    });
  };

  const handleSpreadsheetIdBlur = (val) => {
    if (!editingTemplate) return;
    const extracted = extractSpreadsheetId(val);
    setEditingTemplate((prev) => ({
      ...prev,
      spreadsheetId: extracted,
    }));
  };

  const handleSave = () => {
    if (!editingTemplate) return;
    const templateId = editingTemplate.id.trim();
    const templateName = editingTemplate.name.trim();

    if (!templateId || !templateName) {
      alert("Please enter a valid Template ID and Name.");
      return;
    }

    if (isNewTemplate) {
      const alreadyExists = templatesList.some(t => t.id === templateId);
      if (alreadyExists) {
        alert(`A template with ID "${templateId}" already exists. Please choose a unique ID.`);
        return;
      }
    }

    const templateToSave = {
      id: templateId,
      name: templateName,
      type: editingTemplate.type || "spreadsheet",
      spreadsheetId: editingTemplate.spreadsheetId.trim(),
      mappings: getMappingsFromRows(editingTemplate.rows),
    };

    saveCustomTemplate(templateToSave);
    setTemplatesList(loadTemplates());
    setEditingTemplate(null);
    setIsNewTemplate(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleDelete = (templateId) => {
    if (window.confirm("Are you sure you want to delete this custom template?")) {
      deleteCustomTemplate(templateId);
      setTemplatesList(loadTemplates());
      setEditingTemplate(null);
      setIsNewTemplate(false);
    }
  };

  const handleResetAll = () => {
    if (window.confirm("Are you sure you want to delete all custom templates and restore default templates?")) {
      resetTemplatesToDefault();
      setTemplatesList(loadTemplates());
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  const handleExportTemplate = (temp) => {
    const cleanTemp = {
      id: temp.id,
      name: temp.name,
      type: temp.type || "spreadsheet",
      spreadsheetId: temp.spreadsheetId || "",
      mappings: temp.mappings || {},
    };
    
    const code = `// Automatically generated linker template\nexport const ${temp.id} = ${JSON.stringify(
      cleanTemp,
      null,
      2
    )};\n`;

    setExportModalCode({
      filename: `${temp.id}.js`,
      folder: "sheets",
      code,
    });
  };

  const handleExportAll = () => {
    const formatted = templatesList.map((t) => ({
      id: t.id,
      name: t.name,
      type: t.type || "spreadsheet",
      spreadsheetId: t.spreadsheetId || "",
      mappings: t.mappings || {},
    }));

    const code = `// Automatically generated linker templates\nexport const templates = ${JSON.stringify(
      formatted,
      null,
      2
    )};\n`;

    setExportModalCode({
      filename: "templates.js",
      folder: "",
      code,
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

  // Open Stat Picker Modal
  const openStatPicker = (index) => {
    setPickerState({
      isOpen: true,
      mappingIndex: index,
    });
    setPickerSearch("");
  };

  const handleSelectStat = (statKey) => {
    const idx = pickerState.mappingIndex;
    if (idx !== null && editingTemplate) {
      handleRowChange(idx, "statKey", statKey);
    }
    setPickerState({ isOpen: false, mappingIndex: null });
  };

  // Filtered stats for picker
  const filteredStats = useMemo(() => {
    if (!pickerSearch.trim()) return allStats;
    const q = pickerSearch.toLowerCase();
    return allStats.filter(
      (s) =>
        (s.name && s.name.toLowerCase().includes(q)) ||
        (s.key && s.key.toLowerCase().includes(q)) ||
        (s.categoryName && s.categoryName.toLowerCase().includes(q)) ||
        (s.tabName && s.tabName.toLowerCase().includes(q))
    );
  }, [pickerSearch, allStats]);

  // Filtered templates list (for list view)
  const filteredTemplates = useMemo(() => {
    if (!searchQuery.trim()) return templatesList;
    const q = searchQuery.toLowerCase();
    return templatesList.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        (t.spreadsheetId && t.spreadsheetId.toLowerCase().includes(q))
    );
  }, [searchQuery, templatesList]);

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Link className="w-8 h-8 text-indigo-400" />
            <span>Linker Administration</span>
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Map game variables and manually-tracked progress to specific spreadsheet cells.
          </p>
        </div>

        {!editingTemplate && (
          <div className="flex gap-2">
            <button
              onClick={handleCreateTemplate}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-600/10 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Template</span>
            </button>
            <button
              onClick={handleExportAll}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-900 border border-white/10 hover:bg-white/5 text-gray-300 text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export All JS</span>
            </button>
            {templatesList.some(t => {
              // check if any custom template exists
              const customListRaw = localStorage.getItem("linker_templates");
              if (!customListRaw) return false;
              try {
                const parsed = JSON.parse(customListRaw);
                return Array.isArray(parsed) && parsed.length > 0;
              } catch {
                return false;
              }
            }) && (
              <button
                onClick={handleResetAll}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-500/20 text-rose-300 text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
                title="Remove all custom modifications"
              >
                <Trash2 className="w-4 h-4" />
                <span>Reset Custom Templates</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Save Success Banner */}
      {savedSuccess && (
        <div className="p-4 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-2xl flex items-center gap-3 animate-fade-in">
          <Check className="w-5 h-5 flex-shrink-0 text-emerald-400" />
          <span className="text-sm font-semibold">Changes saved successfully!</span>
        </div>
      )}

      {/* Mode 1: List View */}
      {!editingTemplate && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="p-4 rounded-xl border border-white/5 bg-gray-900/30 flex items-center border-white/10 bg-gray-950/60 px-3.5 py-2 w-full sm:w-80 gap-2 focus-within:border-indigo-500 transition-all">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-white outline-none w-full placeholder-gray-500"
            />
          </div>

          {filteredTemplates.length === 0 ? (
            <div className="glass-panel p-12 text-center text-gray-500 rounded-2xl border border-white/5">
              <FileSpreadsheet className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <h4 className="font-semibold text-white">No templates found</h4>
              <p className="text-xs mt-1">Create a new template to get started mapping spreadsheet cells.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTemplates.map((t) => {
                const mappingsCount = Object.keys(t.mappings || {}).length;
                
                // check if custom template by parsing local custom list
                let isCustom = false;
                const customListRaw = localStorage.getItem("linker_templates");
                if (customListRaw) {
                  try {
                    const parsed = JSON.parse(customListRaw);
                    isCustom = Array.isArray(parsed) && parsed.some(x => x.id === t.id);
                  } catch {}
                }

                return (
                  <div
                    key={t.id}
                    className="p-6 rounded-2xl border border-white/5 bg-gray-900/40 hover:border-indigo-500/20 transition-all duration-300 flex flex-col justify-between glass-panel relative group"
                  >
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-base font-bold text-white leading-snug">{t.name}</h4>
                        <div className="flex gap-1.5 items-center">
                          {isCustom && (
                            <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/25">
                              Custom
                            </span>
                          )}
                          <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
                            {t.id}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 flex items-center gap-1.5 pt-1">
                        <span>Source type:</span>
                        <span className="text-indigo-300 uppercase font-semibold text-[10px] tracking-wide">
                          {t.type || "spreadsheet"}
                        </span>
                      </div>
                      
                      <div className="text-xs text-gray-500 flex items-center gap-1.5">
                        <span>Cell mappings:</span>
                        <span className="text-gray-300 font-semibold">{mappingsCount} items</span>
                      </div>
                    </div>

                    <div className="my-5 p-3 rounded-xl bg-gray-950/60 border border-white/5 space-y-1">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Spreadsheet ID:</div>
                      {t.spreadsheetId ? (
                        <div className="flex items-center justify-between gap-2">
                          <code className="text-xs text-emerald-400 font-mono truncate select-all">
                            {t.spreadsheetId}
                          </code>
                          <a
                            href={`https://docs.google.com/spreadsheets/d/${t.spreadsheetId}/edit`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded text-gray-500 hover:bg-white/5 hover:text-white transition-colors"
                            title="Open Google Sheet in new tab"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500 italic">None. Assign spreadsheet ID in Edit.</div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditTemplate(t)}
                        className="flex-1 px-3 py-2 bg-indigo-600/10 hover:bg-indigo-600/25 text-indigo-300 border border-indigo-500/20 hover:border-indigo-500/40 text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                      >
                        Edit Mappings
                      </button>
                      <button
                        onClick={() => handleExportTemplate(t)}
                        className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 rounded-xl transition-all cursor-pointer"
                        title="Export Template Code"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      {isCustom && (
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="p-2 bg-rose-500/5 hover:bg-rose-500/15 border border-rose-500/20 text-rose-300 rounded-xl transition-all cursor-pointer"
                          title="Delete Template"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Edit View */}
      {editingTemplate && (
        <div className="space-y-6 animate-slide-up">
          {/* Back Button */}
          <button
            onClick={() => setEditingTemplate(null)}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Templates</span>
          </button>

          {/* Metadata editor */}
          <div className="p-5 rounded-2xl border border-white/5 bg-gray-900/20 space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
                Template Info
              </h3>
              {editingTemplate.isCustomTemplate && (
                <button
                  onClick={() => handleDelete(editingTemplate.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/15 text-rose-300 text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Template</span>
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">Template ID / Slug</label>
                <input
                  type="text"
                  value={editingTemplate.id || ""}
                  onChange={(e) => {
                    const cleanVal = e.target.value.replace(/[^a-zA-Z0-9_-]/g, "");
                    setEditingTemplate(prev => ({ ...prev, id: cleanVal }));
                  }}
                  disabled={!isNewTemplate && !editingTemplate.isCustomTemplate}
                  placeholder="e.g. damage_calc"
                  className="w-full bg-gray-950/60 border border-white/10 text-xs text-white p-2.5 rounded-lg outline-none focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {!isNewTemplate && !editingTemplate.isCustomTemplate && (
                  <p className="text-[10px] text-gray-500">System templates ID cannot be changed.</p>
                )}
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-gray-400">Display Name</label>
                <input
                  type="text"
                  value={editingTemplate.name || ""}
                  onChange={(e) => setEditingTemplate(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Best Farming Calculator"
                  className="w-full bg-gray-950/60 border border-white/10 text-xs text-white p-2.5 rounded-lg outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">Integrations Tool</label>
                <select
                  value={editingTemplate.type || "spreadsheet"}
                  onChange={(e) => setEditingTemplate(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full bg-gray-950/60 border border-white/10 text-xs text-white p-2.5 rounded-lg outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="spreadsheet">Spreadsheet (Excel / Sheets)</option>
                  <option value="discord" disabled>Discord Bot (Coming Soon)</option>
                  <option value="api" disabled>Custom JSON API (Coming Soon)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-gray-400">Google Spreadsheet ID or Link</label>
                <span className="text-[10px] text-indigo-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Accepts full URLs!</span>
                </span>
              </div>
              <input
                type="text"
                value={editingTemplate.spreadsheetId || ""}
                onChange={(e) => setEditingTemplate(prev => ({ ...prev, spreadsheetId: e.target.value }))}
                onBlur={(e) => handleSpreadsheetIdBlur(e.target.value)}
                placeholder="e.g. https://docs.google.com/spreadsheets/d/1A5.../edit"
                className="w-full bg-gray-950/60 border border-white/10 text-xs text-white p-2.5 rounded-lg outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          {/* Mappings Editor */}
          <div className="p-5 rounded-2xl border border-white/5 bg-gray-900/20 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
                Cell Mappings ({editingTemplate.rows.length})
              </h3>
              <button
                onClick={handleAddMappingRow}
                className="flex items-center gap-1 px-3 py-1 bg-white/5 hover:bg-white/10 text-xs font-semibold border border-white/10 rounded-lg transition-colors text-indigo-300 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Cell Row</span>
              </button>
            </div>

            {editingTemplate.rows.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-500 italic bg-gray-950/40 rounded-xl border border-white/5">
                No cells mapped. Click "Add Cell Row" to begin mapping statistics.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      <th className="py-2.5 px-3 w-1/4">Excel Coordinates</th>
                      <th className="py-2.5 px-3 w-1/5">Expected Format</th>
                      <th className="py-2.5 px-3">Stat Source Variable</th>
                      <th className="py-2.5 px-3 text-right w-12">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {editingTemplate.rows.map((row, idx) => {
                      const matchedStat = allStats.find(s => s.key === row.statKey);
                      return (
                        <tr key={idx} className="group hover:bg-white/[0.02]">
                          {/* Coordinates */}
                          <td className="py-2 px-1">
                            <input
                              type="text"
                              value={row.range || ""}
                              onChange={(e) => handleRowChange(idx, "range", e.target.value)}
                              placeholder="e.g. MyList!A4"
                              className="w-full bg-gray-950/60 border border-white/10 hover:border-white/20 focus:border-indigo-500 text-xs text-white p-2 rounded-lg outline-none font-mono"
                            />
                          </td>

                          {/* Format Override */}
                          <td className="py-2 px-1">
                            <select
                              value={row.format || "default"}
                              onChange={(e) => handleRowChange(idx, "format", e.target.value)}
                              className="w-full bg-gray-950/60 border border-white/10 hover:border-white/20 focus:border-indigo-500 text-xs text-white p-2 rounded-lg outline-none cursor-pointer"
                            >
                              <option value="default">Auto (Default)</option>
                              <option value="percent">Percentage (%)</option>
                              <option value="number">Number/Double</option>
                              <option value="raw">Raw value</option>
                            </select>
                          </td>

                          {/* Stat Selector */}
                          <td className="py-2 px-1">
                            {row.statKey ? (
                              <button
                                type="button"
                                onClick={() => openStatPicker(idx)}
                                className="w-full text-left flex items-center justify-between gap-3 p-2 bg-indigo-950/20 hover:bg-indigo-950/45 border border-indigo-500/20 hover:border-indigo-500/40 rounded-lg text-xs transition-all cursor-pointer"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <img 
                                    src={`${import.meta.env.BASE_URL}${matchedStat?.icon || "icons/menus/Prestige.webp"}`} 
                                    className="w-5 h-5 object-contain flex-shrink-0"
                                    onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}icons/menus/Prestige.webp`; }}
                                  />
                                  <div className="truncate min-w-0">
                                    <span className="font-bold text-white">
                                      {matchedStat?.name || row.statKey}
                                    </span>
                                    <span className="text-[10px] text-gray-500 ml-1.5 font-mono">
                                      ({row.statKey})
                                    </span>
                                    <div className="text-[9px] text-gray-500">
                                      {matchedStat?.categoryName} {matchedStat?.tabName ? `> ${matchedStat.tabName}` : ""}
                                    </div>
                                  </div>
                                </div>
                                <span className="text-[10px] font-bold text-indigo-400 flex-shrink-0 uppercase px-1 hover:text-indigo-300">
                                  Change
                                </span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => openStatPicker(idx)}
                                className="w-full text-left flex items-center justify-between gap-2 p-2 bg-gray-950 border border-dashed border-white/10 hover:border-indigo-500/40 hover:bg-white/5 rounded-lg text-xs text-gray-500 hover:text-indigo-300 transition-all cursor-pointer"
                              >
                                <span className="italic font-medium">Select stat source...</span>
                                <Search className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>

                          {/* Delete Row */}
                          <td className="py-2 px-1 text-right">
                            <button
                              onClick={() => handleRemoveMappingRow(idx)}
                              className="p-2 rounded-lg text-gray-500 hover:bg-white/5 hover:text-rose-400 transition-colors cursor-pointer"
                              title="Delete Row"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="p-4 rounded-xl border border-white/5 bg-gray-900/40 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs text-gray-400">
                Custom templates can be deleted or exported. Default templates can only be saved as local overrides.
              </p>
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={() => setEditingTemplate(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-gray-300 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleExportTemplate(editingTemplate)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-750 border border-white/10 rounded-xl text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Template File</span>
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Schema Template</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export modal overlay */}
      {exportModalCode && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl glass-panel pulse-glow-indigo animate-slide-up flex flex-col max-h-[85vh]">
            <div className="p-5 border-b border-white/10 bg-indigo-950/20 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">Export Template Code</h3>
                <p className="text-xs text-gray-400 mt-0.5">Filename: src/templates/{exportModalCode.folder ? `${exportModalCode.folder}/` : ""}{exportModalCode.filename}</p>
              </div>
              <button
                onClick={() => setExportModalCode(null)}
                className="text-gray-400 hover:text-white font-bold text-sm px-2.5 py-1 bg-white/5 rounded-lg border border-white/5 cursor-pointer"
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
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-white/10 hover:bg-white/5 text-xs font-bold rounded-xl text-white transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copied!" : "Copy Code"}</span>
                </button>
                <button
                  onClick={handleDownloadFile}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold rounded-xl text-white transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download file</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stat Picker Modal Overlay */}
      {pickerState.isOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl glass-panel border border-indigo-500/25 flex flex-col max-h-[80vh] animate-slide-up shadow-xl">
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-indigo-950/20 flex justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white leading-tight">Select Stat Source Variable</h3>
              </div>
              <button
                onClick={() => setPickerState({ isOpen: false, mappingIndex: null })}
                className="text-gray-400 hover:text-white p-1 bg-white/5 rounded-lg border border-white/5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-white/5 bg-gray-950/40">
              <input
                type="text"
                autoFocus
                value={pickerSearch}
                onChange={(e) => setPickerSearch(e.target.value)}
                placeholder="Search by name, key, or category..."
                className="w-full bg-gray-950 border border-white/10 focus:border-indigo-500 text-xs text-white p-2.5 rounded-xl outline-none font-medium"
              />
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-900/20 max-h-[50vh]">
              {filteredStats.length === 0 ? (
                <div className="p-12 text-center text-xs text-gray-500 italic">
                  No variables match your search query.
                </div>
              ) : (
                filteredStats.map((stat) => (
                  <button
                    key={`${stat.categoryName}-${stat.tabName || ""}-${stat.key}`}
                    onClick={() => handleSelectStat(stat.key)}
                    className="w-full text-left flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] hover:bg-indigo-600/15 border border-white/5 hover:border-indigo-500/25 transition-all cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-950 flex items-center justify-center p-0.5 border border-white/10 shrink-0">
                      <img 
                        src={`${import.meta.env.BASE_URL}${stat.icon}`} 
                        className="max-w-full max-h-full object-contain filter drop-shadow" 
                        alt=""
                        onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}icons/menus/Prestige.webp`; }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[9px] font-bold text-indigo-400 uppercase tracking-wide">
                        {stat.categoryName} {stat.tabName ? `> ${stat.tabName}` : ""}
                      </div>
                      <div className="text-xs font-bold text-white truncate group-hover:text-indigo-200 transition-colors">
                        {stat.name}
                      </div>
                      <div className="text-[9px] font-mono text-gray-500 truncate">
                        {stat.key}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/10 bg-gray-900/50 flex justify-end text-[10px] text-gray-400">
              Showing {filteredStats.length} variables. Select one to map.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
