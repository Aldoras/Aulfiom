import React, { useMemo } from "react";
import { getStatsDiff } from "../stats/diff.js";
import { Copy, Check, Info, AlertTriangle, ArrowRight } from "lucide-react";

export default function ImportModal({ localStats, sharedStats, onConfirm, onCancel }) {
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
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white leading-tight">Shared Character Stats</h2>
              <p className="text-sm text-gray-400 mt-0.5">Compare and import statistics into your local vault</p>
            </div>
          </div>
        </div>

        {/* Diff Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {diffs.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Check className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <p className="font-semibold text-white">No differences found!</p>
              <p className="text-sm mt-1">Your stats are identical to the shared stats.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-xl text-sm">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <span>
                  Importing will overwrite your current settings. You can save a backup in local storage before importing.
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
                  <tbody className="divide-y divide-white/5 text-sm">
                    {diffs.map((d, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 text-gray-400 font-medium">{d.category}</td>
                        <td className="p-3 text-white font-medium">{d.name}</td>
                        <td className="p-3 text-right text-gray-400 line-through decoration-white/20">{d.local}</td>
                        <td className="p-3 text-center">
                          <ArrowRight className="w-4 h-4 text-gray-500 inline" />
                        </td>
                        <td className={`p-3 font-semibold ${d.isUpgrade ? 'text-emerald-400' : 'text-rose-400'}`}>
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

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-gray-900/50 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition-all text-sm font-medium"
          >
            Cancel
          </button>
          
          <button
            onClick={() => onConfirm(true)} // Import with backup
            className="px-5 py-2.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 hover:text-indigo-200 transition-all text-sm font-medium"
          >
            Backup & Import
          </button>

          <button
            onClick={() => onConfirm(false)} // Import directly
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/20 transition-all text-sm font-semibold"
          >
            Import Stats
          </button>
        </div>
      </div>
    </div>
  );
}
