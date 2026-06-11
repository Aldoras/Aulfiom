import React from "react";
import { Cpu, Award, Star, Settings, FileSpreadsheet, ExternalLink, HelpCircle, BarChart3, Link } from "lucide-react";

export default function Sidebar({
  schema,
  activeCategory,
  setActiveCategory,
}) {
  const trackingItems = schema.filter(
    (cat) => cat.id !== "craft" && cat.id !== "floors"
  );

  const statsItem = {
    id: "stats",
    name: "Game Stats",
    isStats: true
  };

  const toolItems = [
    {
      id: "exporter",
      name: "Sheets Exporter",
      isSpreadsheet: true
    },
    {
      id: "linkerAdmin",
      name: "Linker Admin",
      isLinkerAdmin: true
    },
    {
      id: "admin",
      name: "Developer Admin",
      isAdmin: true
    },
    {
      id: "help",
      name: "Wiki & Help",
      isHelp: true
    }
  ];

  return (
    <aside className="w-full md:w-64 flex-shrink-0 flex flex-col glass-panel md:border-r border-b md:border-b-0 border-white/10 md:min-height-[calc(100vh-73px)]">
      {/* Category Section */}
      <div className="p-4 flex-1 space-y-6">
        <div>
          <h3 className="px-3 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Tracking Progress
          </h3>
          <nav className="mt-2 space-y-1">
            {trackingItems.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600/20 text-indigo-300 border-l-4 border-indigo-500 pl-2"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {cat.icon ? (
                    <img
                      src={`${import.meta.env.BASE_URL}${cat.icon}`}
                      alt=""
                      className="w-5 h-5 object-contain flex-shrink-0"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : null}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Statistics Section */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Statistics
          </h3>
          <nav className="mt-2 space-y-1">
            {(() => {
              const isActive = activeCategory === statsItem.id;
              return (
                <button
                  key={statsItem.id}
                  onClick={() => setActiveCategory(statsItem.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600/20 text-indigo-300 border-l-4 border-indigo-500 pl-2"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <BarChart3 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <span>{statsItem.name}</span>
                </button>
              );
            })()}
          </nav>
        </div>

        {/* Integrations & Tools Section */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Integrations & Info
          </h3>
          <nav className="mt-2 space-y-1">
            {toolItems.map((item) => {
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveCategory(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600/20 text-indigo-300 border-l-4 border-indigo-500 pl-2"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.isSpreadsheet ? (
                    <FileSpreadsheet className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  ) : item.isLinkerAdmin ? (
                    <Link className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  ) : item.isAdmin ? (
                    <Settings className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  ) : (
                    <HelpCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  )}
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Wiki Link footer */}
      <div className="p-4 border-t border-white/5 bg-gray-950/40">
        <a
          href="https://shminer.miraheze.org/wiki/Obelisk_Miner_Wiki"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-indigo-950/20 border border-white/5 hover:border-indigo-500/20 text-xs text-gray-400 hover:text-indigo-300 transition-all font-medium"
        >
          <span className="flex items-center gap-2">
            Wiki Database
          </span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>
  );
}
