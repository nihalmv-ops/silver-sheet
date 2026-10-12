import React from "react";
import { X, Printer, Download, Sparkles } from "lucide-react";
import PrintExpenseSheet from "./PrintExpenseSheet";

export default function PrintPreviewModal({
  isOpen,
  onClose,
  activeList,
  settings,
  onPrint,
  eventDateOverride,
  eventNameOverride,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop no-print" onClick={onClose}>
      <div
        className="modal-dialog modal-preview-dialog animate-fade"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                color: "var(--color-primary)",
                background: "var(--color-primary-subtle)",
                padding: "6px",
                borderRadius: "var(--radius-sm)",
                display: "inline-flex",
              }}
            >
              <Printer size={18} />
            </span>
            <div>
              <h3 className="modal-title">A4 Expense Sheet Print Preview</h3>
              <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", margin: 0 }}>
                Exact physical print preview for office laser / inkjet printing
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={onPrint}
            >
              <Printer size={14} style={{ color: "var(--color-gold)" }} />
              <span>Print Now</span>
            </button>

            <button
              type="button"
              className="btn-icon"
              onClick={onClose}
              aria-label="Close preview"
              style={{ color: "var(--color-text-muted)" }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="modal-preview-body">
          {/* A4 Sheet Render */}
          <PrintExpenseSheet
            activeList={activeList}
            settings={settings}
            eventDateOverride={eventDateOverride}
            eventNameOverride={eventNameOverride}
          />
        </div>

        <div className="modal-footer" style={{ justifyContent: "space-between" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
            💡 Amounts and Totals are intentionally kept blank for physical pen entry.
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClose}
            >
              Close Preview
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={onPrint}
            >
              <Printer size={14} style={{ color: "var(--color-gold)" }} />
              <span>Print Sheet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

