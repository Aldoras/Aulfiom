import React, { useState } from "react";
import { templates } from "../templates/templates.js";
import { getLinkedSheetId, setLinkedSheetId, clearLinkedSheetId } from "../templates/links.js";
import { writeStatsToSheet } from "../google/sheets.js";
import { openSpreadsheetPicker } from "../google/picker.js";
import { Link, Unlink, ArrowUpRight, Check, Loader2, AlertCircle, RefreshCw, FileSpreadsheet } from "lucide-react";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || "";

export default function SheetsExporter({
  googleToken,
  stats,
  schema,
  onGoogleSignIn
}) {
  const [links, setLinks] = useState(() => {
    const initial = {};
    templates.forEach((t) => {
      initial[t.id] = getLinkedSheetId(t.id) || "";
    });
    return initial;
  });

  const [pushing, setPushing] = useState({});
  const [reloading, setReloading] = useState({});

  const handleLink = (templateId) => {
    if (!googleToken) {
      alert("Please sign in with Google first.");
      onGoogleSignIn();
      return;
    }

    openSpreadsheetPicker({
      apiKey: API_KEY,
      oauthToken: googleToken,
      onPicked: (spreadsheetId) => {
        setLinkedSheetId(templateId, spreadsheetId);
        setLinks((prev) => ({ ...prev, [templateId]: spreadsheetId }));
      }
    });
  };

  const handleUnlink = (templateId) => {
    clearLinkedSheetId(templateId);
    setLinks((prev) => ({ ...prev, [templateId]: "" }));
  };

  const handlePush = async (templateId, isTest = false) => {
    if (!googleToken) {
      alert("Please sign in with Google first.");
      onGoogleSignIn();
      return;
    }

    const t = templates.find((x) => x.id === templateId);
    if (!t) return;

    const spreadsheetId = isTest ? t.spreadsheetId : links[templateId];
    if (!spreadsheetId) {
      alert("No spreadsheet linked.");
      return;
    }

    try {
      setPushing((prev) => ({ ...prev, [templateId]: true }));
      await writeStatsToSheet(spreadsheetId, t.mappings, stats, googleToken, schema);
      
      // Open sheet in a new tab
      window.open(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`, "_blank");
    } catch (err) {
      console.error("Push failed:", err);
      alert(`Export failed: ${err.message || err}`);
    } finally {
      setPushing((prev) => ({ ...prev, [templateId]: false }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <FileSpreadsheet className="w-8 h-8 text-emerald-400" />
          <span>Google Sheets Exporter</span>
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Directly push your tracked parameters into calculations and worksheets in your Google Drive.
        </p>
      </div>

      {/* Connection Info */}
      {!googleToken && (
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-2xl gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 flex-shrink-0 text-indigo-400" />
            <div className="text-sm">
              <strong className="text-white">Google Account Required:</strong> Connect your Google account with access to Drive to link spreadsheet copies and upload data.
            </div>
          </div>
          <button
            onClick={onGoogleSignIn}
            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 whitespace-nowrap"
          >
            Connect Account
          </button>
        </div>
      )}

      {/* Templates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((t) => {
          const linkedId = links[t.id];
          const isPushing = pushing[t.id];

          return (
            <div
              key={t.id}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between glass-panel ${
                linkedId
                  ? "border-emerald-500/20 bg-emerald-950/5 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                  : "border-white/5 bg-gray-900/40"
              }`}
            >
              {/* Header */}
              <div className="space-y-1">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-base font-bold text-white leading-snug">{t.name}</h4>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/5">
                    {t.id}
                  </span>
                </div>
                
                <div className="text-xs text-gray-500 flex items-center gap-1.5 pt-1">
                  <span>Sheet cell mapping count:</span>
                  <span className="text-gray-300 font-semibold">{Object.keys(t.mappings).length} stats</span>
                </div>
              </div>

              {/* Status details */}
              <div className="my-6 p-3.5 rounded-xl bg-gray-950/60 border border-white/5 space-y-1.5">
                <div className="text-xs font-semibold text-gray-400">Linked Spreadsheet:</div>
                {linkedId ? (
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-xs text-emerald-400 font-mono select-all truncate block flex-1">
                      {linkedId}
                    </code>
                    <button
                      onClick={() => handleUnlink(t.id)}
                      className="p-1 rounded-lg text-gray-500 hover:bg-white/5 hover:text-rose-400 transition-colors"
                      title="Clear Spreadsheet Link"
                    >
                      <Unlink className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-xs text-gray-500 italic">None. Select Link from Drive to connect.</div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2.5">
                {linkedId ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLink(t.id)}
                      className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs font-bold transition-all border border-white/10 flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Relink Copy</span>
                    </button>
                    
                    <button
                      disabled={isPushing}
                      onClick={() => handlePush(t.id)}
                      className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center gap-1.5"
                    >
                      {isPushing ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      )}
                      <span>Push Stats</span>
                    </button>
                  </div>
                ) : (
                  <button
                    disabled={!googleToken}
                    onClick={() => handleLink(t.id)}
                    className="w-full px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800/40 disabled:text-indigo-400/50 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/10"
                  >
                    <Link className="w-3.5 h-3.5" />
                    <span>Link Copy from Drive</span>
                  </button>
                )}

                {/* Optional Template Push (Test) */}
                <button
                  disabled={isPushing}
                  onClick={() => handlePush(t.id, true)}
                  className="w-full text-center py-2 text-[10px] text-gray-500 hover:text-gray-400 transition-colors uppercase tracking-wider font-semibold"
                >
                  Push to template directly (Requires edit access)
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
