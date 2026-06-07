import React, { useState, useMemo, useEffect } from "react";
import { Search, X, Folder, Image, Grid } from "lucide-react";

// Dynamically scan the public/icons directory for png, webp, svg, jpg, and jpeg files
const iconModules = import.meta.glob("/public/icons/**/*.{png,webp,svg,jpg,jpeg}");
const allIconPaths = Object.keys(iconModules).map((key) => {
  // Strip the leading /public/ so that the paths match standard schema expectations
  return key.replace(/^\/public\//, "");
});

export default function IconPickerModal({ isOpen, onClose, onSelect, title = "Select Icon" }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Handle escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Restore focus to the trigger element when modal closes
  useEffect(() => {
    if (isOpen) {
      const triggerElement = document.activeElement;
      return () => {
        if (triggerElement && typeof triggerElement.focus === "function") {
          setTimeout(() => {
            triggerElement.focus({ preventScroll: true });
          }, 0);
        }
      };
    }
  }, [isOpen]);

  // Extract categories dynamically from folders in paths
  const categories = useMemo(() => {
    const cats = new Set();
    allIconPaths.forEach((path) => {
      const parts = path.split("/");
      if (parts.length > 2) {
        cats.add(parts[1]); // e.g. "ores" from "icons/ores/Tin_Ore.png"
      }
    });
    return ["All", ...Array.from(cats).sort()];
  }, []);

  // Filter paths by category and search string
  const filteredIcons = useMemo(() => {
    return allIconPaths.filter((path) => {
      const parts = path.split("/");
      const filename = parts[parts.length - 1].toLowerCase();
      const folder = parts.length > 2 ? parts[1] : "";
      
      const matchesSearch = filename.includes(search.toLowerCase()) || folder.toLowerCase().includes(search.toLowerCase());
      if (selectedCategory === "All") {
        return matchesSearch;
      }
      return folder === selectedCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      {/* Modal Container */}
      <div 
        className="w-full max-w-4xl overflow-hidden rounded-2xl glass-panel pulse-glow-indigo animate-slide-up flex flex-col max-h-[85vh] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-white/10 bg-indigo-950/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold tracking-tight">{title}</h3>
            <span className="bg-indigo-600/30 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-500/20">
              {allIconPaths.length} Available
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-gray-400 hover:text-white transition-all"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar (Search & Category Selector) */}
        <div className="p-4 md:p-5 border-b border-white/5 bg-gray-900/40 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search icons by name or folder..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-950/60 border border-white/10 focus:border-indigo-500 text-sm text-white pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all placeholder-gray-500 shadow-inner"
              autoFocus
            />
            {search && (
              <button 
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-all text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Categories Tab Selector */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
              <Folder className="w-3 h-3" />
              <span>Filter by Directory</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 capitalize cursor-pointer border ${
                      isActive 
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/10" 
                        : "bg-white/5 hover:bg-white/10 border-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="p-4 md:p-5 overflow-y-auto flex-1 bg-gray-950/40">
          {filteredIcons.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {filteredIcons.map((path) => {
                const parts = path.split("/");
                const filename = parts[parts.length - 1];
                const cleanName = filename.replace(/\.[^/.]+$/, "").replace(/_/g, " ");

                return (
                  <button
                    key={path}
                    onClick={() => onSelect(path)}
                    className="group flex flex-col items-center p-2 rounded-xl bg-gray-900/40 border border-white/5 hover:border-indigo-500/50 hover:bg-indigo-950/20 active:scale-95 transition-all text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    title={path}
                  >
                    {/* Transparent checkerboard background container for icon preview */}
                    <div 
                      className="w-12 h-12 rounded-lg bg-gray-950 flex items-center justify-center p-1.5 mb-1.5 shadow-inner border border-white/5 relative overflow-hidden group-hover:scale-105 transition-transform duration-200"
                      style={{
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 0)",
                        backgroundSize: "8px 8px"
                      }}
                    >
                      <img 
                        src={`/${path}`} 
                        alt={cleanName}
                        className="max-w-full max-h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                        loading="lazy"
                        onError={(e) => {
                          // Fail-safe image fallback
                          e.target.style.display = "none";
                          const label = document.createElement("div");
                          label.className = "text-[8px] font-bold text-gray-500 text-center uppercase";
                          label.innerText = "ERR";
                          e.target.parentNode.appendChild(label);
                        }}
                      />
                    </div>
                    {/* Filename text */}
                    <span className="text-[10px] font-medium text-gray-400 group-hover:text-indigo-300 truncate w-full px-0.5 font-mono leading-tight">
                      {cleanName}
                    </span>
                    <span className="text-[8px] text-gray-600 group-hover:text-indigo-400/50 truncate w-full font-mono uppercase">
                      {filename.split(".").pop()}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Grid className="w-10 h-10 text-gray-600 mb-2 animate-pulse" />
              <div className="text-sm font-semibold text-gray-400">No icons found</div>
              <div className="text-xs text-gray-500 mt-1">Try broadening your search query or folder filter.</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-gray-900/60 flex items-center justify-between text-xs text-gray-400">
          <div>
            Showing <strong className="text-white">{filteredIcons.length}</strong> of <strong className="text-white">{allIconPaths.length}</strong> total icons
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/10 hover:bg-white/5 text-xs font-bold rounded-xl text-white transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
