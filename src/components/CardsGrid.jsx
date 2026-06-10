import React, { useState, useMemo } from "react";
import { Lock, Search } from "lucide-react";

export function formatCardName(key) {
  if (!key) return "";
  return key
    .replace(/_card/g, "")
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function CardsGrid({ catData, stats, onUpdateField }) {
  const [activeSection, setActiveSection] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract sections and all cards
  const sections = useMemo(() => {
    const list = ["All"];
    catData.stats.forEach((s) => {
      if (s.type === "section" && s.name) {
        list.push(s.name);
      }
    });
    return list;
  }, [catData]);

  const cards = useMemo(() => {
    const list = [];
    catData.stats.forEach((s) => {
      if (s.type === "section") {
        const secName = s.name ?? "Other";
        (s.stats ?? []).forEach((c) => {
          list.push({ ...c, section: secName });
        });
      } else {
        list.push({ ...c, section: "Other" });
      }
    });
    return list;
  }, [catData]);

  // Filter cards based on section and search
  const filteredCards = useMemo(() => {
    return cards.filter((c) => {
      const matchesSection = activeSection === "All" || c.section === activeSection;
      const matchesSearch =
        c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.key?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSection && matchesSearch;
    });
  }, [cards, activeSection, searchQuery]);

  const getCardVal = (key, def) => {
    return stats[key] ?? def;
  };

  const handleCardClick = (card) => {
    const states = Number(card.states ?? 2);
    const current = getCardVal(card.key, card.default ?? 0);
    const next = (current + 1) % states;
    onUpdateField(card.key, next);
  };

  const getRarityStyles = (state, states) => {
    if (state === 0) return {
      cardClass: "border-white/5 opacity-40 grayscale hover:opacity-75 hover:grayscale-0",
      glowClass: "",
      textClass: "text-gray-500",
      borderClass: "border-white/5"
    };

    if (states === 5) {
      if (state === 1) return { // Normal
        cardClass: "border-slate-500/20 hover:border-slate-400/30 bg-slate-900/30",
        glowClass: "shadow-[0_2px_4px_rgba(0,0,0,0.4)]",
        textClass: "text-slate-400",
        borderClass: "border-slate-500/20"
      };
      if (state === 2) return { // Gilded
        cardClass: "border-amber-500/40 bg-amber-950/5 shadow-[0_0_8px_rgba(245,158,11,0.1)] hover:border-amber-400/50 hover:shadow-[0_0_12px_rgba(245,158,11,0.18)]",
        glowClass: "shadow-[0_0_8px_rgba(245,158,11,0.12)]",
        textClass: "text-amber-400 font-semibold",
        borderClass: "border-amber-500/40"
      };
      if (state === 3) return { // Polychrome
        cardClass: "border-indigo-500/40 bg-indigo-950/5 shadow-[0_0_8px_rgba(99,102,241,0.12)] hover:border-indigo-400/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]",
        glowClass: "shadow-[0_0_10px_rgba(99,102,241,0.12)]",
        textClass: "text-indigo-300 font-semibold bg-gradient-to-r from-indigo-400 via-pink-400 to-amber-300 bg-clip-text text-transparent",
        borderClass: "border-indigo-500/40"
      };
      if (state === 4) return { // Infernal
        cardClass: "border-rose-600/40 bg-rose-950/5 shadow-[0_0_12px_rgba(225,29,72,0.18)] hover:border-rose-500/60 hover:shadow-[0_0_20px_rgba(225,29,72,0.28)] animate-pulse-slow",
        glowClass: "shadow-[0_0_15px_rgba(225,29,72,0.25)]",
        textClass: "text-rose-500 font-bold drop-shadow-[0_0_4px_rgba(225,29,72,0.35)]",
        borderClass: "border-rose-600/40"
      };
    }

    return {
      cardClass: "border-indigo-500/20 bg-indigo-900/5 hover:border-indigo-400/40",
      glowClass: "shadow-[0_2px_4px_rgba(99,102,241,0.06)]",
      textClass: "text-indigo-400",
      borderClass: "border-indigo-500/20"
    };
  };

  return (
    <div className="space-y-6 font-jakarta max-w-4xl mx-auto">
      {/* Title & Filters */}
      <div className="flex flex-col items-center text-center gap-2">
        <h2 className="text-2xl font-bold text-white tracking-tight">{catData.name}</h2>
        <p className="text-xs text-gray-400">Tap cards to cycle rarity tiers.</p>
      </div>

      {/* Search */}
      <div className="flex justify-center w-full">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-950/60 border border-white/10 hover:border-white/20 focus:border-indigo-500 text-xs text-white pl-10 pr-4 py-2 rounded-xl outline-none transition-all placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Section Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 pb-1">
        {sections.map((sec) => (
          <button
            key={sec}
            onClick={() => setActiveSection(sec)}
            className={`px-3 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all border cursor-pointer ${
              activeSection === sec
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Card Grid (Exactly 9 columns like in-game layout) */}
      <div className="flex justify-center w-full overflow-x-auto pb-2 scrollbar-thin">
        <div className="grid grid-cols-9 gap-2 w-fit">
          {filteredCards.map((c) => {
            const state = getCardVal(c.key, c.default ?? 0);
            const states = Number(c.states ?? 2);
            const backingSrc = (Array.isArray(c.images) ? c.images[state] : null) ?? c.icon ?? "";
            const typeSrc = c.typeImage ?? "";

            const { cardClass } = getRarityStyles(state, states);
            const label = Array.isArray(c.labels) ? c.labels[state] : (state === 0 ? "Locked" : `Tier ${state}`);
            const cardName = formatCardName(c.key);

            return (
              <button
                key={c.key}
                onClick={() => handleCardClick(c)}
                title={`${cardName} (${label})`}
                className={`group w-[44px] h-[60px] rounded-lg border overflow-hidden transition-all duration-200 transform active:scale-95 glass-panel select-none relative flex-shrink-0 cursor-pointer ${cardClass}`}
              >
                {/* Backing Image container */}
                <div className="absolute inset-0 w-full h-full bg-gray-950">
                  {backingSrc ? (
                    <img
                      src={`${import.meta.env.BASE_URL}${backingSrc}`}
                      alt=""
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 to-gray-950" />
                  )}
                </div>

                {/* Overlaid Type Image (centered) */}
                {typeSrc && (
                  <img
                    src={`${import.meta.env.BASE_URL}${typeSrc}`}
                    alt=""
                    className={`absolute inset-0 m-auto w-[24px] h-[24px] object-contain z-10 transition-transform group-hover:scale-110 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] ${
                      state === 0 ? "opacity-35" : ""
                    }`}
                    onError={(e) => {
                      e.target.style.visibility = "hidden";
                    }}
                  />
                )}

                {/* Lock Overlay */}
                {state === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
                    <Lock className="w-2.5 h-2.5 text-gray-400" />
                  </div>
                )}

                {/* Card Level Badge */}
                {state > 0 && (
                  <div className="absolute bottom-0.5 right-0.5 px-0.5 py-px rounded bg-black/85 border border-white/10 text-[7px] font-bold text-white z-20 leading-none">
                    {state}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {filteredCards.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No cards found matching your filter criteria.
        </div>
      )}
    </div>
  );
}
