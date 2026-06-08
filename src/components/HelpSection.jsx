import React from "react";
import { BookOpen, ExternalLink, Share2, FileSpreadsheet, Zap } from "lucide-react";

export default function HelpSection() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-amber-400" />
          <span>Wiki & Help Database</span>
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Learn how to use the ACLIOM linker and share characters with fellow players.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Info panel 1 */}
        <div className="p-6 rounded-2xl border border-white/5 bg-gray-900/40 glass-panel space-y-3">
          <div className="flex items-center gap-2 text-indigo-400">
            <Share2 className="w-5 h-5" />
            <h3 className="font-bold text-white">How URL Sharing Works</h3>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            By clicking <strong className="text-white">Share Character</strong> in the header, your active level metrics are instantly compressed using standard deflate compression.
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            This creates a short URL containing all parameter changes. You can send this link to other players. When they open it, they can preview changes side-by-side and choose to import them.
          </p>
        </div>

        {/* Info panel 2 */}
        <div className="p-6 rounded-2xl border border-white/5 bg-gray-900/40 glass-panel space-y-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <FileSpreadsheet className="w-5 h-5" />
            <h3 className="font-bold text-white">Google Sheet Linking</h3>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Many Idle Obelisk Miner calculators are built on Google Sheets. To connect your copy:
          </p>
          <ol className="text-xs text-gray-400 list-decimal pl-4 space-y-1">
            <li>Open the sheet calculator in Google Drive and create a personal copy.</li>
            <li>In this app, sign in with Google in the header.</li>
            <li>Go to the <strong className="text-white">Sheets Exporter</strong> panel and click "Link Copy".</li>
            <li>Select your copy inside the Google Drive picker window.</li>
            <li>Click "Push Stats" to sync your active state into your spreadsheet ranges instantly!</li>
          </ol>
        </div>
      </div>

      {/* Wiki Resources */}
      <div className="p-6 rounded-2xl border border-indigo-500/10 bg-indigo-950/10 space-y-4">
        <h3 className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-wider text-indigo-400">
          <Zap className="w-4 h-4" />
          Useful Wiki Links
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <a
            href="https://shminer.miraheze.org/wiki/Drones"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-950/20 text-gray-300 hover:text-indigo-200 transition-all font-medium"
          >
            <span>Drones Database</span>
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
          </a>

          <a
            href="https://shminer.miraheze.org/wiki/Cards"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-950/20 text-gray-300 hover:text-indigo-200 transition-all font-medium"
          >
            <span>Collectible Cards Info</span>
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
          </a>

          <a
            href="https://shminer.miraheze.org/wiki/Skill_Tree"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-950/20 text-gray-300 hover:text-indigo-200 transition-all font-medium"
          >
            <span>Skill Tree Allocations</span>
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
          </a>

          <a
            href="https://shminer.miraheze.org/wiki/Prestige"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-950/20 text-gray-300 hover:text-indigo-200 transition-all font-medium"
          >
            <span>Prestige Multipliers</span>
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
