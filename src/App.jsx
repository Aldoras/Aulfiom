import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import DroneBay from "./components/DroneBay.jsx";
import CardsGrid from "./components/CardsGrid.jsx";
import StatPanel from "./components/StatPanel.jsx";
import SheetsExporter from "./components/SheetsExporter.jsx";
import ShareActionModal from "./components/ShareActionModal.jsx";
import DriveConflictModal from "./components/DriveConflictModal.jsx";
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
import { searchSaveFile, downloadSaveFile, createSaveFile, updateSaveFile } from "./google/drive.js";

const CLIENT_ID = "327402550159-ij11pkr61ukgirnm8eomvcgt5vobveb4.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets";

export default function App() {
  const [stats, setStats] = useState(() => loadStats(statSchema));
  const [activeCategory, setActiveCategory] = useState("drones");
  const [googleToken, setGoogleToken] = useState(null);
  const [googleLibrariesReady, setGoogleLibrariesReady] = useState(false);
  
  // Shared URL stat preview/import states
  const [sharedStats, setSharedStats] = useState(null);
  const [previewStats, setPreviewStats] = useState(null);

  // Google Drive Sync states
  const [syncStatus, setSyncStatus] = useState("none"); // "none" | "checking" | "conflict" | "syncing" | "synced" | "error" | "pending"
  const [googleFileId, setGoogleFileId] = useState(() => localStorage.getItem("google_drive_file_id") || null);
  const [cloudStats, setCloudStats] = useState(null);
  const [showConflictModal, setShowConflictModal] = useState(false);

  // Tracks the last synced string version to prevent loops
  const lastSyncedStatsRef = useRef(null);

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

  // Handle Google Drive Sync on Token login
  useEffect(() => {
    if (!googleToken) {
      setSyncStatus("none");
      return;
    }

    const checkAndSyncDrive = async () => {
      setSyncStatus("checking");
      try {
        let file = await searchSaveFile(googleToken);
        if (file) {
          localStorage.setItem("google_drive_file_id", file.id);
          setGoogleFileId(file.id);

          const driveData = await downloadSaveFile(googleToken, file.id);
          
          const localStr = JSON.stringify(stats);
          const driveStr = JSON.stringify(driveData);

          if (localStr === driveStr) {
            lastSyncedStatsRef.current = driveStr;
            setSyncStatus("synced");
          } else {
            setCloudStats(driveData);
            setSyncStatus("conflict");
            setShowConflictModal(true);
          }
        } else {
          // No file found, create it with current local stats
          setSyncStatus("syncing");
          const fileId = await createSaveFile(googleToken, stats);
          localStorage.setItem("google_drive_file_id", fileId);
          setGoogleFileId(fileId);
          lastSyncedStatsRef.current = JSON.stringify(stats);
          setSyncStatus("synced");
        }
      } catch (err) {
        console.error("Google Drive sync initialization failed:", err);
        setSyncStatus("error");
      }
    };

    checkAndSyncDrive();
  }, [googleToken]);

  // Debounced auto-sync to cloud
  useEffect(() => {
    if (
      !googleToken ||
      !googleFileId ||
      syncStatus === "none" ||
      syncStatus === "conflict" ||
      syncStatus === "checking"
    ) {
      return;
    }

    const statsStr = JSON.stringify(stats);
    // Skip if unchanged relative to last sync
    if (statsStr === lastSyncedStatsRef.current) {
      return;
    }

    setSyncStatus("pending");

    const timer = setTimeout(async () => {
      try {
        setSyncStatus("syncing");
        await updateSaveFile(googleToken, googleFileId, stats);
        lastSyncedStatsRef.current = statsStr;
        setSyncStatus("synced");
      } catch (err) {
        console.error("Auto-sync save failed:", err);
        setSyncStatus("error");
      }
    }, 3000); // 3 seconds debounce

    return () => clearTimeout(timer);
  }, [stats, googleToken, googleFileId]);

  // Force trigger sync to cloud
  const triggerSyncToCloud = async (forceStats = null) => {
    if (!googleToken || !googleFileId) return;
    const targetStats = forceStats || stats;
    try {
      setSyncStatus("syncing");
      await updateSaveFile(googleToken, googleFileId, targetStats);
      lastSyncedStatsRef.current = JSON.stringify(targetStats);
      setSyncStatus("synced");
    } catch (e) {
      console.error("Cloud sync trigger failed:", e);
      setSyncStatus("error");
    }
  };

  // Conflict Modal handlers
  const handleUseCloud = () => {
    if (!cloudStats) return;
    saveStats(cloudStats);
    setStats(cloudStats);
    lastSyncedStatsRef.current = JSON.stringify(cloudStats);
    setSyncStatus("synced");
    setShowConflictModal(false);
    setCloudStats(null);
  };

  const handleUseLocal = async () => {
    setShowConflictModal(false);
    await triggerSyncToCloud();
    setCloudStats(null);
  };

  const handleKeepSeparate = () => {
    setSyncStatus("none"); // disable sync for this session
    setShowConflictModal(false);
    setCloudStats(null);
  };

  // Stat modifications
  const handleUpdateField = (key, value) => {
    if (previewStats) {
      // In preview mode, allow edits but only to preview state, don't save to storage
      setPreviewStats((prev) => ({ ...prev, [key]: value }));
      return;
    }

    setStats((prev) => {
      const next = { ...prev, [key]: value };
      saveStats(next);
      return next;
    });
  };

  // Auth triggers
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
    localStorage.removeItem("google_drive_file_id");
    setGoogleToken(null);
    setGoogleFileId(null);
    setSyncStatus("none");
  };

  // Import workflows
  const handleImportConfirm = (shouldBackup) => {
    if (!sharedStats) return;

    if (shouldBackup) {
      // Save backup in LocalStorage before overwriting
      localStorage.setItem("gameStats_backup_" + Date.now(), JSON.stringify(stats));
    }

    saveStats(sharedStats);
    setStats(sharedStats);
    
    // If logged in, automatically sync the newly imported stats to cloud
    if (googleToken && googleFileId && syncStatus !== "none") {
      triggerSyncToCloud(sharedStats);
    }

    setSharedStats(null);
    clearShareUrlParam();
    alert("Stats imported successfully!");
  };

  const handleImportCancel = () => {
    setSharedStats(null);
    clearShareUrlParam();
  };

  const handlePreviewStart = () => {
    setPreviewStats(sharedStats);
    setSharedStats(null);
    clearShareUrlParam();
  };

  // Resolve category view
  const renderCategoryContent = () => {
    const activeStats = previewStats || stats;

    if (activeCategory === "stats") {
      return <GameStatsViewer catData={gameStatsCategory} />;
    }

    if (activeCategory === "exporter") {
      return (
        <SheetsExporter
          googleToken={googleToken}
          stats={activeStats}
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
          stats={activeStats}
          onUpdateField={handleUpdateField}
        />
      );
    }

    if (activeCategory === "cards") {
      return (
        <CardsGrid
          catData={catData}
          stats={activeStats}
          onUpdateField={handleUpdateField}
        />
      );
    }

    if (activeCategory === "skillTree") {
      return (
        <SkillTreePanel
          catData={catData}
          stats={activeStats}
          onUpdateField={handleUpdateField}
        />
      );
    }

    // Default stats panels (Prestige, Construct, Craft, Floors)
    return (
      <StatPanel
        key={activeCategory}
        catData={catData}
        stats={activeStats}
        onUpdateField={handleUpdateField}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Top Nav */}
      <Header
        stats={previewStats || stats}
        googleToken={googleToken}
        onGoogleSignIn={handleGoogleSignIn}
        onGoogleSignOut={handleGoogleSignOut}
        googleLibrariesReady={googleLibrariesReady}
        syncStatus={syncStatus}
        onOpenConflictModal={() => setShowConflictModal(true)}
        onTriggerSync={() => triggerSyncToCloud()}
      />

      {/* Preview Mode Banner */}
      {previewStats && (
        <div className="bg-gradient-to-r from-cyan-950 to-indigo-950 border-b border-cyan-500/20 text-cyan-200 text-xs px-6 py-2.5 flex items-center justify-between gap-4 select-none animate-fade-in shrink-0">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse animate-ping shrink-0" />
            <span>Preview Mode — editing shared stats is temporary and will not modify your local vault.</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSharedStats(previewStats);
                setPreviewStats(null);
              }}
              className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-lg text-cyan-100 hover:text-white font-bold transition-all text-xs cursor-pointer"
            >
              Import Stats
            </button>
            <button
              onClick={() => setPreviewStats(null)}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all text-xs cursor-pointer"
            >
              Exit Preview
            </button>
          </div>
        </div>
      )}

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

      {/* Interactive Sharing Option Modal */}
      {sharedStats && (
        <ShareActionModal
          localStats={stats}
          sharedStats={sharedStats}
          onConfirm={handleImportConfirm}
          onCancel={handleImportCancel}
          onPreview={handlePreviewStart}
        />
      )}

      {/* Google Drive Conflict Resolution Modal */}
      {showConflictModal && cloudStats && (
        <DriveConflictModal
          localStats={stats}
          cloudStats={cloudStats}
          onUseCloud={handleUseCloud}
          onUseLocal={handleUseLocal}
          onKeepSeparate={handleKeepSeparate}
        />
      )}
    </div>
  );
}
