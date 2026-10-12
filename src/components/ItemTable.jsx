import React, { useState } from "react";
import {
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Check,
  X,
  ClipboardList,
  Trash,
} from "lucide-react";

export default function ItemTable({
  items = [],
  onUpdateItem,
  onDeleteItem,
  onMoveItem,
  onClearList,
  onQuickLoadTemplate,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditValue(item.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const saveEdit = (id) => {
    const trimmed = editValue.trim();
    if (trimmed) {
      onUpdateItem(id, trimmed);
    }
    setEditingId(null);
    setEditValue("");
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      saveEdit(id);
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="content-card no-print animate-fade">
        <div className="empty-state-box">
          <div className="empty-icon-wrapper">
            <ClipboardList size={34} />
          </div>
          <h3 className="empty-title">Expense List is Empty</h3>
          <p className="empty-subtitle">
            There are no items in this expense sheet yet. Add catering items using
            the input above, or load one of our ready-made catering templates.
          </p>
          {onQuickLoadTemplate && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onQuickLoadTemplate}
            >
              Browse Event Templates
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="content-card no-print animate-fade">
      <div className="card-header">
        <div className="card-title-group">
          <h3 className="card-title">Expense Item Checklist</h3>
          <span className="badge badge-green">
            {items.length} {items.length === 1 ? "Item" : "Items"} Listed
          </span>
        </div>

        <button
          type="button"
          className="btn btn-danger-outline btn-sm"
          onClick={onClearList}
          title="Clear all items in this sheet"
        >
          <Trash size={14} />
          <span>Clear All Items</span>
        </button>
      </div>

      <div className="table-responsive">
        <table className="expense-table">
          <thead>
            <tr>
              <th className="col-index">INDEX</th>
              <th>ITEM NAME</th>
              <th className="col-action">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const isEditing = editingId === item.id;
              const autoIndex = index + 1;

              return (
                <tr key={item.id}>
                  {/* Automatic 1-based Index Number */}
                  <td className="col-index">
                    <span className="index-pill">{autoIndex}</span>
                  </td>

                  {/* Item Name (Normal or In-place Edit) */}
                  <td className="item-name-cell">
                    {isEditing ? (
                      <div className="inline-edit-box">
                        <input
                          type="text"
                          className="inline-edit-input"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, item.id)}
                          autoFocus
                          aria-label="Edit item name"
                        />
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => saveEdit(item.id)}
                          title="Save Changes"
                        >
                          <Check size={14} />
                          <span>Save</span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={cancelEdit}
                          title="Cancel Edit"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <span
                        onDoubleClick={() => startEdit(item)}
                        style={{ cursor: "pointer" }}
                        title="Double-click to edit"
                      >
                        {item.name}
                      </span>
                    )}
                  </td>

                  {/* Actions: Edit, Delete, Move Up / Down */}
                  <td className="col-action">
                    <div className="action-btn-group">
                      {/* Move Up */}
                      <button
                        type="button"
                        className="action-btn action-btn-move"
                        onClick={() => onMoveItem(index, index - 1)}
                        disabled={index === 0}
                        title="Move Up"
                        aria-label="Move item up"
                      >
                        <ArrowUp size={13} />
                      </button>

                      {/* Move Down */}
                      <button
                        type="button"
                        className="action-btn action-btn-move"
                        onClick={() => onMoveItem(index, index + 1)}
                        disabled={index === items.length - 1}
                        title="Move Down"
                        aria-label="Move item down"
                      >
                        <ArrowDown size={13} />
                      </button>

                      {/* Edit Button */}
                      {!isEditing && (
                        <button
                          type="button"
                          className="action-btn action-btn-edit"
                          onClick={() => startEdit(item)}
                          title="Edit item name"
                        >
                          <Edit2 size={13} />
                          <span>Edit</span>
                        </button>
                      )}

                      {/* Delete Button */}
                      <button
                        type="button"
                        className="action-btn action-btn-delete"
                        onClick={() => onDeleteItem(item.id)}
                        title="Delete item"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

