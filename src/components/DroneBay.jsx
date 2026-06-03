import React from "react";
import { Plus, Minus, Power, Zap } from "lucide-react";

export default function DroneBay({ catData, stats, onUpdateField }) {
  // Drones schema structure is a single group item
  const group = catData.stats[0]; 
  const groupKey = group.key;

  const getDroneVal = (droneId, fieldKey, def) => {
    return stats[groupKey]?.[droneId]?.[fieldKey] ?? def;
  };

  const setDroneVal = (droneId, fieldKey, val) => {
    const updatedGroup = {
      ...(stats[groupKey] ?? {}),
      [droneId]: {
        ...(stats[groupKey]?.[droneId] ?? {}),
        [fieldKey]: val,
      },
    };
    onUpdateField(groupKey, updatedGroup);
  };

  const getFieldMeta = (key) => {
    return group.fields.find((f) => f.key === key);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">{group.name}</h2>
        <p className="text-sm text-gray-400 mt-1">{group.desc}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {group.items.map((drone) => {
          const lv = getDroneVal(drone.id, "level", 0);
          const gr = getDroneVal(drone.id, "grade", 0);
          const active = getDroneVal(drone.id, "active", false);
          const fueled = getDroneVal(drone.id, "fueled", false);

          const isActiveGlow = active ? "border-emerald-500/40 bg-emerald-950/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "border-white/5 bg-gray-900/40";
          const isFueledGlow = fueled ? "ring-1 ring-amber-500/30" : "";

          return (
            <div
              key={drone.id}
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row items-center gap-5 glass-panel ${isActiveGlow} ${isFueledGlow}`}
            >
              {/* Left: Icon & Name */}
              <div className="flex flex-col items-center text-center sm:text-left sm:items-start gap-2 flex-shrink-0 w-24">
                <div className="relative group">
                  <img
                    src={`/${drone.icon}`}
                    alt={drone.label}
                    className={`w-16 h-16 object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transition-all ${
                      active ? "scale-105" : "grayscale opacity-70"
                    }`}
                  />
                  {active && (
                    <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-full -z-10 group-hover:bg-emerald-500/20" />
                  )}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white leading-tight">{drone.label}</h4>
                  <p className="text-xs text-gray-500 capitalize">{drone.id} drone</p>
                </div>
              </div>

              {/* Middle: Controls */}
              <div className="flex-1 w-full space-y-4">
                {/* Level Control */}
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-400">Level</div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setDroneVal(drone.id, "level", Math.max(0, lv - 1))}
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 active:scale-95 transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={lv}
                      onChange={(e) => setDroneVal(drone.id, "level", Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-14 text-center bg-gray-950/60 border border-white/10 focus:border-indigo-500 text-sm text-white font-semibold py-1 rounded-lg outline-none"
                    />
                    <button
                      onClick={() => setDroneVal(drone.id, "level", lv + 1)}
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 active:scale-95 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Grade Control */}
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-400">Grade</div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setDroneVal(drone.id, "grade", Math.max(0, gr - 1))}
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 active:scale-95 transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={gr}
                      onChange={(e) => setDroneVal(drone.id, "grade", Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-14 text-center bg-gray-950/60 border border-white/10 focus:border-indigo-500 text-sm text-white font-semibold py-1 rounded-lg outline-none"
                    />
                    <button
                      onClick={() => setDroneVal(drone.id, "grade", gr + 1)}
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 active:scale-95 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Switches */}
              <div className="flex flex-row sm:flex-col gap-3 justify-center w-full sm:w-auto">
                {/* Active switch */}
                <button
                  onClick={() => setDroneVal(drone.id, "active", !active)}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    active
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Power className={`w-4 h-4 ${active ? "animate-pulse" : ""}`} />
                  <span>Active</span>
                </button>

                {/* Fueled switch */}
                <button
                  onClick={() => setDroneVal(drone.id, "fueled", !fueled)}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    fueled
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                      : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Zap className="w-4 h-4" />
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
