import { useState, useMemo } from "react";
import { Search, Trash2, Clipboard, Check, X, PenLine, AlertCircle, Layers, FileJson, AlertTriangle } from "lucide-react";
import { formatStatValue, formatBigNumber } from "../stats/format.js";

export default function GameStatsViewer({ catData }) {
  // Load initial pasted JSON state
  const [pastedData, setPastedData] = useState(() => {
    const raw = localStorage.getItem("gameStats_pastedJson");
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

  const [inputJson, setInputJson] = useState("");
  const [parseError, setParseError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isPasting, setIsPasting] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [importFeedback, setImportFeedback] = useState(null);
  const [showUnsupportedPreview, setShowUnsupportedPreview] = useState(false);

  // Load the schema (either from localStorage if edited in developer admin, or from the default file)
  const schema = useMemo(() => {
    const saved = localStorage.getItem("gameStatsSchemaConfig");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved gameStats schema config, falling back", e);
      }
    }
    return catData;
  }, [catData]);

  // Flatten all configured stats keys from the schema tabs
  const configuredStatsMap = useMemo(() => {
    const map = new Map();
    (schema.tabs || []).forEach((tab) => {
      (tab.stats || []).forEach((stat) => {
        map.set(stat.key, { ...stat, tabId: tab.id, tabName: tab.name });
      });
    });
    return map;
  }, [schema]);

  // Live JSON Preview & Import Verification logic
  const previewInfo = useMemo(() => {
    const trimmed = inputJson.trim();
    if (!trimmed) return null;
    try {
      const parsed = JSON.parse(trimmed);
      if (!parsed || typeof parsed !== "object") {
        return { isValid: false, error: "Pasted data is not a valid JSON object." };
      }
      if (!parsed.stats || typeof parsed.stats !== "object") {
        return { isValid: false, error: "Missing 'stats' object in the pasted JSON. Please check the game export format." };
      }
      
      const statsKeys = Object.keys(parsed.stats);
      const totalCount = statsKeys.length;
      
      let supportedCount = 0;
      let unsupportedCount = 0;
      const unsupportedKeys = [];
      
      statsKeys.forEach((key) => {
        if (configuredStatsMap.has(key)) {
          supportedCount++;
        } else {
          unsupportedCount++;
          unsupportedKeys.push(key);
        }
      });
      
      return {
        isValid: true,
        totalCount,
        supportedCount,
        unsupportedCount,
        unsupportedKeys,
        version: parsed.version || "Unknown"
      };
    } catch {
      return { isValid: false, error: "Invalid JSON format. Please check the text and try again." };
    }
  }, [inputJson, configuredStatsMap]);

  const handleStartEdit = (key, currentVal) => {
    setEditingKey(key);
    setEditValue(String(currentVal));
  };

  const handleCancelEdit = () => {
    setEditingKey(null);
    setEditValue("");
  };

  const handleSaveEdit = (key) => {
    const num = Number(editValue);
    if (isNaN(num)) {
      alert("Please enter a valid number (e.g. 100, 31.2, or 1.42e30).");
      return;
    }

    const updated = {
      ...pastedData,
      stats: {
        ...(pastedData?.stats || {}),
        [key]: num
      }
    };

    localStorage.setItem("gameStats_pastedJson", JSON.stringify(updated));
    setPastedData(updated);
    setEditingKey(null);
    setEditValue("");
  };

  // Parse and save JSON
  const handleImport = (text) => {
    setParseError("");
    if (!text.trim()) {
      setParseError("Please enter some JSON data.");
      return;
    }

    try {
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== "object") {
        throw new Error("Pasted data is not a valid JSON object.");
      }
      
      if (!parsed.stats || typeof parsed.stats !== "object") {
        throw new Error("Missing 'stats' object in the pasted JSON. Please check the game export format.");
      }

      // Filter stats to only include supported ones
      const filteredStats = {};
      let supportedCount = 0;
      let unsupportedCount = 0;
      
      Object.entries(parsed.stats).forEach(([key, val]) => {
        if (configuredStatsMap.has(key)) {
          filteredStats[key] = val;
          supportedCount++;
        } else {
          unsupportedCount++;
        }
      });

      const updated = {
        ...parsed,
        stats: filteredStats
      };

      localStorage.setItem("gameStats_pastedJson", JSON.stringify(updated));
      setPastedData(updated);
      setInputJson("");
      setIsPasting(false);
      setParseError("");
      setShowUnsupportedPreview(false);
      setImportFeedback({
        supportedCount,
        unsupportedCount
      });
    } catch (e) {
      console.error(e);
      setParseError(e.message || "Invalid JSON format. Please check the text and try again.");
    }
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear your imported game stats?")) {
      localStorage.removeItem("gameStats_pastedJson");
      setPastedData(null);
      setSearchQuery("");
      setActiveTab("all");
      setImportFeedback(null);
      setShowUnsupportedPreview(false);
    }
  };

  // Extract stats and categorized items
  const statsSource = useMemo(() => pastedData?.stats || {}, [pastedData]);
  const gameVersion = pastedData?.version || "Unknown";
  const gameTime = pastedData?.time || null;

  // Determine uncategorized stats (present in JSON but not configured in the schema)
  const uncategorizedStats = useMemo(() => {
    const list = [];
    Object.entries(statsSource).forEach(([key, val]) => {
      if (!configuredStatsMap.has(key)) {
        list.push({
          key,
          value: val,
          name: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          desc: "Unconfigured raw game statistic",
          type: key.includes("chance") ? "chance" : key.includes("multi") ? "multi" : key.includes("reduction") ? "reduction" : "number",
          icon: "icons/menus/Construct.webp"
        });
      }
    });
    // Sort alphabetically by key
    return list.sort((a, b) => a.key.localeCompare(b.key));
  }, [statsSource, configuredStatsMap]);

  // Build the list of tabs including configured categories, 'uncategorized', and 'all'
  const tabsList = useMemo(() => {
    const list = [{ id: "all", name: "All Stats" }];
    
    (schema.tabs || []).forEach((tab) => {
      // Only show tabs that have stats in either the schema or the pasted JSON
      list.push({ id: tab.id, name: tab.name });
    });

    if (uncategorizedStats.length > 0) {
      list.push({ id: "uncategorized", name: `Uncategorized (${uncategorizedStats.length})` });
    }

    return list;
  }, [schema, uncategorizedStats]);

  // Filter and search stats
  const filteredStats = useMemo(() => {
    let result = [];

    if (activeTab === "all") {
      // Add all configured stats
      configuredStatsMap.forEach((stat) => {
        if (stat.key in statsSource) {
          result.push({ ...stat, value: statsSource[stat.key] });
        }
      });
      // Add uncategorized
      uncategorizedStats.forEach((stat) => {
        result.push(stat);
      });
    } else if (activeTab === "uncategorized") {
      result = uncategorizedStats;
    } else {
      // Filter by active tab id
      configuredStatsMap.forEach((stat) => {
        if (stat.tabId === activeTab && stat.key in statsSource) {
          result.push({ ...stat, value: statsSource[stat.key] });
        }
      });
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.key.toLowerCase().includes(q) ||
          (s.desc && s.desc.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeTab, configuredStatsMap, statsSource, uncategorizedStats, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileJson className="w-8 h-8 text-indigo-400" />
            <span>Game Vault Stats Viewer</span>
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Import and inspect live calculations and statistics directly from your game save files.
          </p>
        </div>

        {pastedData && (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsPasting(true);
                setImportFeedback(null);
              }}
              className="flex items-center gap-1.5 px-4 py-2 border border-white/10 hover:bg-white/5 text-gray-300 text-xs font-bold rounded-xl transition-all active:scale-95"
            >
              <Clipboard className="w-4 h-4" />
              <span>Import New JSON</span>
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-4 py-2 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/15 text-rose-300 text-xs font-bold rounded-xl transition-all active:scale-95"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Data</span>
            </button>
          </div>
        )}
      </div>

      {/* Parse Error Notification */}
      {parseError && (
        <div className="p-4 bg-rose-500/10 text-rose-300 border border-rose-500/20 rounded-2xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
          <span className="text-sm font-medium">{parseError}</span>
        </div>
      )}

      {/* Import Feedback Notification */}
      {importFeedback && (
        <div className="p-4 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-2xl flex items-center justify-between gap-3 animate-slide-up shadow-md">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 flex-shrink-0 text-emerald-400" />
            <span className="text-sm font-medium">
              Successfully loaded <strong className="text-white">{importFeedback.supportedCount}</strong> stats.
              {importFeedback.unsupportedCount > 0 && (
                <>
                  {" "}
                  <strong className="text-amber-300">{importFeedback.unsupportedCount}</strong> unsupported stats were skipped.
                </>
              )}
            </span>
          </div>
          <button
            onClick={() => setImportFeedback(null)}
            className="p-1 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Import JSON Form (If empty or clicked new import) */}
      {(!pastedData || isPasting) && (
        <div className="glass-panel p-6 rounded-2xl space-y-4 border border-indigo-500/15 animate-slide-up shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent pointer-events-none" />
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Paste Exported JSON Data</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Paste the JSON string copied from the game's stats export feature.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              placeholder='Paste JSON here (e.g. { "version": "v2.1.6", "stats": { ... } })'
              className="w-full h-44 bg-gray-950/60 border border-white/10 focus:border-indigo-500 rounded-xl p-3.5 text-xs font-mono text-gray-200 outline-none transition-all placeholder-gray-600 focus:ring-1 focus:ring-indigo-500/30"
            />
            
            {/* Live JSON Preview & Import Verification details */}
            {previewInfo && (
              <div className={`p-4 rounded-xl border text-xs leading-relaxed transition-all duration-300 animate-slide-up ${
                previewInfo.isValid
                  ? previewInfo.unsupportedCount > 0
                    ? "bg-amber-500/5 text-amber-300 border-amber-500/20"
                    : "bg-emerald-500/5 text-emerald-300 border-emerald-500/20"
                  : "bg-rose-500/5 text-rose-300 border-rose-500/20"
              }`}>
                {previewInfo.isValid ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      {previewInfo.unsupportedCount > 0 ? (
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      <span>JSON save file verified successfully!</span>
                    </div>
                    <div>
                      Game Version: <strong className="text-white">{previewInfo.version}</strong>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                      <div>
                        Total Stats detected: <strong className="text-white">{previewInfo.totalCount}</strong>
                      </div>
                      <div className="hidden sm:block h-3 w-px bg-white/10" />
                      <div>
                        Will be imported: <strong className="text-emerald-400 font-bold">{previewInfo.supportedCount} stats</strong>
                      </div>
                    </div>
                    {previewInfo.unsupportedCount > 0 && (
                      <div className="pt-1.5 border-t border-white/5 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-amber-400 font-medium">
                            ⚠ {previewInfo.unsupportedCount} stats are not supported by the active schema configuration.
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowUnsupportedPreview(!showUnsupportedPreview)}
                            className="text-[10px] text-indigo-400 hover:text-indigo-300 underline font-semibold cursor-pointer"
                          >
                            {showUnsupportedPreview ? "Hide list" : "Show list"}
                          </button>
                        </div>
                        {showUnsupportedPreview && (
                          <div className="mt-1 p-2 rounded bg-black/40 text-[10px] font-mono text-gray-400 max-h-20 overflow-y-auto break-all border border-white/5 scrollbar-thin">
                            {previewInfo.unsupportedKeys.join(", ")}
                          </div>
                        )}
                        <p className="text-[10px] text-amber-400/80">
                          These stats are not configured in your schema and will be omitted upon import.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-start gap-2 text-rose-300 font-medium">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{previewInfo.error}</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex gap-2 justify-end">
              {isPasting && (
                <button
                  type="button"
                  onClick={() => {
                    setIsPasting(false);
                    setParseError("");
                    setShowUnsupportedPreview(false);
                  }}
                  className="px-4 py-2 border border-white/10 hover:bg-white/5 text-gray-300 text-xs font-semibold rounded-xl transition-all"
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                onClick={() => handleImport(inputJson)}
                disabled={previewInfo && !previewInfo.isValid}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Parse & Load Stats</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Stats Viewer Area */}
      {pastedData && (
        <div className="space-y-6 animate-slide-up">
          {/* Metadata Bar */}
          <div className="p-4 rounded-2xl border border-white/5 bg-gray-900/30 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="text-xs text-gray-400">
                Game Version: <strong className="text-indigo-400">{gameVersion}</strong>
              </div>
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              {gameTime != null && (
                <div className="text-xs text-gray-400">
                  Game Time: <strong className="text-white">{formatBigNumber(gameTime)} hrs</strong>
                </div>
              )}
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              <div className="text-xs text-gray-400">
                Pasted Keys: <strong className="text-white">{Object.keys(statsSource).length}</strong>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="flex items-center border border-white/10 bg-gray-950/60 rounded-xl px-3 py-1.5 focus-within:border-indigo-500 transition-all w-full sm:w-60 gap-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search stats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-white outline-none w-full placeholder-gray-500"
              />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 border-b border-white/10 pb-px overflow-x-auto scrollbar-none">
            {tabsList.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 border-b-2 font-semibold text-xs transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-indigo-500 text-indigo-300 bg-indigo-500/5"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Stats Cards Grid */}
          {filteredStats.length === 0 ? (
            <div className="glass-panel p-12 text-center text-gray-500 rounded-2xl border border-white/5">
              <Search className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <h4 className="font-semibold text-white">No stats found</h4>
              <p className="text-xs mt-1">Try adjusting your search criteria or tabs.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStats.map((stat) => {
                const formattedValue = formatStatValue(stat.value, stat.type, stat.suffix);
                const hasDescription = !!stat.desc;
                const isEditing = editingKey === stat.key;

                // Formatted raw number (shown next to the display value in scientific/raw notation)
                const displayRaw = typeof stat.value === "number"
                  ? (Math.abs(stat.value) > 1e6 ? stat.value.toExponential(4) : parseFloat(stat.value.toFixed(4)))
                  : stat.value;

                return (
                  <div
                    key={stat.key}
                    className="glass-panel glass-panel-hover p-4 rounded-2xl flex gap-3 border border-white/5 relative overflow-hidden group select-none hover:-translate-y-0.5"
                  >
                    {/* Background glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-600/5 transition-all duration-300 pointer-events-none" />

                    {/* Stat Icon */}
                    <div className="w-11 h-11 rounded-xl bg-gray-950 flex items-center justify-center p-1 border border-white/10 shrink-0 select-none">
                      <img
                        src={`/${stat.icon || "icons/menus/Prestige.webp"}`}
                        alt=""
                        className="max-w-full max-h-full object-contain filter drop-shadow select-none"
                        onError={(e) => {
                          e.target.src = "/icons/menus/Prestige.webp";
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1 flex flex-col justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors truncate relative group/name cursor-help">
                            {stat.name}
                            {hasDescription && (
                              <div className="absolute left-0 bottom-6 w-56 p-2 rounded-lg bg-gray-950 border border-white/15 text-[10px] text-gray-300 leading-normal pointer-events-none opacity-0 scale-95 origin-bottom-left group-hover/name:opacity-100 group-hover/name:scale-100 transition-all duration-200 z-30 shadow-xl font-normal">
                                {stat.desc}
                              </div>
                            )}
                          </h4>
                          
                          {!isEditing && (
                            <button
                              onClick={() => handleStartEdit(stat.key, stat.value)}
                              className="p-1 rounded hover:bg-white/5 text-gray-500 hover:text-indigo-400 transition-colors cursor-pointer"
                              title="Edit stat value"
                            >
                              <PenLine className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <div className="font-mono text-[9px] text-gray-500 opacity-60 truncate">
                          {stat.key}
                        </div>
                      </div>

                      {/* Display Value / Edit Input */}
                      {isEditing ? (
                        <div className="flex items-center gap-1.5 pt-1.5 w-full">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full bg-gray-950/80 border border-indigo-500/50 rounded px-2 py-0.5 text-xs text-white outline-none font-mono focus:ring-1 focus:ring-indigo-500/30"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSaveEdit(stat.key);
                              if (e.key === "Escape") handleCancelEdit();
                            }}
                          />
                          <button
                            onClick={() => handleSaveEdit(stat.key)}
                            className="p-1.5 rounded bg-emerald-600/20 hover:bg-emerald-600/35 border border-emerald-500/20 text-emerald-300 transition-colors cursor-pointer"
                            title="Save Changes"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="p-1.5 rounded bg-rose-600/20 hover:bg-rose-600/35 border border-rose-500/20 text-rose-300 transition-colors cursor-pointer"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-lg font-bold text-white tracking-tight pt-1 flex items-baseline gap-1.5 select-all flex-wrap">
                          <span className="text-indigo-300">{formattedValue}</span>
                          {stat.value !== parseFloat(formattedValue) && (
                            <span className="text-xs text-gray-400 font-mono opacity-80 font-normal select-none">
                              ({displayRaw})
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
