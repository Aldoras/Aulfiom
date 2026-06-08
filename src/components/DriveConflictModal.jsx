import React, { useMemo } from "react";
import { getStatsDiff } from "../stats/diff.js";
import { CloudDownload, CloudUpload, Info, AlertTriangle, ArrowRight, X } from "lucide-react";

export default function DriveConflictModal({ localStats, cloudStats, onUseCloud, onUseLocal, onKeepSeparate }) {
  const diffs = useMemo(() => {
    if (!localStats || !cloudStats) return [];
    return getStatsDiff(localStats, cloudStats);
  }, [localStats, cloudStats]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl glass-panel pulse-glow-indigo animate-slide-up flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-indigo-950/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white leading-tight">Cloud Save Conflict</h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Your local profile differs from the one stored in Google Drive.
              </p>
            </div>
          </div>
          <button
            onClick={onKeepSeparate}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Load Cloud */}
            <button
              onClick={onUseCloud}
              className="text-left p-4 rounded-xl border border-white/5 bg-gray-900/40 hover:bg-indigo-950/20 hover:border-indigo-500/30 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg group-hover:scale-105 transition-transform">
                  <CloudDownload className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                    Use Cloud Save
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Overwrite your local data with the settings saved in Google Drive.
                  </p>
                </div>
              </div>
            </button>

            {/* Overwrite Cloud */}
            <button
              onClick={onUseLocal}
              className="text-left p-4 rounded-xl border border-white/5 bg-gray-900/40 hover:bg-indigo-950/20 hover:border-indigo-500/30 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg group-hover:scale-105 transition-transform">
                  <CloudUpload className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors">
                    Overwrite Cloud
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Upload your current local stats to Google Drive, replacing the cloud copy.
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Diffs Preview */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Differences Preview ({diffs.length} stats)
            </h4>
            
            <div className="overflow-hidden rounded-xl border border-white/5 bg-gray-950/40 max-h-[30vh] overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-wider sticky top-0">
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5">Stat</th>
                    <th className="p-2.5 text-right">Local Profile</th>
                    <th className="p-2.5 text-center"></th>
                    <th className="p-2.5 text-left">Cloud Save</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {diffs.map((d, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="p-2.5 text-gray-400 font-medium">{d.category}</td>
                      <td className="p-2.5 text-white font-medium">{d.name}</td>
                      <td className="p-2.5 text-right text-gray-300">{d.local}</td>
                      <td className="p-2.5 text-center">
                        <ArrowRight className="w-3.5 h-3.5 text-gray-500 inline align-middle" />
                      </td>
                      <td className="p-2.5 font-semibold text-cyan-400">
                        {d.shared}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-gray-900/50 flex justify-between gap-3 items-center">
          <p className="text-xs text-gray-500 leading-normal max-w-sm hidden sm:block">
            Your profiles will remain unsynced until you choose one of the options above.
          </p>
          <button
            onClick={onKeepSeparate}
            className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition-all text-sm font-medium w-full sm:w-auto text-center"
          >
            Keep Separate / Sync Later
          </button>
        </div>
      </div>
    </div>
  );
}
