# Copilot Instructions - Van Life Routing App

## Project Overview

React Router v6 learning project using Vite + React. Mock API via MirageJS (`server.js`). This projects is part of Scrimba's Frontend Developer Career Path specifically the Advanced React section focusing on routing.

## LLM Instructions

This project is used for learning purpose. When generating code snippets or explanations please explain each concept in steps and allow the user to follow along and most importantly write the code themselves instead of an agent. The goal is to master concepts of routing in React apps in general and React Router v6 in particular. The end goal is to deeply understand layout nesting, route parameters, Outlets, Links, NavLinks and data fetching patterns with React Router.

## Architecture Pattern: Nested Layouts

Routes use nested `<Outlet />` components for shared layouts:

- `Layout.jsx` → wraps all pages with `Header` + `Footer`
- `HostLayout.jsx` → wraps `/host/*` routes with navigation tabs
- `HostVanDetail.jsx` → wraps `/host/vans/:id/*` with van header + tabs for info/pricing/photos

All layouts render `<Outlet />` where child routes appear. See `index.jsx` for route structure.

## API Data Structure (MirageJS)

**Critical**: MirageJS `.where()` returns arrays even for single items:

- `/api/host/vans/:id` returns `{ vans: [{ id, name, price, ... }] }`
- Always destructure: `setVan(data.vans[0])` not `setVan(data.vans)`
- Store the object, not the array - use `van.name` not `van[0].name`

Mock API endpoints (see `server.js`):

- `/api/vans` - all vans
- `/api/vans/:id` - single van (uses `.find()` - returns object)
- `/api/host/vans` - host's vans (hostId hardcoded to "123")
- `/api/host/vans/:id` - host's single van (uses `.where()` - returns array!)

## React Router Patterns

- Use `relative="path"` for back buttons: `<Link to=".." relative="path">`
- NavLink active styling: `style={({ isActive }) => isActive ? activeStyles : null}`
- Use `end` prop on index routes: `<NavLink to="." end>` prevents always-active state
- Extract IDs: `const { id } = useParams()`

## Component Conventions

- Default exports: `export default function ComponentName()`
- React hooks imported as `React.useState`, `React.useEffect` (not destructured)
- Loading states: render `<h2>Loading...</h2>` while data fetches
- Conditional rendering: `{van ? <div>...</div> : <h2>Loading...</h2>}`

## State Management

- Fetch in `useEffect` with dependency array: `useEffect(() => { fetchData() }, [id])`
- Use optional chaining for safety: `van?.name` (guards against null during loading)
- State naming: `currentVan` for detail pages, plural `vans` for lists

## Development Workflow

- **Start dev server**: `bun start` or `bun run dev` (Vite)
- **No backend needed** - MirageJS intercepts `/api/*` requests in browser
- **Test nested routes** by manually navigating URLs (e.g., `/host/vans/1/pricing`)

## Styling

- CSS classes follow BEM-like patterns: `host-van-detail`, `van-type-${type}`
- Active nav styles defined inline as objects (see `HostLayout.jsx`)
- Van types: `simple`, `rugged`, `luxury` - used for styling classes

## Key Files

- `index.jsx` - all routes defined here
- `server.js` - mock API with hardcoded hostId "123"
- `components/Layout.jsx` + `HostLayout.jsx` - layout wrappers
- `pages/Host/HostVanDetail.jsx` - demonstrates nested routing with tabs
