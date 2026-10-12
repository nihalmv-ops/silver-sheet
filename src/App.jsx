import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import PrintExpenseSheet from "./components/PrintExpenseSheet";
import PrintPreviewModal from "./components/PrintPreviewModal";

import Dashboard from "./pages/Dashboard";
import ExpenseSheet from "./pages/ExpenseSheet";
import SavedLists from "./pages/SavedLists";
import Settings from "./pages/Settings";

import {
  loadSavedLists,
  saveSavedLists,
  getActiveListId,
  setActiveListId,
  loadSettings,
  saveSettings,
  resetAllDataToDefault,
} from "./utils/localStorage";

import "./styles/global.css";
import "./styles/dashboard.css";
import "./styles/print.css";

export default function App() {
  const [lists, setLists] = useState(() => loadSavedLists());
  const [activeListId, setActiveListIdState] = useState(() =>
    getActiveListId(loadSavedLists())
  );
  const [settings, setSettings] = useState(() => loadSettings());
  const [activeTab, setActiveTab] = useState("expense-sheet");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  // Sync active list
  const activeList =
    lists.find((l) => l.id === activeListId) || lists[0] || null;

  // Persist lists changes
  useEffect(() => {
    saveSavedLists(lists);
  }, [lists]);

  // Persist active list ID
  useEffect(() => {
    if (activeListId) {
      setActiveListId(activeListId);
    }
  }, [activeListId]);

  // Persist settings
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  // --- ITEM MANAGEMENT ACTIONS ---

  const handleAddItem = (itemName) => {
    if (!activeList) return;
    const newItem = {
      id: "item-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      name: itemName,
    };

    const updatedLists = lists.map((list) => {
      if (list.id === activeList.id) {
        return {
          ...list,
          items: [...(list.items || []), newItem],
          updatedAt: new Date().toISOString(),
        };
      }
      return list;
    });

    setLists(updatedLists);
  };

  const handleUpdateItem = (itemId, newName) => {
    if (!activeList) return;
    const updatedLists = lists.map((list) => {
      if (list.id === activeList.id) {
        return {
          ...list,
          items: (list.items || []).map((item) =>
            item.id === itemId ? { ...item, name: newName } : item
          ),
          updatedAt: new Date().toISOString(),
        };
      }
      return list;
    });

    setLists(updatedLists);
  };

  const handleDeleteItem = (itemId) => {
    if (!activeList) return;
    const updatedLists = lists.map((list) => {
      if (list.id === activeList.id) {
        return {
          ...list,
          items: (list.items || []).filter((item) => item.id !== itemId),
          updatedAt: new Date().toISOString(),
        };
      }
      return list;
    });

    setLists(updatedLists);
  };

  const handleMoveItem = (fromIndex, toIndex) => {
    if (!activeList) return;
    const items = [...(activeList.items || [])];
    if (toIndex < 0 || toIndex >= items.length) return;

    const [moved] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, moved);

    const updatedLists = lists.map((list) => {
      if (list.id === activeList.id) {
        return {
          ...list,
          items,
          updatedAt: new Date().toISOString(),
        };
      }
      return list;
    });

    setLists(updatedLists);
  };

  const handleClearItems = () => {
    if (!activeList) return;
    const updatedLists = lists.map((list) => {
      if (list.id === activeList.id) {
        return {
          ...list,
          items: [],
          updatedAt: new Date().toISOString(),
        };
      }
      return list;
    });

    setLists(updatedLists);
  };

  // --- LIST MANAGEMENT ACTIONS ---

  const handleUpdateListName = (newName) => {
    if (!activeList) return;
    const updatedLists = lists.map((list) => {
      if (list.id === activeList.id) {
        return {
          ...list,
          name: newName,
          updatedAt: new Date().toISOString(),
        };
      }
      return list;
    });

    setLists(updatedLists);
  };

  const handleUpdateEventDate = (newDate) => {
    if (!activeList) return;
    const updatedLists = lists.map((list) => {
      if (list.id === activeList.id) {
        return {
          ...list,
          eventDate: newDate,
          updatedAt: new Date().toISOString(),
        };
      }
      return list;
    });

    setLists(updatedLists);
  };

  const handleCreateList = (name, description = "") => {
    const newList = {
      id: "list-" + Date.now(),
      name,
      description,
      eventDate: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: [],
    };

    const updatedLists = [newList, ...lists];
    setLists(updatedLists);
    setActiveListIdState(newList.id);
    setActiveTab("expense-sheet");
  };

  const handleDuplicateList = (listId) => {
    const target = lists.find((l) => l.id === listId);
    if (!target) return;

    const duplicated = {
      ...target,
      id: "list-" + Date.now(),
      name: `${target.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: (target.items || []).map((item) => ({
        ...item,
        id: "item-" + Math.random().toString(36).substring(2, 9),
      })),
    };

    const updatedLists = [duplicated, ...lists];
    setLists(updatedLists);
    setActiveListIdState(duplicated.id);
  };

  const handleRenameList = (listId, newName) => {
    const updatedLists = lists.map((l) => {
      if (l.id === listId) {
        return { ...l, name: newName, updatedAt: new Date().toISOString() };
      }
      return l;
    });
    setLists(updatedLists);
  };

  const handleDeleteList = (listId) => {
    const remaining = lists.filter((l) => l.id !== listId);
    if (remaining.length === 0) return;

    setLists(remaining);
    if (activeListId === listId) {
      setActiveListIdState(remaining[0].id);
    }
  };

  const handleSwitchActiveList = (listId) => {
    setActiveListIdState(listId);
  };

  // --- PRINT ACTIONS ---

  const handleTriggerPrint = () => {
    window.print();
  };

  // --- SETTINGS ACTIONS ---

  const handleResetAllData = () => {
    const result = resetAllDataToDefault();
    if (result) {
      setLists(result.lists);
      setSettings(result.settings);
      setActiveListIdState(result.activeId);
      setActiveTab("expense-sheet");
    }
  };

  const handleDataImported = () => {
    const reloadedLists = loadSavedLists();
    const reloadedSettings = loadSettings();
    setLists(reloadedLists);
    setSettings(reloadedSettings);
    if (reloadedLists.length > 0) {
      setActiveListIdState(reloadedLists[0].id);
    }
  };

  const totalItemsCount = activeList?.items?.length || 0;

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeList={activeList}
        totalItemsCount={totalItemsCount}
        savedListsCount={lists.length}
        onPrintClick={handleTriggerPrint}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Workspace */}
      <div className="main-wrapper">
        <Header
          activeTab={activeTab}
          activeList={activeList}
          totalItemsCount={totalItemsCount}
          onOpenSidebar={() => setSidebarOpen(true)}
          onPrintClick={handleTriggerPrint}
          onPreviewClick={() => setPreviewModalOpen(true)}
        />

        {/* Tab Content */}
        <main>
          {activeTab === "expense-sheet" && (
            <ExpenseSheet
              activeList={activeList}
              onUpdateListName={handleUpdateListName}
              onUpdateEventDate={handleUpdateEventDate}
              onAddItem={handleAddItem}
              onUpdateItem={handleUpdateItem}
              onDeleteItem={handleDeleteItem}
              onMoveItem={handleMoveItem}
              onClearItems={handleClearItems}
              onPrintClick={handleTriggerPrint}
              onPreviewClick={() => setPreviewModalOpen(true)}
              onNavigateToTemplates={() => setActiveTab("saved-lists")}
            />
          )}

          {activeTab === "dashboard" && (
            <Dashboard
              activeList={activeList}
              allLists={lists}
              totalItemsCount={totalItemsCount}
              onNavigateTab={setActiveTab}
              onPrintClick={handleTriggerPrint}
              onPreviewClick={() => setPreviewModalOpen(true)}
              onSwitchActiveList={handleSwitchActiveList}
              onCreateNewList={() => setActiveTab("saved-lists")}
            />
          )}

          {activeTab === "saved-lists" && (
            <SavedLists
              lists={lists}
              activeListId={activeListId}
              onOpenList={(id) => {
                handleSwitchActiveList(id);
                setActiveTab("expense-sheet");
              }}
              onCreateList={handleCreateList}
              onDuplicateList={handleDuplicateList}
              onRenameList={handleRenameList}
              onDeleteList={handleDeleteList}
            />
          )}

          {activeTab === "settings" && (
            <Settings
              settings={settings}
              onUpdateSettings={setSettings}
              onResetAllData={handleResetAllData}
              onDataImported={handleDataImported}
            />
          )}
        </main>
      </div>

      {/* Dedicated A4 Sheet for Physical Window.Print() */}
      {/* In screen mode, this is hidden by CSS. When window.print() is called, print.css displays ONLY this! */}
      <div className="screen-only" style={{ display: "none" }}>
        <PrintExpenseSheet activeList={activeList} settings={settings} />
      </div>
      <div className="printable-sheet-container print-only">
        <PrintExpenseSheet activeList={activeList} settings={settings} />
      </div>

      {/* Interactive On-screen Print Preview Modal */}
      <PrintPreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        activeList={activeList}
        settings={settings}
        onPrint={handleTriggerPrint}
      />
    </div>
  );
}
