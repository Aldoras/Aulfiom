import React, { useState, useMemo } from "react";
import { getStatsDiff } from "../stats/diff.js";
import { Eye, GitCompare, Download, ArrowLeft, ArrowRight, Info, AlertTriangle, Check, X } from "lucide-react";

export default function ShareActionModal({ localStats, sharedStats, onConfirm, onCancel, onPreview }) {
  const [mode, setMode] = useState("choice"); // "choice" | "compare"

  const diffs = useMemo(() => {
    if (!localStats || !sharedStats) return [];
    return getStatsDiff(localStats, sharedStats);
  }, [localStats, sharedStats]);

  if (!sharedStats) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl glass-panel pulse-glow-indigo animate-slide-up flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-indigo-950/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              {mode === "choice" ? <Info className="w-6 h-6" /> : <GitCompare className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white leading-tight">
                {mode === "choice" ? "Shared Character Profile" : "Compare Profiles"}
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                {mode === "choice"
                  ? "A character setup has been shared. Select how to proceed."
                  : "Review side-by-side differences between your profile and the shared one."}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {mode === "choice" ? (
            <div className="space-y-4">
              {/* Option 1: Preview */}
              <button
                onClick={onPreview}
                className="w-full text-left p-4 rounded-xl border border-white/5 bg-gray-900/40 hover:bg-indigo-950/20 hover:border-indigo-500/30 transition-all flex items-start gap-4 group"
              >
                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Eye className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                    Preview Profile (View Only)
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Inspect their active stats, cards, drones, and prestige trees inside the application. Your local stats will not be touched.
                  </p>
                </div>
              </button>

              {/* Option 2: Compare */}
              <button
                onClick={() => setMode("compare")}
                className="w-full text-left p-4 rounded-xl border border-white/5 bg-gray-900/40 hover:bg-indigo-950/20 hover:border-indigo-500/30 transition-all flex items-start gap-4 group"
              >
                <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                  <GitCompare className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors">
                    Compare Profiles
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    See a detailed table of differences showing what level changes, upgrades, and unlocks exist between your profile and theirs.
                  </p>
                </div>
              </button>

              {/* Option 3: Import */}
              <button
                onClick={() => onConfirm(true)} // Default import with backup
                className="w-full text-left p-4 rounded-xl border border-white/5 bg-gray-900/40 hover:bg-indigo-950/20 hover:border-indigo-500/30 transition-all flex items-start gap-4 group"
              >
                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Download className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors">
                    Backup & Import Stats
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Directly load all shared stats into your active profile. Automatically saves a restore point of your current profile in local storage.
                  </p>
                </div>
              </button>
            </div>
          ) : (
            /* Compare Mode (Diff Table) */
            <div className="space-y-4">
              {diffs.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Check className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <p className="font-semibold text-white">No differences found!</p>
                  <p className="text-sm mt-1">Your local stats are identical to the shared stats.</p>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 p-3 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-xl text-xs">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                    <span>
                      Review the differences below. Yellow values represent upgrades relative to your current settings.
                    </span>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-white/5 bg-gray-950/40">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/5 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                          <th className="p-3">Category</th>
                          <th className="p-3">Stat</th>
                          <th className="p-3 text-right">Current</th>
                          <th className="p-3 text-center"></th>
                          <th className="p-3 text-left">Imported</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-xs">
                        {diffs.map((d, i) => (
                          <tr key={i} className="hover:bg-white/5 transition-colors">
                            <td className="p-3 text-gray-400 font-medium">{d.category}</td>
                            <td className="p-3 text-white font-medium">{d.name}</td>
                            <td className="p-3 text-right text-gray-400 line-through decoration-white/20">{d.local}</td>
                            <td className="p-3 text-center">
                              <ArrowRight className="w-3.5 h-3.5 text-gray-500 inline align-middle" />
                            </td>
                            <td className={`p-3 font-semibold ${d.isUpgrade ? 'text-amber-400' : 'text-cyan-400'}`}>
                              {d.shared}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-gray-900/50 flex flex-col sm:flex-row gap-3 sm:justify-end">
          {mode === "compare" ? (
            <>
              <button
                onClick={() => setMode("choice")}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition-all text-sm font-medium flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex-1 hidden sm:block" />

              <button
                onClick={() => onConfirm(true)} // Backup & Import
                className="px-5 py-2.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 hover:text-indigo-200 transition-all text-sm font-medium"
              >
                Backup & Import
              </button>

              <button
                onClick={() => onConfirm(false)} // Overwrite directly
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/20 transition-all text-sm font-semibold"
              >
                Import directly
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onCancel}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition-all text-sm font-medium"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
