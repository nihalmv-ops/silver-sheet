import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDanger = false,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop no-print" onClick={onCancel}>
      <div
        className="modal-dialog animate-fade"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {isDanger && (
              <span
                style={{
                  color: "var(--color-danger)",
                  background: "var(--color-danger-bg)",
                  padding: "6px",
                  borderRadius: "var(--radius-sm)",
                  display: "inline-flex",
                }}
              >
                <AlertTriangle size={18} />
              </span>
            )}
            <h3 className="modal-title">{title}</h3>
          </div>
          <button
            type="button"
            className="btn-icon"
            onClick={onCancel}
            aria-label="Close dialog"
            style={{ color: "var(--color-text-muted)" }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: "var(--color-text-body)" }}>{message}</p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`btn btn-sm ${isDanger ? "btn-danger-outline" : "btn-primary"}`}
            style={
              isDanger
                ? {
                    background: "var(--color-danger)",
                    color: "#ffffff",
                    borderColor: "var(--color-danger)",
                  }
                : {}
            }
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

