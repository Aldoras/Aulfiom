import React, { useState, useMemo } from "react";
import { generateShareLink } from "../stats/sharing.js";
import { Share2, Check, LogIn, LogOut, Loader2, Award, Cpu, Star } from "lucide-react";

export default function Header({
  stats,
  googleToken,
  onGoogleSignIn,
  onGoogleSignOut,
  googleLibrariesReady,
}) {
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  // Compute live stats summaries
  const summaries = useMemo(() => {
    if (!stats) return { drones: 0, cards: 0, skills: 0 };

    let dronesActive = 0;
    Object.values(stats ?? {}).forEach((val) => {
      if (val && typeof val === "object" && val.active) {
        dronesActive++;
      }
    });

    let cardsUnlocked = 0;
    Object.entries(stats).forEach(([key, val]) => {
      if (key.endsWith("_card") && typeof val === "number" && val > 0) {
        cardsUnlocked++;
      }
    });

    let skillsUnlocked = 0;
    Object.entries(stats).forEach(([key, val]) => {
      if (key.endsWith("Skill") && typeof val === "number" && val > 0) {
        skillsUnlocked++;
      }
    });

    return { drones: dronesActive, cards: cardsUnlocked, skills: skillsUnlocked };
  }, [stats]);

  const handleShare = async () => {
    try {
      setSharing(true);
      const link = await generateShareLink(stats);
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link:", err);
      alert("Could not generate share link.");
    } finally {
      setSharing(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Title */}
      <div className="flex items-center space-x-3">
        <img
          src="/icons/menus/Prestige.webp"
          alt="Obelisk"
          className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] animate-pulse"
        />
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            Idle Obelisk Miner <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Community Hub</span>
          </h1>
          <p className="text-xs text-gray-400">Track your stats, view character builds, and export to calculators</p>
        </div>
      </div>

      {/* Mini Stats Summary */}
      <div className="hidden lg:flex items-center gap-6 bg-white/5 border border-white/5 px-4 py-2 rounded-xl text-xs text-gray-300">
        <div className="flex items-center gap-1.5">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>Active Drones: <strong className="text-white">{summaries.drones}/5</strong></span>
        </div>
        <div className="h-4 w-px bg-white/10" />
        <div className="flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Cards Levelled: <strong className="text-white">{summaries.cards}</strong></span>
        </div>
        <div className="h-4 w-px bg-white/10" />
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-violet-400" />
          <span>Skill Tree: <strong className="text-white">{summaries.skills}</strong></span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3 justify-end">
        {/* Share Button */}
        <button
          onClick={handleShare}
          disabled={sharing}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md ${
            copied
              ? "bg-emerald-600 text-white shadow-emerald-600/10"
              : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/10 hover:shadow-indigo-600/20"
          }`}
        >
          {sharing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}
          <span>{copied ? "Link Copied!" : "Share Character"}</span>
        </button>

        {/* Google Authentication */}
        {!googleLibrariesReady ? (
          <button
            disabled
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-gray-500 border border-white/5 text-sm font-medium"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Google Drive API</span>
          </button>
        ) : googleToken ? (
          <button
            onClick={onGoogleSignOut}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/20 text-rose-300 hover:text-rose-200 transition-all text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        ) : (
          <button
            onClick={onGoogleSignIn}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-white transition-all text-sm font-semibold"
          >
            <LogIn className="w-4 h-4 text-indigo-400" />
            <span>Sign in with Google</span>
          </button>
        )}
      </div>
    </header>
  );
}
