import React, { useState } from "react";
import {
  LayoutDashboard,
  ReceiptText,
  FolderHeart,
  Settings,
  Printer,
  X,
  Phone,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
  activeList,
  totalItemsCount,
  savedListsCount,
  onPrintClick,
  isOpen,
  onClose,
}) {
  const [logoError, setLogoError] = useState(false);

  const navItems = [
    {
      id: "expense-sheet",
      label: "Expense Sheet",
      icon: ReceiptText,
      counter: totalItemsCount,
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "saved-lists",
      label: "Saved Item Lists",
      icon: FolderHeart,
      counter: savedListsCount,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="sidebar-backdrop no-print"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`app-sidebar no-print ${isOpen ? "sidebar-open" : ""}`}>
        {/* Brand Header */}
        <div className="sidebar-header">
          {!logoError ? (
            <img
              src="/silver-logo.png"
              alt="Silver Catering Logo"
              className="sidebar-logo-img"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="sidebar-logo-fallback" title="Silver Catering">
              SC
            </div>
          )}

          <div className="sidebar-brand-text">
            <span className="sidebar-brand-title">SILVER CATERING</span>
            <span className="sidebar-brand-sub">Expense Generator</span>
          </div>

          {/* Close button on mobile */}
          <button
            type="button"
            className="header-mobile-toggle"
            onClick={onClose}
            style={{ marginLeft: "auto", background: "transparent", color: "#fff" }}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">Main Menu</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-link ${isActive ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onClose) onClose();
                }}
              >
                <Icon size={18} className="nav-icon" />
                <span>{item.label}</span>
                {typeof item.counter === "number" && (
                  <span className="nav-counter">{item.counter}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Active List Quick Card */}
        {activeList && (
          <div className="sidebar-active-card">
            <div className="sidebar-active-label">
              <Sparkles size={12} />
              <span>Active Expense Sheet</span>
            </div>
            <div className="sidebar-active-name" title={activeList.name}>
              {activeList.name}
            </div>
            <div className="sidebar-active-stats">
              <span>{activeList.items?.length || 0} items listed</span>
              <button
                type="button"
                className="btn btn-gold btn-sm"
                onClick={onPrintClick}
                style={{ padding: "4px 8px", fontSize: "0.72rem" }}
              >
                <Printer size={12} />
                <span>Print</span>
              </button>
            </div>
          </div>
        )}

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <UtensilsCrossed size={12} style={{ color: "var(--color-gold)" }} />
            <span>Valanchery, Kerala</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Phone size={12} style={{ color: "var(--color-gold)" }} />
            <span>+91 98464 15767</span>
          </div>
          <div style={{ marginTop: "6px", fontSize: "0.68rem", opacity: 0.7 }}>
            v1.0 • Physical A4 Ready
          </div>
        </div>
      </aside>
    </>
  );
}

