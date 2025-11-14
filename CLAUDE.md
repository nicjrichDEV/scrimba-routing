# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Scrimba Frontend Developer Career Path** project focused on learning React Router. It's a van rental application ("VanLife") that demonstrates React Router concepts including nested routes, dynamic routing, URL parameters, search params, and layout routes.

## Instructions for Claude

This project is used as a learning exercise. Instead of completing the code automatically please walk the user through step by step on how to fix or implement a feature.

## Development Commands

```bash
npm install          # Install dependencies
npm start           # Start development server (alias for npm run dev)
npm run dev         # Start Vite dev server
npm run build       # Build for production
npm run preview     # Preview production build
```

The project uses **Vite** as the build tool with the React plugin.

## Architecture Overview

### Mock API Server (MirageJS)

The project uses **MirageJS** to mock a backend API:

- Server configuration: `server.js`
- Automatically imported in `index.jsx` via `import "./server"`
- **Namespace**: All API routes are under `/api` prefix
- **Endpoints**:
  - `GET /api/vans` - All vans
  - `GET /api/vans/:id` - Single van by ID
  - `GET /api/host/vans` - Host's vans (hardcoded to hostId "123")
  - `GET /api/host/vans/:id` - Host's single van by ID

The mock data includes 6 vans with types: "simple", "rugged", or "luxury".

### Routing Architecture

The app uses **React Router v6.4.3** with a nested route structure:

```
/ (Layout - includes Header/Footer)
├─ / (Home)
├─ /about
├─ /vans (Van listing)
├─ /vans/:id (Van detail)
└─ /host (HostLayout - includes host navigation)
   ├─ /host (Dashboard - index route)
   ├─ /host/income
   ├─ /host/reviews
   ├─ /host/vans (Host's van listing)
   └─ /host/vans/:id (HostVanDetail - parent with tabs)
      ├─ /host/vans/:id (Info - index route)
      ├─ /host/vans/:id/pricing
      └─ /host/vans/:id/photos
```

**Key patterns:**

- **Layout components** use `<Outlet />` to render child routes
- **Layout.jsx**: Site-wide layout with Header and Footer
- **HostLayout.jsx**: Host section layout with navigation tabs (uses `NavLink` with `end` prop where appropriate)
- **HostVanDetail.jsx**: Nested layout for individual van details with sub-navigation, passes `currentVan` via Outlet context
- **NavLink**: Used for navigation with `isActive` styling via className function
- **Relative navigation**: Back buttons use `relative="path"` for proper navigation

### Data Fetching Pattern

The project uses a **custom hook** for data fetching:

**`hooks/useFetch.js`**:

- Returns `{ data, loading, error }`
- Implements **AbortController** for cleanup
- Handles loading states and error handling
- Automatically re-fetches when URL changes

**Usage pattern**:

```jsx
const { data, loading, error } = useFetch("/api/vans");

if (loading) return <div role="status">Loading...</div>;
if (error) return <div role="alert">Error: {error}</div>;

// Use data.vans (MirageJS returns data wrapped in a vans property)
```

**Important**: MirageJS responses are structured as `{ vans: [...] }` or `{ vans: {...} }`, so always access via `data.vans`.

### File Organization

```
/components        - Reusable components (Layout, HostLayout, Header, Footer)
/pages
  /Host           - Host dashboard pages
  /Vans           - Van browsing pages
/hooks            - Custom React hooks (useFetch)
server.js         - MirageJS mock API configuration
index.jsx         - App entry point with route configuration
index.css         - Global styles
```

### Accessibility

The codebase includes accessibility features:

- `role="status"` for loading states
- `role="alert"` for error messages
- `aria-label` attributes on navigation elements
- Semantic HTML structure

## Important Notes

- This is a **learning project** - comments in the code (especially `index.jsx`) contain challenge instructions from Scrimba
- The host authentication is **mocked** (hardcoded to hostId "123")
- Search params functionality is partially implemented (see `Vans.jsx` line 7-8)
- The project uses **React 18.2.0** with the modern `ReactDOM.createRoot` API
