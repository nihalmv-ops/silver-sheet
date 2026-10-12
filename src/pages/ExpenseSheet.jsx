import React, { useState } from "react";
import {
  FileText,
  Calendar,
  Printer,
  Eye,
  Edit3,
  Check,
  X,
  AlertCircle,
  HelpCircle,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import AddItemForm from "../components/AddItemForm";
import ItemTable from "../components/ItemTable";
import ConfirmModal from "../components/ConfirmModal";

export default function ExpenseSheet({
  activeList,
  onUpdateListName,
  onUpdateEventDate,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onMoveItem,
  onClearItems,
  onPrintClick,
  onPreviewClick,
  onNavigateToTemplates,
}) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(activeList?.name || "");
  const [showClearModal, setShowClearModal] = useState(false);

  const items = activeList?.items || [];

  const handleStartRename = () => {
    setRenameValue(activeList?.name || "");
    setIsRenaming(true);
  };

  const handleSaveRename = () => {
    const trimmed = renameValue.trim();
    if (trimmed) {
      onUpdateListName(trimmed);
    }
    setIsRenaming(false);
  };

  const handleCancelRename = () => {
    setIsRenaming(false);
    setRenameValue(activeList?.name || "");
  };

  return (
    <div className="page-container no-print">
      {/* Top Title & Metadata Bar */}
      <div className="page-header-block">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <span className="badge badge-gold">Active Worksheet</span>
            <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
              Changes auto-saved to browser
            </span>
          </div>
          <h2 className="page-title">Catering Expense Sheet</h2>
          <p className="page-subtitle">
            Enter expense item names below. Amounts are intentionally kept blank for physical pen writing on the printed A4 sheet.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onPreviewClick}
          >
            <Eye size={15} />
            <span>A4 Preview</span>
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={onPrintClick}
          >
            <Printer size={15} style={{ color: "var(--color-gold)" }} />
            <span>Print Expense Sheet</span>
          </button>
        </div>
      </div>

      {/* Event Details Card (Editable Title & Date) */}
      <div className="event-name-display animate-fade">
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <span className="event-name-label">Event:</span>
          {isRenaming ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="text"
                className="inline-edit-input"
                style={{ width: "260px" }}
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveRename();
                  if (e.key === "Escape") handleCancelRename();
                }}
                autoFocus
                placeholder="Enter event name..."
              />
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleSaveRename}
              >
                <Check size={13} />
                <span>Save</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleCancelRename}
              >
                <X size={13} />
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="event-name-value">{activeList?.name || "Untitled Event"}</span>
              <button
                type="button"
                className="btn-icon"
                onClick={handleStartRename}
                title="Rename this event list"
                style={{ color: "var(--color-gold)" }}
              >
                <Edit3 size={15} />
              </button>
            </div>
          )}
        </div>

        {/* Optional Event Date Field */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="event-name-label">Event Date:</span>
          <input
            type="text"
            className="inline-edit-input"
            style={{ width: "160px", height: "34px", fontSize: "0.85rem" }}
            placeholder="DD/MM/YYYY or text"
            value={activeList?.eventDate || ""}
            onChange={(e) => onUpdateEventDate(e.target.value)}
            title="Set date to appear on printed A4 sheet"
          />
        </div>
      </div>

      {/* Notice Banner explaining pen entry workflow */}
      <div
        style={{
          background: "var(--color-gold-light)",
          border: "1px solid var(--color-gold-border)",
          borderRadius: "var(--radius-md)",
          padding: "10px 16px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "0.85rem",
          color: "var(--color-text-main)",
        }}
      >
        <Sparkles size={16} style={{ color: "var(--color-gold)", flexShrink: 0 }} />
        <span>
          <strong>Silver Catering Print Workflow:</strong> Only enter item names here. The amount (₹) column and total row are kept strictly blank so your event manager can write purchase costs by hand with a pen.
        </span>
      </div>

      {/* Add Item Input Form */}
      <AddItemForm onAddItem={onAddItem} />

      {/* Expense Items Table */}
      <ItemTable
        items={items}
        onUpdateItem={onUpdateItem}
        onDeleteItem={onDeleteItem}
        onMoveItem={onMoveItem}
        onClearList={() => setShowClearModal(true)}
        onQuickLoadTemplate={onNavigateToTemplates}
      />

      {/* Confirmation Modal for Clearing Items */}
      <ConfirmModal
        isOpen={showClearModal}
        title="Clear All Items?"
        message={`Are you sure you want to remove all ${items.length} items from "${activeList?.name}"? This action will reset the current item list.`}
        confirmText="Yes, Clear List"
        cancelText="Keep Items"
        isDanger={true}
        onConfirm={() => {
          onClearItems();
          setShowClearModal(false);
        }}
        onCancel={() => setShowClearModal(false)}
      />
    </div>
  );
}

