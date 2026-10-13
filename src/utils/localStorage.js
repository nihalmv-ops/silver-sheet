import { DEFAULT_CATERING_TEMPLATES } from "./defaultTemplates";

const STORAGE_KEYS = {
  LISTS: "silver_catering_lists_v1",
  ACTIVE_ID: "silver_catering_active_list_id_v1",
  SETTINGS: "silver_catering_settings_v1",
};

export const DEFAULT_SETTINGS = {
  minPrintRows: 30, // Recommended 30 rows on A4 sheet
  showAddressInPrint: true,
  showPhoneInPrint: true,
  companyName: "SILVER CATERING",
  subtitle: "EXPENSE SHEET",
  companyAddress: "Thalakuttiparambil House, Mecheriparambu, Irimbiliyam PO, Valanchery, Kerala - 679572",
  companyPhone: "+91 98464 15767",
  currencySymbol: "₹",
  autoSaveStatus: true,
};

/**
 * Loads all saved lists from localStorage.
 * If empty or first visit, seeds with default templates.
 */
export function loadSavedLists() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LISTS);
    if (!raw) {
      // First time initialization
      const initial = JSON.parse(JSON.stringify(DEFAULT_CATERING_TEMPLATES));
      saveSavedLists(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_CATERING_TEMPLATES;
  } catch (err) {
    console.error("Failed to load lists from localStorage:", err);
    return DEFAULT_CATERING_TEMPLATES;
  }
}

/**
 * Saves all lists to localStorage.
 */
export function saveSavedLists(lists) {
  try {
    localStorage.setItem(STORAGE_KEYS.LISTS, JSON.stringify(lists));
  } catch (err) {
    console.error("Failed to save lists to localStorage:", err);
  }
}

/**
 * Retrieves the currently active list ID.
 */
export function getActiveListId(availableLists = []) {
  try {
    const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_ID);
    if (activeId && availableLists.some((l) => l.id === activeId)) {
      return activeId;
    }
    if (availableLists.length > 0) {
      return availableLists[0].id;
    }
    return "";
  } catch (err) {
    console.error("Failed to get active list id:", err);
    return availableLists[0]?.id || "";
  }
}

/**
 * Persists the active list ID.
 */
export function setActiveListId(id) {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ID, id);
  } catch (err) {
    console.error("Failed to set active list id:", err);
  }
}

/**
 * Loads user settings.
 */
export function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    console.error("Failed to load settings:", err);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Saves user settings.
 */
export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.error("Failed to save settings:", err);
  }
}

/**
 * Resets all data to initial defaults.
 */
export function resetAllDataToDefault() {
  try {
    localStorage.removeItem(STORAGE_KEYS.LISTS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_ID);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    return {
      lists: JSON.parse(JSON.stringify(DEFAULT_CATERING_TEMPLATES)),
      settings: DEFAULT_SETTINGS,
      activeId: DEFAULT_CATERING_TEMPLATES[0].id,
    };
  } catch (err) {
    console.error("Failed to reset data:", err);
    return null;
  }
}

/**
 * Exports data as a JSON string for user backup.
 */
export function exportDataAsJSON() {
  const lists = loadSavedLists();
  const settings = loadSettings();
  const exportPayload = {
    app: "Silver Catering Expense Sheet Generator",
    version: "1.0",
    exportDate: new Date().toISOString(),
    lists,
    settings,
  };
  return JSON.stringify(exportPayload, null, 2);
}

/**
 * Imports data from a JSON string.
 */
export function importDataFromJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed && Array.isArray(parsed.lists)) {
      saveSavedLists(parsed.lists);
      if (parsed.settings) {
        saveSettings({ ...DEFAULT_SETTINGS, ...parsed.settings });
      }
      if (parsed.lists.length > 0) {
        setActiveListId(parsed.lists[0].id);
      }
      return { success: true, count: parsed.lists.length };
    }
    return { success: false, error: "Invalid file format. 'lists' array missing." };
  } catch (err) {
    return { success: false, error: err.message || "Failed to parse JSON file." };
  }
}
