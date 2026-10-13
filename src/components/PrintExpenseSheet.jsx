import React, { useState } from "react";

export default function PrintExpenseSheet({
  activeList,
  settings,
  eventDateOverride = "",
  eventNameOverride = "",
}) {
  const [logoError, setLogoError] = useState(false);

  const items = activeList?.items || [];
  const minRows = settings?.minPrintRows || 30;

  // Calculate how many blank rows to pad so the table utilizes the full A4 space
  const currentCount = items.length;
  const blankRowsNeeded = Math.max(0, minRows - currentCount);

  // If items exceed minRows, add 2 additional blank rows for emergency market additions
  const extraPadding = currentCount >= minRows ? 2 : blankRowsNeeded;

  const blankRows = Array.from({ length: extraPadding }, (_, i) => ({
    index: currentCount + i + 1,
  }));

  const displayEventName = eventNameOverride || activeList?.name || "";
  const displayEventDate = eventDateOverride || activeList?.eventDate || "";

  return (
    <div className="printable-sheet-container">
      <div className="a4-sheet">
        {/* Printable Header */}
        <header className="print-header">
          <div className="print-brand-left">
            {!logoError ? (
              <img
                src="/silver-logo.png"
                alt="Silver Catering Logo"
                className="print-logo-img"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="print-logo-fallback">SC</div>
            )}

            <div className="print-title-area">
              <h1 className="print-company-name">SILVER CATERING</h1>
              <div className="print-sheet-subtitle">EXPENSE SHEET</div>
              {settings?.showAddressInPrint && (
                <div className="print-contact-details">
                  {settings.companyAddress}
                  {settings?.showPhoneInPrint && (
                    <span> • Tel: {settings.companyPhone}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="print-header-meta-right">
            <span className="print-badge">Official Record</span>
          </div>
        </header>

        {/* Date & Event Name Writing Spaces */}
        <div className="print-meta-grid">
          <div className="print-field">
            <span className="print-field-label">Date:</span>
            <div className="print-field-line">
              {displayEventDate ? displayEventDate : ""}
            </div>
          </div>

          <div className="print-field">
            <span className="print-field-label">Event Name:</span>
            <div className="print-field-line">
              {displayEventName ? displayEventName : ""}
            </div>
          </div>
        </div>

        {/* Table: EXACT COLUMNS: INDEX | ITEMS | AMOUNT (₹) */}
        <div className="print-table-wrapper">
          <table className="print-table">
            <thead>
              <tr>
                <th className="print-col-index">INDEX</th>
                <th className="print-col-item">ITEMS</th>
                <th className="print-col-amount">
                  AMOUNT ({settings?.currencySymbol || "₹"})
                </th>
              </tr>
            </thead>
            <tbody>
              {/* User Added Items */}
              {items.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td className="print-col-index">{idx + 1}</td>
                  <td className="print-col-item">{item.name}</td>
                  {/* Amount cell is STRICTLY blank for physical handwriting */}
                  <td className="print-col-amount">&nbsp;</td>
                </tr>
              ))}

              {/* Additional Blank Rows for Handwritten Entries */}
              {blankRows.map((blank) => (
                <tr key={`blank-${blank.index}`} className="print-row-blank">
                  <td className="print-col-index">{blank.index}</td>
                  <td className="print-col-item">&nbsp;</td>
                  <td className="print-col-amount">&nbsp;</td>
                </tr>
              ))}

              {/* TOTAL ROW: Completely blank amount for handwritten calculation */}
              <tr className="print-total-row">
                <td colSpan="2" className="print-total-label">
                  TOTAL
                </td>
                <td className="print-col-amount print-total-amount-box">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom verification watermark */}
        <div className="print-footer-notice">
          Silver Catering • Authentic Kerala Catering Services • For Official Physical Record Use
        </div>
      </div>
    </div>
  );
}
