import React, { useState } from "react";
import {
  Printer,
  FileText,
  Plus,
  Eye,
  Calendar,
  Sparkles,
  ClipboardList,
  CheckCircle2,
  FolderHeart,
  Settings,
  ArrowRight,
  UtensilsCrossed,
} from "lucide-react";

export default function Dashboard({
  activeList,
  allLists,
  totalItemsCount,
  onNavigateTab,
  onPrintClick,
  onPreviewClick,
  onSwitchActiveList,
  onCreateNewList,
}) {
  const [logoError, setLogoError] = useState(false);

  const todayFormatted = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="page-container no-print animate-fade">
      {/* Welcome Hero Banner */}
      <div className="dashboard-hero">
        <div className="hero-tag">
          <UtensilsCrossed size={13} />
          <span>Silver Catering • Professional Suite</span>
        </div>
        <h2 className="hero-title">Expense Sheet Generator</h2>
        <p className="hero-desc">
          Generate clean, professional, physical A4 expense sheets for your catering events.
          Manage items digitally, print standardized blank cost sheets, and write purchase costs
          by hand in the market.
        </p>

        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-gold"
            onClick={() => onNavigateTab("expense-sheet")}
          >
            <FileText size={16} />
            <span>Open Active Sheet ({totalItemsCount} items)</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onPrintClick}
            style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}
          >
            <Printer size={16} style={{ color: "var(--color-gold)" }} />
            <span>Print Current Sheet</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onPreviewClick}
            style={{ background: "transparent", color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.2)" }}
          >
            <Eye size={16} />
            <span>A4 Preview</span>
          </button>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="stats-grid">
        {/* Card 1: Active Items */}
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-green">
            <ClipboardList size={26} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{totalItemsCount}</div>
            <div className="stat-label">Items in Active Sheet</div>
          </div>
        </div>

        {/* Card 2: Active Event */}
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-gold">
            <FileText size={26} />
          </div>
          <div className="stat-content">
            <div
              className="stat-value"
              style={{
                fontSize: "1.15rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "180px",
              }}
              title={activeList?.name}
            >
              {activeList?.name || "None"}
            </div>
            <div className="stat-label">Current Event List</div>
          </div>
        </div>

        {/* Card 3: Saved Event Lists */}
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-dark">
            <FolderHeart size={26} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{allLists.length}</div>
            <div className="stat-label">Saved Event Lists</div>
          </div>
        </div>

        {/* Card 4: Date & Print Status */}
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-green">
            <CheckCircle2 size={26} />
          </div>
          <div className="stat-content">
            <div className="stat-value" style={{ fontSize: "1.2rem", color: "var(--color-success)" }}>
              Ready
            </div>
            <div className="stat-label">A4 Print Optimization</div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards Section */}
      <div className="content-card">
        <div className="card-header">
          <div className="card-title-group">
            <h3 className="card-title">Quick Actions & Shortcuts</h3>
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
            {todayFormatted}
          </span>
        </div>

        <div className="card-body">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {/* Action 1: Jump to Expense Sheet */}
            <div
              className="stat-card"
              style={{ cursor: "pointer", background: "var(--color-bg)" }}
              onClick={() => onNavigateTab("expense-sheet")}
            >
              <div className="stat-icon-wrapper stat-icon-green">
                <Plus size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "var(--color-primary)", marginBottom: "4px" }}>
                  Manage Expense Items
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                  Add, edit, reorder or delete catering supplies
                </div>
              </div>
              <ArrowRight size={18} style={{ color: "var(--color-gold)" }} />
            </div>

            {/* Action 2: Open Saved Lists */}
            <div
              className="stat-card"
              style={{ cursor: "pointer", background: "var(--color-bg)" }}
              onClick={() => onNavigateTab("saved-lists")}
            >
              <div className="stat-icon-wrapper stat-icon-gold">
                <FolderHeart size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "var(--color-primary)", marginBottom: "4px" }}>
                  Saved Event Lists
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                  Wedding feasts, birthday parties & corporate buffets
                </div>
              </div>
              <ArrowRight size={18} style={{ color: "var(--color-gold)" }} />
            </div>

            {/* Action 3: Settings */}
            <div
              className="stat-card"
              style={{ cursor: "pointer", background: "var(--color-bg)" }}
              onClick={() => onNavigateTab("settings")}
            >
              <div className="stat-icon-wrapper stat-icon-dark">
                <Settings size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "var(--color-primary)", marginBottom: "4px" }}>
                  Settings & Backup
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                  Custom print rows, address info, backup data
                </div>
              </div>
              <ArrowRight size={18} style={{ color: "var(--color-gold)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Available Event Lists Quick Switcher */}
      <div className="content-card">
        <div className="card-header">
          <div className="card-title-group">
            <h3 className="card-title">Event Lists Overview</h3>
            <span className="badge badge-gray">{allLists.length} Lists Available</span>
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onCreateNewList}
          >
            <Plus size={14} />
            <span>Create New List</span>
          </button>
        </div>

        <div className="table-responsive">
          <table className="expense-table">
            <thead>
              <tr>
                <th>EVENT LIST NAME</th>
                <th>ITEMS COUNT</th>
                <th>DESCRIPTION</th>
                <th className="col-action">STATUS / ACTION</th>
              </tr>
            </thead>
            <tbody>
              {allLists.map((list) => {
                const isActive = list.id === activeList?.id;
                return (
                  <tr key={list.id}>
                    <td style={{ fontWeight: 600, color: "var(--color-primary)" }}>
                      {list.name}
                    </td>
                    <td>
                      <span className="badge badge-green">
                        {list.items?.length || 0} items
                      </span>
                    </td>
                    <td style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
                      {list.description || "Custom catering event"}
                    </td>
                    <td className="col-action">
                      {isActive ? (
                        <span className="badge badge-gold">Active Now</span>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            onSwitchActiveList(list.id);
                            onNavigateTab("expense-sheet");
                          }}
                        >
                          Open Sheet
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

