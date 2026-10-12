import React, { useState, useRef } from "react";
import { Plus, Sparkles, AlertCircle } from "lucide-react";
import { POPULAR_ITEM_SUGGESTIONS } from "../utils/defaultTemplates";

export default function AddItemForm({ onAddItem }) {
  const [itemName, setItemName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = itemName.trim();

    if (!trimmed) {
      setError("Please enter a valid item name.");
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    onAddItem(trimmed);
    setItemName("");
    setError("");

    // Keep focus in input for fast multiple entry
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChipClick = (suggestion) => {
    onAddItem(suggestion);
    setError("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="add-item-box no-print animate-fade">
      <form onSubmit={handleSubmit}>
        <div className="add-item-form-row">
          <div className="item-input-wrapper">
            <span className="item-input-icon">
              <Plus size={18} />
            </span>
            <input
              ref={inputRef}
              type="text"
              className="item-text-input"
              placeholder="Enter catering expense item name (e.g. Chicken, Basmati Rice, Vegetables, Oil)..."
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
                if (error) setError("");
              }}
              aria-label="Item Name"
              autoComplete="off"
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ height: "48px" }}>
            <Plus size={18} style={{ color: "var(--color-gold)" }} />
            <span>Add Item</span>
          </button>
        </div>

        {error && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--color-danger)",
              fontSize: "0.8rem",
              marginTop: "8px",
              marginLeft: "4px",
            }}
          >
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

        <div className="keyboard-hint">
          💡 Tip: Type item name and press <strong>Enter</strong> to quickly add items in sequence.
        </div>
      </form>

      {/* Quick Catering Suggestions */}
      <div className="suggestions-box">
        <span className="suggestions-label">
          <Sparkles size={12} style={{ display: "inline", marginRight: "4px" }} />
          Quick Add:
        </span>
        {POPULAR_ITEM_SUGGESTIONS.slice(0, 10).map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className="chip-btn"
            onClick={() => handleChipClick(suggestion)}
            title={`Add ${suggestion}`}
          >
            + {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

