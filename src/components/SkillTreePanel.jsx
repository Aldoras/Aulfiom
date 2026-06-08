import React from "react";
import { Lock, RotateCcw } from "lucide-react";

export default function SkillTreePanel({ catData, stats, onUpdateField }) {
  const list = catData.stats ?? [];
  
  // Dynamically calculate canvas height based on max node Y position
  const maxY = list.reduce((max, s) => Math.max(max, s.y ?? 0), 0);
  const canvasHeight = Math.max(650, maxY + 150); // Minimum height of 650px, plus padding at bottom

  const totalLevels = list.reduce((sum, s) => sum + ((s.states ?? 2) - 1), 0);
  const unlockedLevels = list.reduce((sum, s) => sum + Number(stats[s.key] ?? s.default ?? 0), 0);

  const handleNodeClick = (stat) => {
    const val = Number(stats[stat.key] ?? stat.default ?? 0);
    const states = stat.states ?? 2;
    const nextVal = (val + 1) % states;
    onUpdateField(stat.key, nextVal);
  };

  const handleResetAll = () => {
    if (window.confirm("Are you sure you want to reset all skill tree upgrades to level 0?")) {
      list.forEach((s) => {
        onUpdateField(s.key, 0);
      });
    }
  };

  // Helper to generate step connection lines
  const renderStepPath = (key, parentKey, from, to, midY, prerequisiteMet) => {
    const strokeColor = prerequisiteMet ? "#818cf8" : "#1e293b";
    const shadowColor = prerequisiteMet ? "rgba(99, 102, 241, 0.2)" : "transparent";

    return (
      <g key={`${parentKey}-${key}`}>
        {/* Glow effect lines if unlocked (toned down width and opacity) */}
        {prerequisiteMet && (
          <>
            <line x1={from.x} y1={from.y} x2={from.x} y2={midY} stroke="rgba(129, 140, 248, 0.15)" strokeWidth="6" strokeLinecap="round" className="animate-pulse" />
            <line x1={from.x} y1={midY} x2={to.x} y2={midY} stroke="rgba(129, 140, 248, 0.15)" strokeWidth="6" strokeLinecap="round" className="animate-pulse" />
            <line x1={to.x} y1={midY} x2={to.x} y2={to.y} stroke="rgba(129, 140, 248, 0.15)" strokeWidth="6" strokeLinecap="round" className="animate-pulse" />
          </>
        )}
        {/* Core connection lines */}
        <line
          x1={from.x} y1={from.y} x2={from.x} y2={midY}
          stroke={strokeColor} strokeWidth="3" strokeLinecap="round"
          style={{ filter: prerequisiteMet ? `drop-shadow(0 0 2px ${shadowColor})` : "none" }}
          className="transition-all duration-300"
        />
        <line
          x1={from.x} y1={midY} x2={to.x} y2={midY}
          stroke={strokeColor} strokeWidth="3" strokeLinecap="round"
          style={{ filter: prerequisiteMet ? `drop-shadow(0 0 2px ${shadowColor})` : "none" }}
          className="transition-all duration-300"
        />
        <line
          x1={to.x} y1={midY} x2={to.x} y2={to.y}
          stroke={strokeColor} strokeWidth="3" strokeLinecap="round"
          style={{ filter: prerequisiteMet ? `drop-shadow(0 0 2px ${shadowColor})` : "none" }}
          className="transition-all duration-300"
        />
      </g>
    );
  };

  // Helper to generate straight lines
  const renderStraightLine = (key, parentKey, from, to, prerequisiteMet) => {
    const strokeColor = prerequisiteMet ? "#818cf8" : "#1e293b";
    const shadowColor = prerequisiteMet ? "rgba(99, 102, 241, 0.2)" : "transparent";

    return (
      <g key={`${parentKey}-${key}`}>
        {prerequisiteMet && (
          <line
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="rgba(129, 140, 248, 0.15)"
            strokeWidth="6"
            strokeLinecap="round"
            className="animate-pulse"
          />
        )}
        <line
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          style={{ filter: prerequisiteMet ? `drop-shadow(0 0 2px ${shadowColor})` : "none" }}
          className="transition-all duration-300"
        />
      </g>
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Category Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full max-w-[802px] mb-5">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          {catData.icon && (
            <img
              src={`${import.meta.env.BASE_URL}${catData.icon}`}
              alt=""
              className="w-6 h-6 object-contain"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
          <span>{catData.name}</span>
          <span className="text-indigo-400 font-semibold text-sm border border-indigo-500/20 bg-indigo-500/5 px-2 py-0.5 rounded-lg shrink-0 ml-1">
            {unlockedLevels}/{totalLevels}
          </span>
        </h2>

        <button
          onClick={handleResetAll}
          className="flex items-center gap-1.5 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-bold rounded-xl transition-all active:scale-95 shadow"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Skills</span>
        </button>
      </div>

      {/* Frame Wrapper Container */}
      <div className="w-full max-w-[802px] border border-white/10 rounded-2xl bg-gray-950 shadow-[0_20px_50px_rgba(0,0,0,0.65)] mb-12 relative overflow-x-auto scrollbar-thin">
        
        {/* Starry Skill Tree Canvas */}
        <div 
          style={{ height: `${canvasHeight}px` }}
          className="w-[800px] shrink-0 relative overflow-hidden galaxy-bg select-none"
        >
          
          {/* SVG Connector Lines Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-[2]" width="100%" height="100%">
            {list.map((stat) => {
              if (!stat.prereqs || stat.prereqs.length === 0) return null;
              const toPos = { x: stat.x, y: stat.y };
              return stat.prereqs.map((prereqKey) => {
                const parentStat = list.find((s) => s.key === prereqKey);
                if (!parentStat) return null;
                const fromPos = { x: parentStat.x, y: parentStat.y };
                
                // Check if the child node (tier X+1) itself is unlocked
                const childVal = stats[stat.key] ?? stat.default ?? 0;
                const prerequisiteMet = childVal > 0;
                
                // Draw straight line or step line
                if (fromPos.x === toPos.x || fromPos.y === toPos.y) {
                  return renderStraightLine(stat.key, prereqKey, fromPos, toPos, prerequisiteMet);
                } else {
                  const midY = (fromPos.y + toPos.y) / 2;
                  return renderStepPath(stat.key, prereqKey, fromPos, toPos, midY, prerequisiteMet);
                }
              });
            })}
          </svg>

          {/* Interactive Nodes Layer */}
          {list.map((stat) => {
            const val = stats[stat.key] ?? stat.default ?? 0;
            const states = stat.states ?? 2;
            const isLocked = val === 0;

            // Determine pixel border design
            const borderClass = isLocked
              ? "border-4 border-gray-600 shadow-[inset_-2px_-2px_0_0_#1f2937,inset_2px_2px_0_0_#9ca3af,0_4px_6px_rgba(0,0,0,0.5)] bg-gray-950 grayscale hover:brightness-110"
              : "border-4 border-[#b8903c] shadow-[inset_-2px_-2px_0_0_#6c521a,inset_2px_2px_0_0_#ffd700,0_4px_10px_rgba(0,0,0,0.6)] bg-[#1c120c] hover:brightness-110";

            return (
              <div
                key={stat.key}
                style={{ left: `${stat.x}px`, top: `${stat.y}px` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
              >
                {/* Upgrade Button / Node Frame */}
                <button
                  onClick={() => handleNodeClick(stat)}
                  title={stat.name}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 group relative ${borderClass}`}
                >
                  {/* Skill Icon */}
                  {stat.typeImage && (
                    <img
                      src={`${import.meta.env.BASE_URL}${stat.typeImage}`}
                      alt={stat.name}
                      className={`w-8 h-8 object-contain filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] transition-transform group-hover:scale-110 ${
                        isLocked ? "opacity-35" : ""
                      }`}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}

                  {/* Corner Crystals for Advanced Tier Nodes */}
                  {stat.hasCrystals && (
                    <>
                      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-fuchsia-500 border border-fuchsia-300 shadow-[0_0_5px_#d946ef] rotate-45 z-20" />
                      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-fuchsia-500 border border-fuchsia-300 shadow-[0_0_5px_#d946ef] rotate-45 z-20" />
                      <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-fuchsia-500 border border-fuchsia-300 shadow-[0_0_5px_#d946ef] rotate-45 z-20" />
                      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-2 h-2 bg-fuchsia-500 border border-fuchsia-300 shadow-[0_0_5px_#d946ef] rotate-45 z-20" />
                    </>
                  )}

                  {/* Lock Overlay Icon */}
                  {isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                      <Lock className="w-3 h-3 text-gray-400" />
                    </div>
                  )}
                </button>

                {/* Dynamic Name and Level HUD Label underneath the Node with dark backdrop for maximum legibility */}
                <div className="absolute -bottom-9 flex flex-col items-center pointer-events-none w-28 text-center bg-gray-950/85 border border-white/10 px-2 py-0.5 rounded-lg shadow-lg backdrop-blur-sm z-20">
                  <span className="text-[8px] font-bold text-white/90 truncate w-full">
                    {stat.name}
                  </span>
                  <span className="text-[8px] font-bold text-indigo-300 mt-0.5">
                    {val}/{states - 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
