---
name: code-writing-rules
description: Guidelines for code structure, UI-hook separation, code splitting, and import statement ordering.
always_on: true
---

# Code Writing Rules

This rule enforces conventions for component architecture, hooks extraction, code splitting, and import ordering across the codebase.

## 1. Component Architecture & Code Splitting

- **Separation of Concerns (UI vs. Logic)**:
  - Keep JSX layout/presentation files separate from stateful hooks and data fetching logic.
  - Page-level views and complex components should extract their state, Redux actions, API queries, web sockets, event handlers, and lifecycle logic into custom React hooks (e.g. `useSupport.js`, `useOrderQueueNotifier.js`).
  - View files (e.g. `Support.jsx`) should serve as containers that call the custom hook and compose split presentation components.
- **Code Splitting**:
  - Do not create single, large component files (e.g. over 400–500 lines of code).
  - Split complex pages into smaller, modular sub-components under a local `components/` directory (e.g. `SidebarSessionsList.jsx`, `ChatWindow.jsx`, `CustomerProfilePanel.jsx`) and export them using a clean index file (`components/index.js`).
- **Index Exports**:
  - Always create a clean index file (`index.js`) inside sub-folders like `components/` and `hooks/` to bundle and export all elements cleanly (e.g., `export { default as useOrderQueueNotifier } from "./useOrderQueueNotifier"`).

## 2. Import Statement Ordering Rules

All import statements in Javascript/React files must be sorted and grouped strictly in the following order:

### Group 1: Core React & Frameworks

1. **React core** imports (e.g. `import React, { useState } from "react"`)
2. **Router & State Management** imports (e.g. `react-router-dom`, `redux`, `@reduxjs/toolkit`, RTK Query hook imports)
3. **UI Component Library** imports (e.g. `@mui/material` elements)
4. **Icons & Assets** imports (e.g. `@mui/icons-material`)

_Insert exactly one blank line before the next group._

### Group 2: Remotes

5. **Microfrontend (MF) remote imports** (e.g. imports from `OdBitesMfUI/...`)

_Insert exactly one blank line before the next group._

### Group 3: Components

6. **Local Components / Reusable Components** (e.g. `import SidebarSessionsList from "../components/SidebarSessionsList"`, shared component library imports)

_Insert exactly one blank line before the next group._

### Group 4: Logic, Utilities & Hooks

7. **Redux actions / state actions** (e.g. Redux dispatch actions)
8. **Utilities & Custom helpers** (e.g. formatters, API endpoints, configurations, custom helper functions)
9. **Custom React hooks** (e.g. local custom hooks `useSupport`, `useCookies`, etc.)
