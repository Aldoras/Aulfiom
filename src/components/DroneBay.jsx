import React from "react";
import { Plus, Minus, Power, Zap } from "lucide-react";

export default function DroneBay({ catData, stats, onUpdateField }) {
  const getDroneVal = (droneKey, fieldKey, def) => {
    return stats[droneKey]?.[fieldKey] ?? def;
  };

  const setDroneVal = (droneKey, fieldKey, val) => {
    const updatedDrone = {
      ...(stats[droneKey] ?? { level: 0, grade: 0, active: false, fueled: false }),
      [fieldKey]: val,
    };
    onUpdateField(droneKey, updatedDrone);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">{catData.name}</h2>
        <p className="text-sm text-gray-400 mt-1">Configure each drone in your Drone Bay</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {catData.stats.map((drone) => {
          const lv = getDroneVal(drone.key, "level", 0);
          const gr = getDroneVal(drone.key, "grade", 0);
          const active = getDroneVal(drone.key, "active", false);
          const fueled = getDroneVal(drone.key, "fueled", false);

          const isActiveGlow = active
            ? "border-emerald-500/40 bg-emerald-950/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
            : "border-white/5 bg-gray-900/40";
          const isFueledGlow = fueled ? "ring-1 ring-amber-500/30" : "";

          return (
            <div
              key={drone.key}
              className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-4 glass-panel ${isActiveGlow} ${isFueledGlow}`}
            >
              {/* Left/Top: Icon & Name */}
              <div className="flex flex-col items-center text-center gap-1.5 flex-shrink-0">
                <div className="relative group">
                  <img
                    src={`${import.meta.env.BASE_URL}${drone.icon}`}
                    alt={drone.name}
                    className={`w-14 h-14 object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transition-all ${
                      active ? "scale-105" : ""
                    }`}
                  />
                  {active && (
                    <div className="absolute inset-0 bg-emerald-500/35 blur-xl rounded-full -z-10 group-hover:bg-emerald-500/50 scale-110 transition-all duration-300" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">{drone.name}</h4>
                  <p className="text-[10px] text-gray-500 capitalize">{drone.key} drone</p>
                </div>
              </div>

              {/* Middle: Controls */}
              <div className="w-full space-y-3">
                {/* Level Control */}
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-medium text-gray-400">Level</div>
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => setDroneVal(drone.key, "level", Math.max(0, lv - 1))}
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 active:scale-95 transition-all"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      value={lv}
                      onChange={(e) => setDroneVal(drone.key, "level", Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-12 text-center bg-gray-950/60 border border-white/10 focus:border-indigo-500 text-xs text-white font-semibold py-0.5 rounded-lg outline-none"
                    />
                    <button
                      onClick={() => setDroneVal(drone.key, "level", lv + 1)}
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 active:scale-95 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Grade Control */}
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-medium text-gray-400">Grade</div>
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => setDroneVal(drone.key, "grade", Math.max(0, gr - 1))}
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 active:scale-95 transition-all"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      value={gr}
                      onChange={(e) => setDroneVal(drone.key, "grade", Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-12 text-center bg-gray-950/60 border border-white/10 focus:border-indigo-500 text-xs text-white font-semibold py-0.5 rounded-lg outline-none"
                    />
                    <button
                      onClick={() => setDroneVal(drone.key, "grade", gr + 1)}
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 active:scale-95 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom: Switches */}
              <div className="flex w-full gap-2 pt-1">
                {/* Active switch */}
                <button
                  onClick={() => setDroneVal(drone.key, "active", !active)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    active
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Power className={`w-3.5 h-3.5 ${active ? "animate-pulse" : ""}`} />
                  <span>Active</span>
                </button>

                {/* Fueled switch */}
                <button
                  onClick={() => setDroneVal(drone.key, "fueled", !fueled)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    fueled
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                      : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Fueled</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
