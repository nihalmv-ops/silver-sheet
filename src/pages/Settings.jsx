import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Printer,
  Building,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react";
import ConfirmModal from "../components/ConfirmModal";
import { exportDataAsJSON, importDataFromJSON } from "../utils/localStorage";

export default function Settings({
  settings,
  onUpdateSettings,
  onResetAllData,
  onDataImported,
}) {
  const [formData, setFormData] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [importMessage, setImportMessage] = useState(null);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdateSettings(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExport = () => {
    const jsonStr = exportDataAsJSON();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `silver_catering_expense_lists_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        const result = importDataFromJSON(content);
        if (result.success) {
          setImportMessage({
            type: "success",
            text: `Successfully imported ${result.count} lists!`,
          });
          onDataImported();
        } else {
          setImportMessage({
            type: "error",
            text: result.error || "Failed to import file.",
          });
        }
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="page-container no-print animate-fade">
      {/* Header */}
      <div className="page-header-block">
        <div>
          <span className="badge badge-gold">Configuration</span>
          <h2 className="page-title">Application Settings</h2>
          <p className="page-subtitle">
            Configure A4 printable sheet layout, caterer business details, and data backup.
          </p>
        </div>

        {savedSuccess && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--color-success)",
              background: "var(--color-success-bg)",
              padding: "6px 14px",
              borderRadius: "var(--radius-pill)",
              fontSize: "0.85rem",
              fontWeight: 500,
            }}
          >
            <CheckCircle2 size={16} />
            <span>Settings Saved</span>
          </div>
        )}
      </div>

      {/* Section 1: A4 Physical Print Layout Settings */}
      <div className="settings-section">
        <h3 className="settings-heading">
          <Printer size={18} style={{ display: "inline", marginRight: "8px", color: "var(--color-gold)" }} />
          A4 Print Sheet Layout
        </h3>
        <p className="settings-subtext">
          Control how your physical printed A4 expense sheets are formatted.
        </p>

        <div className="form-group">
          <label className="form-label">
            Minimum Rows on Printed Sheet (Pen Handwriting Padding)
          </label>
          <select
            className="form-input"
            value={formData.minPrintRows}
            onChange={(e) => handleChange("minPrintRows", parseInt(e.target.value, 10))}
          >
            <option value={15}>15 Rows (Spacious layout)</option>
            <option value={20}>20 Rows (Recommended standard A4)</option>
            <option value={25}>25 Rows (Compact spacing)</option>
            <option value={30}>30 Rows (Maximum items per page)</option>
          </select>
          <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginTop: "4px" }}>
            If you have fewer items than this count, clean blank numbered rows are generated for writing items with a pen.
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Default Currency Symbol</label>
          <input
            type="text"
            className="form-input"
            style={{ maxWidth: "120px" }}
            value={formData.currencySymbol}
            onChange={(e) => handleChange("currencySymbol", e.target.value)}
          />
        </div>
      </div>

      {/* Section 2: Business Branding & Header Information */}
      <div className="settings-section">
        <h3 className="settings-heading">
          <Building size={18} style={{ display: "inline", marginRight: "8px", color: "var(--color-gold)" }} />
          Silver Catering Business Header
        </h3>
        <p className="settings-subtext">
          Details printed in the header of the official expense sheet.
        </p>

        <div className="form-group">
          <label className="form-checkbox-label">
            <input
              type="checkbox"
              checked={formData.showAddressInPrint}
              onChange={(e) => handleChange("showAddressInPrint", e.target.checked)}
            />
            <span>Print Company Address in Header</span>
          </label>
        </div>

        {formData.showAddressInPrint && (
          <div className="form-group">
            <label className="form-label">Company Address</label>
            <input
              type="text"
              className="form-input"
              value={formData.companyAddress}
              onChange={(e) => handleChange("companyAddress", e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <label className="form-checkbox-label">
            <input
              type="checkbox"
              checked={formData.showPhoneInPrint}
              onChange={(e) => handleChange("showPhoneInPrint", e.target.checked)}
            />
            <span>Print Contact Phone Number in Header</span>
          </label>
        </div>

        {formData.showPhoneInPrint && (
          <div className="form-group">
            <label className="form-label">Contact Phone</label>
            <input
              type="text"
              className="form-input"
              value={formData.companyPhone}
              onChange={(e) => handleChange("companyPhone", e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Default "Prepared By" Name (Optional)</label>
          <input
            type="text"
            className="form-input"
            placeholder="Leave empty for blank pen signature line"
            value={formData.defaultPreparedBy}
            onChange={(e) => handleChange("defaultPreparedBy", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Default "Checked By" Name (Optional)</label>
          <input
            type="text"
            className="form-input"
            placeholder="Leave empty for blank pen signature line"
            value={formData.defaultCheckedBy}
            onChange={(e) => handleChange("defaultCheckedBy", e.target.value)}
          />
        </div>
      </div>

      {/* Section 3: Data Backup, Export & Reset */}
      <div className="settings-section">
        <h3 className="settings-heading">
          <FileSpreadsheet size={18} style={{ display: "inline", marginRight: "8px", color: "var(--color-gold)" }} />
          Data Backup & Management
        </h3>
        <p className="settings-subtext">
          Backup all your catering item lists to a JSON file or restore them anytime.
        </p>

        {importMessage && (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: "var(--radius-md)",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.85rem",
              background:
                importMessage.type === "success"
                  ? "var(--color-success-bg)"
                  : "var(--color-danger-bg)",
              color:
                importMessage.type === "success"
                  ? "var(--color-success)"
                  : "var(--color-danger)",
            }}
          >
            {importMessage.type === "success" ? (
              <CheckCircle2 size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            <span>{importMessage.text}</span>
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
          {/* Export JSON */}
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleExport}>
            <Download size={14} />
            <span>Export Backup (JSON)</span>
          </button>

          {/* Import JSON */}
          <label className="btn btn-secondary btn-sm" style={{ cursor: "pointer", margin: 0 }}>
            <Upload size={14} />
            <span>Restore Backup</span>
            <input
              type="file"
              accept=".json"
              style={{ display: "none" }}
              onChange={handleImportFile}
            />
          </label>

          {/* Reset to Defaults */}
          <button
            type="button"
            className="btn btn-danger-outline btn-sm"
            onClick={() => setShowResetModal(true)}
          >
            <RotateCcw size={14} />
            <span>Reset to Starter Templates</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <ConfirmModal
        isOpen={showResetModal}
        title="Reset All Data?"
        message="Are you sure you want to reset all item lists and settings back to the factory defaults? Any custom lists you have created will be lost unless you have exported a backup."
        confirmText="Yes, Reset Everything"
        cancelText="Cancel"
        isDanger={true}
        onConfirm={() => {
          onResetAllData();
          setShowResetModal(false);
          setSavedSuccess(true);
        }}
        onCancel={() => setShowResetModal(false)}
      />
    </div>
  );
}

