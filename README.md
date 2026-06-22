# LodgeMaster Companion 🧭

LodgeMaster Companion is a mobile-first, offline-ready web application designed for chapter officers to prepare, clean, and export event attendance data for LodgeMaster import.

It serves as a bridge between messy on-site registration (including Black Pug imports) and the structured import requirements of LodgeMaster.

---

## 🚀 Key Features

### 1. Event Management
- Create and manage local events with names, dates, and optional chapters.
- Full CRUD operations for event-level data.
- **Offline First**: All data is persisted locally in your browser using IndexedDB (via Dexie.js). No internet connection is required after initial load.

### 2. Intelligent Attendee Tracking
- **Black Pug Ingestion**: Upload CSV files exported from Black Pug to auto-populate your attendee list.
- **Advanced Data Model**: Track over 20 fields per attendee, including:
  - Full Name (First, Middle, Last)
  - Member ID & Role
  - Participation (Ordeal, Brotherhood, Service assignment)
  - Health Form status
  - Comprehensive Payment tracking (Amount, Method, Receipt #, Paid in Full)
- **Manual Management**: Easily add, edit, or delete attendees and mark walk-ins.

### 3. High-Speed Check-in
- Optimized for mobile "Live Check-in" mode.
- Instant search by name or Member ID.
- Single-tap status toggling (Present/Absent).
- Long-press to quickly reset status.

### 4. Reconciliation & Stats
- Real-time summary of attendance metrics.
- Breakdown of Registered vs. Checked-in vs. Walk-ins.
- Identify missing attendees at a glance.

### 5. Dynamic Export Engine
- **LodgeMaster Formats**: Export directly to `.xlsx` (Excel) or `.csv` using standard LodgeMaster import templates.
- **Flexible Templates**:
  - *Updated Form*: 16-field standard report.
  - *Service Report*: Focused on service assignments.
  - *Simple Meeting*: Minimalist attendance list.
- **Custom Selection**: Manually toggle any combination of 21 fields for bespoke reporting.
- **Smart Formatting**: Automatically combines name fields into the `Last, First Middle` format required by LodgeMaster.

---

## 🛠 Tech Stack (Code Perspective)

### Core Framework
- **Next.js 15 (App Router)**: Utilizing the latest React 19 features.
- **TypeScript**: Full type safety across the data model and UI components.

### Persistence & State
- **Dexie.js (IndexedDB)**: Robust client-side database management.
- **`useLiveQuery`**: Real-time UI updates whenever the local database changes, eliminating the need for complex global state synchronization.
- **Zod**: Strict schema validation for attendee and event data.

### Styling & UI
- **Tailwind CSS**: Utility-first styling with a focus on "high-contrast" mobile-first interactions.
- **Lucide React**: Clean, consistent iconography.
- **React Hook Form**: Efficient form management with Zod integration.

### Data Processing
- **SheetJS (XLSX)**: Client-side Excel generation.
- **PapaParse**: High-performance CSV parsing for Black Pug ingestion.

---

## 📁 Project Structure

```text
/src
  /app            # App Router pages and layouts
  /components     # Feature-based components
    /event        # Event-specific UI (Check-in, Lists, Modals)
    /shared       # Common UI elements (Navbar, Layout)
  /lib
    /ingestion    # Black Pug CSV parsing logic
    /export       # Excel/CSV generation and presets
    /storage      # Dexie.js database configuration
    /validation   # Zod schemas
  /types          # TypeScript interfaces
  /hooks          # Custom React hooks
```

---

## 📖 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🎯 Concept

This app is a **utility tool**, not a CRM. It is designed to be used "in the field" at check-in tables, often on tablets or phones, and then used by a secretary to generate the final "Clean" file for LodgeMaster import.
