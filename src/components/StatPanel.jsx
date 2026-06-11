import React, { useState } from "react";
import { ChevronDown, ChevronUp, Lock } from "lucide-react";

export default function StatPanel({ catData, stats, onUpdateField }) {
  // Tabs navigation
  const hasTabs = Array.isArray(catData.tabs) && catData.tabs.length > 0;
  const [activeTabId, setActiveTabId] = useState(hasTabs ? catData.tabs[0].id : null);

  const activeList = hasTabs
    ? catData.tabs.find((t) => t.id === activeTabId)?.stats ?? []
    : catData.stats ?? [];

  const handleUpdate = (key, val) => {
    onUpdateField(key, val);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Category Header */}
      <div className="flex flex-col items-center text-center gap-2">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          {catData.icon && (
            <img
              src={`${import.meta.env.BASE_URL}${catData.icon}`}
              alt=""
              className="w-7 h-7 object-contain"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
          <span>{catData.name}</span>
        </h2>
      </div>

      {/* Tabs */}
      {hasTabs && (
        <div className="flex flex-col items-center gap-2">
          <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider select-none opacity-80">
            Sections
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {catData.tabs.map((tab) => {
              const isActive = activeTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/20"
                      : "bg-gray-900/40 text-gray-400 border-white/10 hover:bg-white/5 hover:text-white hover:border-white/20"
                  }`}
                >
                  {tab.name ?? tab.id}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Stats list */}
      <div className="space-y-4 animate-fade-in">
        <StatList list={activeList} stats={stats} onUpdate={handleUpdate} catId={catData.id} />
      </div>
    </div>
  );
}

/* ----------------------- Render list helper ----------------------- */
function StatList({ list, stats, onUpdate, catId }) {
  // Group consecutive card-style toggles to render in a grid
  const renderedItems = [];
  let cardAccumulator = [];

  const flushCards = () => {
    if (cardAccumulator.length > 0) {
      const cards = [...cardAccumulator];
      
      // Determine grid size based on category type (exactly 3 columns for construct statues, centered)
      const gridClass =
        catId === "skillTree"
          ? "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2" // very compact for skills
          : catId === "construct"
          ? "grid grid-cols-3 gap-3 w-fit mx-auto" // exactly 3 columns for statues, centered!
          : "grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2";  // compact default

      renderedItems.push(
        <div key={`card-grid-${cards[0].key}`} className={gridClass}>
          {cards.map((c) => (
            <SkillCard key={c.key} stat={c} stats={stats} onUpdate={onUpdate} catId={catId} />
          ))}
        </div>
      );
      cardAccumulator = [];
    }
  };

  list.forEach((s) => {
    const isCard = s.type === "toggle" && (s.layout === "card" || s.layout === "card-5");
    if (isCard) {
      cardAccumulator.push(s);
    } else {
      flushCards();
      if (s.type === "section") {
        renderedItems.push(<StatSection key={s.name ?? s.desc} section={s} stats={stats} onUpdate={onUpdate} catId={catId} />);
      } else {
        renderedItems.push(<FlatStatRow key={s.key} stat={s} stats={stats} onUpdate={onUpdate} />);
      }
    }
  });
  flushCards();

  return <div className="space-y-3">{renderedItems}</div>;
}

/* ----------------------- Section Component ----------------------- */
function StatSection({ section, stats, onUpdate, catId }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-xl border border-white/5 overflow-hidden glass-panel">
      {(section.name || section.desc) && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 bg-white/5 border-b border-white/5 text-left transition-all hover:bg-white/10"
        >
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">{section.name}</h3>
            {section.desc && <p className="text-[10px] text-gray-400 mt-0.5">{section.desc}</p>}
          </div>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>
      )}
      <div className={`p-3 space-y-3 ${isOpen ? "block" : "hidden"}`}>
        <StatList list={section.stats ?? []} stats={stats} onUpdate={onUpdate} catId={catId} />
      </div>
    </div>
  );
}

/* ----------------------- Flat Row Component (More Compact) ----------------------- */
function FlatStatRow({ stat, stats, onUpdate }) {
  const val = stats[stat.key] ?? stat.default ?? 0;

  const isRange = stat.type === "range" || stat.input === "slider";
  const step = stat.step ?? 1;
  const min = stat.min ?? 0;
  const max = stat.max ?? 100;

  const hasRangeLimits = stat.min != null && stat.max != null;
  const unitLabel = getUnitLabel(stat);

  const handleTextChange = (e) => {
    let num = parseFloat(e.target.value);
    if (isNaN(num)) num = 0;
    onUpdate(stat.key, num);
  };

  const handleSliderChange = (e) => {
    onUpdate(stat.key, parseFloat(e.target.value));
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 px-4 rounded-2xl border border-white/5 bg-gray-900/20 hover:border-white/10 transition-all gap-3">
      {/* Icon & Details */}
      <div className="flex items-center space-x-3.5 flex-1 min-w-0">
        {stat.icon && (
          <img
            src={`${import.meta.env.BASE_URL}${stat.icon}`}
            alt=""
            className="w-9 h-9 object-contain p-1 bg-white/5 border border-white/10 rounded-xl flex-shrink-0"
            onError={(e) => (e.target.style.display = "none")}
          />
        )}
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-white truncate">{stat.name ?? stat.key}</h4>
          {stat.desc && <p className="text-xs text-gray-400 leading-normal line-clamp-1">{stat.desc}</p>}
        </div>
      </div>

      {/* Input controls (Sliders + precision input box) */}
      <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
        {isRange && (
          <div className="flex items-center gap-2 w-full sm:w-56 max-w-[240px]">
            {/* Slider Min Bound */}
            <span className="text-[10px] text-gray-400 font-bold w-5 text-right select-none">{min}</span>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={val}
              onChange={handleSliderChange}
              className="flex-1 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            {/* Slider Max Bound */}
            <span className="text-[10px] text-gray-400 font-bold w-5 text-left select-none">{max}</span>
          </div>
        )}

        {stat.type === "checkbox" ? (
          <button
            onClick={() => onUpdate(stat.key, !val)}
            className={`w-10 h-6 flex items-center rounded-full p-0.5 transition-all cursor-pointer ${
              val ? "bg-indigo-600" : "bg-white/10"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow transform transition-all ${
                val ? "translate-x-4" : ""
              }`}
            />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            {!isRange && hasRangeLimits && (
              <span className="text-[10px] text-gray-400 font-bold select-none">
                ({min}-{max})
              </span>
            )}
            <div className="flex items-center border border-white/10 bg-gray-950/60 rounded-xl px-2.5 py-1 focus-within:border-indigo-500 transition-all gap-1.5">
              <input
                type="number"
                min={min}
                max={max}
                step={step}
                value={val}
                onChange={handleTextChange}
                className="w-12 text-right bg-transparent text-xs text-white font-semibold outline-none"
              />
              {unitLabel && <span className="text-[10px] text-gray-400 font-semibold">{unitLabel}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ----------------------- Skill Card Component (Much Smaller Toggles) ----------------------- */
function SkillCard({ stat, stats, onUpdate, catId }) {
  const val = stats[stat.key] ?? stat.default ?? 0;
  const states = Number(stat.states ?? 2);
  
  const backingSrc = (Array.isArray(stat.images) ? stat.images[val] : null) ?? stat.icon ?? "";
  const typeSrc = stat.typeImage ?? "";

  const handleCardClick = () => {
    const next = (val + 1) % states;
    onUpdate(stat.key, next);
  };

  const isLocked = val === 0;
  const labels = stat.labels;
  const label = labels && labels[val] != null ? String(labels[val]) : (isLocked ? "Locked" : `Level ${val}`);

  // Denser sizes:
  // - construct statues: w-7 h-7
  // - skillTree skills: w-5.5 h-5.5 (extremely small)
  const imageSizeClass = catId === "skillTree" ? "w-5.5 h-5.5" : "w-7 h-7";
  const innerMinHeightClass = catId === "construct"
    ? ""
    : catId === "skillTree"
    ? "min-h-[2.5rem]"
    : "min-h-[2.8rem]";

  const cardWidthClass = catId === "construct"
    ? "w-16 h-24"
    : "";

  const nameTextSize = catId === "construct" ? "text-[8px] leading-tight px-0.5" : "text-[9px]";
  const labelTextSize = catId === "construct" ? "text-[7px]" : "text-[7px]";
  const badgeTextSize = catId === "construct" ? "text-[7px]" : "text-[7px]";
  const imageContainerClass = catId === "construct" ? "w-full h-16" : "w-full aspect-[1/1]";
  const imageFitClass = catId === "construct" ? "object-contain" : "object-cover";
  const hoverScaleClass = catId === "construct" ? "" : "group-hover:scale-105";
  const hoverTypeScaleClass = catId === "construct" ? "" : "group-hover:scale-110";

  return (
    <button
      onClick={handleCardClick}
      className={`group flex flex-col rounded-xl border overflow-hidden text-center transition-all duration-300 transform active:scale-95 glass-panel select-none relative ${cardWidthClass} ${
        isLocked
          ? "border-white/5 opacity-55 hover:opacity-85 grayscale"
          : states === 4
          ? [
              "border-indigo-500/20 shadow-[0_0_6px_rgba(99,102,241,0.06)]",
              "border-cyan-500/25 shadow-[0_0_8px_rgba(6,182,212,0.15)]",
              "border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.12)]",
              "border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.18)]"
            ][val] ?? "border-indigo-500/20"
          : "border-indigo-500/30 bg-indigo-950/5 shadow-[0_0_8px_rgba(99,102,241,0.15)] hover:border-indigo-400/50"
      }`}
    >
      <div className={`${imageContainerClass} bg-gray-950 relative flex items-center justify-center overflow-hidden`}>
        {backingSrc ? (
          <img
            src={`${import.meta.env.BASE_URL}${backingSrc}`}
            alt=""
            className={`absolute inset-0 w-full h-full ${imageFitClass} transition-transform ${hoverScaleClass}`}
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/15 to-gray-950" />
        )}

        {typeSrc && (
          <img
            src={`${import.meta.env.BASE_URL}${typeSrc}`}
            alt={stat.name}
            className={`${imageSizeClass} object-contain z-10 transition-transform ${hoverTypeScaleClass} drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)] ${
              isLocked ? "opacity-35" : ""
            }`}
            onError={(e) => (e.target.style.display = "none")}
          />
        )}

        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
            <div className="p-0.5 rounded-full bg-black/60 border border-white/10 text-gray-400">
              <Lock className="w-2.5 h-2.5" />
            </div>
          </div>
        )}

        {!isLocked && states > 2 && (
          <div className={`absolute top-1 right-1 px-1 py-0.5 rounded bg-black/75 border border-white/15 ${badgeTextSize} font-bold text-white z-20`}>
            {val}
          </div>
        )}
      </div>

      <div className={`p-1 border-t border-white/5 bg-gray-900/60 flex-1 flex flex-col justify-between ${innerMinHeightClass}`}>
        <div className={`${nameTextSize} font-bold text-white line-clamp-2 leading-tight flex-1 flex items-center justify-center`}>{stat.name}</div>
        <div
          className={`${labelTextSize} mt-0.5 uppercase tracking-wider font-semibold ${
            isLocked
              ? "text-gray-500"
              : states === 4
              ? ["text-indigo-400", "text-cyan-400", "text-amber-400", "text-emerald-400"][val]
              : "text-indigo-400"
          }`}
        >
          {label}
        </div>
      </div>
    </button>
  );
}

/* ----------------------- Utility helpers ----------------------- */
function getUnitLabel(meta) {
  if (!meta) return "";
  if (meta.unitLabel) return String(meta.unitLabel);
  const unit = meta.unit ?? meta.numberType ?? meta.format;
  if (unit === "percent") return "%";
  if (unit === "multiplier") return "x";
  return "";
}
