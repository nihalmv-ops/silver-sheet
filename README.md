# Silver Catering Expense Sheet Generator

A professional, simple, and responsive expense sheet generator custom-built for **[Silver Catering](https://www.silvercatering.in/)**.

Designed with Silver Catering's official brand aesthetics — deep forest green, warm gold accents, and cream/white surfaces.

---

## 🌟 Key Features

1. **Digital Item Management (No Amounts Needed in Software)**
   - Enter catering expense item names quickly.
   - Automatic 1-based index numbering.
   - Add, edit (inline & double-click), reorder (move up/down), or delete items.
   - Clear entire sheet with confirmation modal.
   - Quick catering suggestion chips for rapid additions (Chicken, Basmati Rice, Fish, Vegetables, Cooking Oil, etc.).
   - Automatic re-indexing upon any deletion or reordering.

2. **Standardized Printable A4 Expense Sheet**
   - Official Silver Catering logo and brand header.
   - `Date` and `Event Name` writing lines.
   - Exact physical table columns: `INDEX | ITEMS | AMOUNT (₹)`.
   - **Amounts (₹) and TOTAL are kept 100% blank** for manual handwriting with a pen after purchase.
   - Auto-padded blank rows (default 20 rows) so managers have clean printed lines for additional market entries.
   - `Prepared By` and `Checked By` signature lines.
   - Dedicated print stylesheet (`@media print`) optimized for office laser & inkjet printers.

3. **Saved Event Lists & Templates**
   - Reusable catering event templates saved directly in `localStorage`:
     - *Wedding Function - Grand Feast*
     - *Birthday Function - Party Specials*
     - *Traditional Kerala Sadhya*
     - *Corporate Buffet Lunch*
   - Create new lists, rename, duplicate, switch, or delete.

4. **Settings & Backup**
   - Configurable minimum rows on printed sheet (15, 20, 25, 30).
   - Toggle business address & phone on the print header.
   - Export all lists as JSON backup or restore from file.
   - Factory reset to original starter templates.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation & Run

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## ☁️ Deployment on Vercel

1. Push this repository to GitHub: `https://github.com/nihalmv-ops/silver-sheet.git`.
2. Go to [Vercel](https://vercel.com/) and click **"Add New" -> "Project"**.
3. Import `silver-sheet` from GitHub.
4. Set Framework Preset to **Vite** (detected automatically).
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

---

© Silver Catering • Valanchery, Kerala • Tel: +91 98464 15767
