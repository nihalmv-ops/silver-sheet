import React, { useState } from "react";
import {
  FolderHeart,
  Plus,
  Copy,
  Trash2,
  Edit2,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Calendar,
  AlertCircle,
  X,
} from "lucide-react";
import ConfirmModal from "../components/ConfirmModal";

export default function SavedLists({
  lists,
  activeListId,
  onOpenList,
  onCreateList,
  onDuplicateList,
  onRenameList,
  onDeleteList,
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newListDesc, setNewListDesc] = useState("");

  const [renameTarget, setRenameTarget] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null);

  // Handle Create New List
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const trimmed = newListName.trim();
    if (!trimmed) return;
    onCreateList(trimmed, newListDesc.trim());
    setNewListName("");
    setNewListDesc("");
    setShowCreateModal(false);
  };

  // Handle Rename
  const handleOpenRename = (list) => {
    setRenameTarget(list);
    setRenameValue(list.name);
  };

  const handleSaveRename = (e) => {
    e.preventDefault();
    const trimmed = renameValue.trim();
    if (trimmed && renameTarget) {
      onRenameList(renameTarget.id, trimmed);
    }
    setRenameTarget(null);
    setRenameValue("");
  };

  return (
    <div className="page-container no-print animate-fade">
      {/* Header */}
      <div className="page-header-block">
        <div>
          <span className="badge badge-gold">Reusable Templates</span>
          <h2 className="page-title">Saved Item Lists</h2>
          <p className="page-subtitle">
            Create and manage reusable item templates for different catering events (Weddings, Receptions, Birthdays, Sadhyas).
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={16} style={{ color: "var(--color-gold)" }} />
          <span>Create New List</span>
        </button>
      </div>

      {/* Grid of Lists */}
      <div className="lists-grid">
        {lists.map((list) => {
          const isActive = list.id === activeListId;
          const items = list.items || [];
          const previewItems = items.slice(0, 5);
          const remainingCount = items.length - previewItems.length;

          return (
            <div
              key={list.id}
              className={`list-card ${isActive ? "active-list" : ""}`}
            >
              {isActive && (
                <div className="list-card-badge">
                  <span className="badge badge-gold">Active</span>
                </div>
              )}

              <h3 className="list-card-title">{list.name}</h3>
              <p className="list-card-desc">
                {list.description || "Custom catering expense template"}
              </p>

              {/* Items Preview Chips */}
              <div className="list-card-items-preview">
                {items.length === 0 ? (
                  <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                    No items yet. Open sheet to add items.
                  </span>
                ) : (
                  <div className="preview-tag-list">
                    {previewItems.map((item, idx) => (
                      <span key={item.id || idx} className="preview-tag">
                        {item.name}
                      </span>
                    ))}
                    {remainingCount > 0 && (
                      <span className="preview-more-tag">
                        +{remainingCount} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="list-card-footer">
                <span className="list-card-count">
                  {items.length} {items.length === 1 ? "Item" : "Items"}
                </span>

                <div className="list-card-actions">
                  {/* Duplicate Button */}
                  <button
                    type="button"
                    className="action-btn action-btn-move"
                    onClick={() => onDuplicateList(list.id)}
                    title="Duplicate this list"
                  >
                    <Copy size={13} />
                  </button>

                  {/* Rename Button */}
                  <button
                    type="button"
                    className="action-btn action-btn-edit"
                    onClick={() => handleOpenRename(list)}
                    title="Rename this list"
                  >
                    <Edit2 size={13} />
                  </button>

                  {/* Delete Button (can delete if there's more than 1 list) */}
                  <button
                    type="button"
                    className="action-btn action-btn-delete"
                    onClick={() => setDeleteTarget(list)}
                    title="Delete this list"
                    disabled={lists.length <= 1}
                  >
                    <Trash2 size={13} />
                  </button>

                  {/* Open List Button */}
                  <button
                    type="button"
                    className={`btn btn-sm ${isActive ? "btn-gold" : "btn-primary"}`}
                    style={{ marginLeft: "4px" }}
                    onClick={() => onOpenList(list.id)}
                  >
                    {isActive ? (
                      <>
                        <CheckCircle size={13} />
                        <span>Loaded</span>
                      </>
                    ) : (
                      <>
                        <ExternalLink size={13} />
                        <span>Open Sheet</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Create New List */}
      {showCreateModal && (
        <div
          className="modal-backdrop no-print"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="modal-dialog animate-fade"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-header">
              <h3 className="modal-title">Create New Event List</h3>
              <button
                type="button"
                className="btn-icon"
                onClick={() => setShowCreateModal(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Event / List Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Reception Dinner, Housewarming Sadhya..."
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 500 Guests Evening Buffet..."
                    value={newListDesc}
                    onChange={(e) => setNewListDesc(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Create List
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Rename List */}
      {renameTarget && (
        <div
          className="modal-backdrop no-print"
          onClick={() => setRenameTarget(null)}
        >
          <div
            className="modal-dialog animate-fade"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-header">
              <h3 className="modal-title">Rename Event List</h3>
              <button
                type="button"
                className="btn-icon"
                onClick={() => setRenameTarget(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveRename}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">List Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setRenameTarget(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Name
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Confirm Delete List */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Event List?"
        message={`Are you sure you want to permanently delete "${deleteTarget?.name}"? All items inside this saved list will be removed.`}
        confirmText="Delete List"
        cancelText="Keep"
        isDanger={true}
        onConfirm={() => {
          if (deleteTarget) {
            onDeleteList(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

