import React from "react";
import { Cpu, Award, Star, Settings, FileSpreadsheet, ExternalLink, HelpCircle } from "lucide-react";

export default function Sidebar({
  schema,
  activeCategory,
  setActiveCategory,
}) {
  const customItems = [
    {
      id: "exporter",
      name: "Sheets Exporter",
      icon: "icons/menus/Craft.webp", // Fallback image or custom menu image
      isSpreadsheet: true
    },
    {
      id: "admin",
      name: "Developer Admin",
      icon: "icons/menus/Construct.webp",
      isAdmin: true
    },
    {
      id: "help",
      name: "Wiki & Help",
      icon: "icons/menus/Drones.webp", // Fallback
      isHelp: true
    }
  ];

  return (
    <aside className="w-full md:w-64 flex-shrink-0 flex flex-col glass-panel md:border-r border-b md:border-b-0 border-white/10 md:min-height-[calc(100vh-73px)]">
      {/* Category Section */}
      <div className="p-4 flex-1 space-y-6">
        <div>
          <h3 className="px-3 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Game Vault
          </h3>
          <nav className="mt-2 space-y-1">
            {schema.map((cat) => {
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
                      src={`/${cat.icon}`}
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

        {/* Integration Section */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Integrations & Info
          </h3>
          <nav className="mt-2 space-y-1">
            {customItems.map((item) => {
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
