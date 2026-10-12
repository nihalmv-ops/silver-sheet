import React from "react";
import {
  Menu,
  Printer,
  Eye,
  Calendar,
  FileText,
  ListOrdered,
  Plus,
} from "lucide-react";

export default function Header({
  activeTab,
  activeList,
  totalItemsCount,
  onOpenSidebar,
  onPrintClick,
  onPreviewClick,
  onQuickAddItem,
}) {
  // Format current date nicely
  const todayFormatted = new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date());

  const getPageTitle = () => {
    switch (activeTab) {
      case "expense-sheet":
        return {
          title: "Expense Sheet Generator",
          subtitle: "Prepare printable A4 catering expense sheets",
        };
      case "dashboard":
        return {
          title: "Dashboard Overview",
          subtitle: "Catering expense sheets & quick actions",
        };
      case "saved-lists":
        return {
          title: "Saved Item Lists",
          subtitle: "Reusable event templates & past lists",
        };
      case "settings":
        return {
          title: "Application Settings",
          subtitle: "Configure print preferences & business details",
        };
      default:
        return {
          title: "Silver Catering",
          subtitle: "Expense Sheet Generator",
        };
    }
  };

  const { title } = getPageTitle();

  return (
    <header className="app-header no-print">
      <div className="header-left">
        <button
          type="button"
          className="header-mobile-toggle"
          onClick={onOpenSidebar}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="header-title-box">
          <h1>{title}</h1>
        </div>
      </div>

      <div className="header-meta-bar">
        {/* Date Pill */}
        <div className="header-meta-pill" title="Today's Date">
          <Calendar size={14} style={{ color: "var(--color-gold)" }} />
          <span>{todayFormatted}</span>
        </div>

        {/* Current List Pill */}
        {activeList && (
          <div className="header-meta-pill" title="Current Active Event List">
            <FileText size={14} style={{ color: "var(--color-primary)" }} />
            <span style={{ fontWeight: 600, maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {activeList.name}
            </span>
          </div>
        )}

        {/* Total Items Pill */}
        <div className="header-meta-pill" title="Total Items in Current Sheet">
          <ListOrdered size={14} style={{ color: "var(--color-gold)" }} />
          <span>
            <strong>{totalItemsCount}</strong> {totalItemsCount === 1 ? "Item" : "Items"}
          </span>
        </div>
      </div>

      <div className="header-right">
        {/* Preview A4 Button */}
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onPreviewClick}
          title="Preview A4 Sheet before printing"
        >
          <Eye size={15} />
          <span>Preview A4</span>
        </button>

        {/* Print Expense Sheet Button (Prominent) */}
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={onPrintClick}
          title="Print official A4 Expense Sheet"
        >
          <Printer size={15} style={{ color: "var(--color-gold)" }} />
          <span>Print Expense Sheet</span>
        </button>
      </div>
    </header>
  );
}

