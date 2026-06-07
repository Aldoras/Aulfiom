import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import DroneBay from "./components/DroneBay.jsx";
import CardsGrid from "./components/CardsGrid.jsx";
import StatPanel from "./components/StatPanel.jsx";
import SheetsExporter from "./components/SheetsExporter.jsx";
import ImportModal from "./components/ImportModal.jsx";
import HelpSection from "./components/HelpSection.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import GameStatsViewer from "./components/GameStatsViewer.jsx";
import SkillTreePanel from "./components/SkillTreePanel.jsx";

import { statSchema } from "./stats/schema.js";
import { gameStatsCategory } from "./stats/schema/gameStats.js";
import { loadStats, saveStats } from "./stats/storage.js";
import { getSharedStatsFromUrl, clearShareUrlParam } from "./stats/sharing.js";

import { initAuth, requestSignIn, getAccessToken, hasSignedInBefore } from "./google/auth.js";
import { ensurePickerLoaded } from "./google/picker.js";

const CLIENT_ID = "327402550159-ij11pkr61ukgirnm8eomvcgt5vobveb4.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets";

export default function App() {
  const [stats, setStats] = useState(() => loadStats(statSchema));
  const [activeCategory, setActiveCategory] = useState("drones");
  const [googleToken, setGoogleToken] = useState(null);
  const [googleLibrariesReady, setGoogleLibrariesReady] = useState(false);
  const [sharedStats, setSharedStats] = useState(null);

  // Poll for Google Script load
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && window.gapi) {
        clearInterval(interval);
        setGoogleLibrariesReady(true);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Initialize Google SDKs
  useEffect(() => {
    if (googleLibrariesReady) {
      ensurePickerLoaded();
      
      initAuth({
        clientId: CLIENT_ID,
        scopes: SCOPES,
        onToken: (token) => {
          setGoogleToken(token);
        },
      });

      // Try background silent sign in if previously authorized
      if (hasSignedInBefore() && !getAccessToken()) {
        try {
          requestSignIn({ prompt: "" });
        } catch (e) {
          console.warn("Silent sign-in check failed:", e);
        }
      } else if (getAccessToken()) {
        setGoogleToken(getAccessToken());
      }
    }
  }, [googleLibrariesReady]);

  // Check for shared parameters in URL on mount
  useEffect(() => {
    const checkShare = async () => {
      const shared = await getSharedStatsFromUrl();
      if (shared) {
        setSharedStats(shared);
      }
    };
    checkShare();
  }, []);

  const handleUpdateField = (key, value) => {
    setStats((prev) => {
      const next = { ...prev, [key]: value };
      saveStats(next);
      return next;
    });
  };

  const handleGoogleSignIn = () => {
    try {
      requestSignIn({ prompt: "consent" });
    } catch (e) {
      alert("Sign-in failed. Please ensure Google script libraries are fully loaded.");
    }
  };

  const handleGoogleSignOut = () => {
    localStorage.removeItem("google_access_token");
    localStorage.removeItem("google_access_expires_at");
    localStorage.removeItem("google_signed_in");
    setGoogleToken(null);
  };

  const handleImportConfirm = (shouldBackup) => {
    if (!sharedStats) return;

    if (shouldBackup) {
      // Save backup in LocalStorage before overwriting
      localStorage.setItem("gameStats_backup_" + Date.now(), JSON.stringify(stats));
    }

    saveStats(sharedStats);
    setStats(sharedStats);
    setSharedStats(null);
    clearShareUrlParam();
    alert("Stats imported successfully!");
  };

  const handleImportCancel = () => {
    setSharedStats(null);
    clearShareUrlParam();
  };

  // Resolve category view
  const renderCategoryContent = () => {
    if (activeCategory === "stats") {
      return <GameStatsViewer catData={gameStatsCategory} />;
    }

    if (activeCategory === "exporter") {
      return (
        <SheetsExporter
          googleToken={googleToken}
          stats={stats}
          schema={statSchema}
          onGoogleSignIn={handleGoogleSignIn}
        />
      );
    }
    
    if (activeCategory === "help") {
      return <HelpSection />;
    }
    
    if (activeCategory === "admin") {
      return <AdminPanel />;
    }

    const catData = statSchema.find((c) => c.id === activeCategory);
    if (!catData) return <div className="text-gray-400">Category not found</div>;

    if (activeCategory === "drones") {
      return (
        <DroneBay
          catData={catData}
          stats={stats}
          onUpdateField={handleUpdateField}
        />
      );
    }

    if (activeCategory === "cards") {
      return (
        <CardsGrid
          catData={catData}
          stats={stats}
          onUpdateField={handleUpdateField}
        />
      );
    }

    if (activeCategory === "skillTree") {
      return (
        <SkillTreePanel
          catData={catData}
          stats={stats}
          onUpdateField={handleUpdateField}
        />
      );
    }

    // Default stats panels (Prestige, Construct, Craft, Floors)
    return (
      <StatPanel
        key={activeCategory}
        catData={catData}
        stats={stats}
        onUpdateField={handleUpdateField}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Top Nav */}
      <Header
        stats={stats}
        googleToken={googleToken}
        onGoogleSignIn={handleGoogleSignIn}
        onGoogleSignOut={handleGoogleSignOut}
        googleLibrariesReady={googleLibrariesReady}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <Sidebar
          schema={statSchema}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Content Pane */}
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto animate-slide-up">
            {renderCategoryContent()}
          </div>
        </main>
      </div>

      {/* Shared Stats Import Preview Modal */}
      {sharedStats && (
        <ImportModal
          localStats={stats}
          sharedStats={sharedStats}
          onConfirm={handleImportConfirm}
          onCancel={handleImportCancel}
        />
      )}
    </div>
  );
}
