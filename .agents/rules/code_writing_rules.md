---
trigger: always_on
description: Guidelines for code structure, UI-hook separation, code splitting, and import statement ordering.
---

# Code Writing Rules

These rules define conventions for React components, hooks, API handling, Redux, Microfrontend (MF) reuse, code splitting, imports, and code quality.

## 1. Component Architecture & Code Splitting

- Keep JSX/UI separate from complex business logic.
- Keep API calls, Redux logic, Socket.IO logic, event handlers, and complex state logic in custom hooks or feature logic.
- Pages should mainly compose hooks and components.
- Keep components focused on one responsibility.
- Split large or complex components into smaller components under the feature's `components/` folder.
- Do not use an arbitrary line-count limit; split code when it becomes difficult to understand or maintain.
- Use lazy loading for appropriate routes and large features.
- Use `index.js` files for clean exports where useful.

## 2. Feature Structure

Keep feature-specific code inside its feature:

```text id="zpkq9c"
feature/
├── api/
├── components/
├── hooks/
├── pages/
├── validation/
└── index.js
```

- Create only the folders that are needed.
- Keep shared code in shared/global folders.
- Do not move feature-specific code into global folders.

## 3. Microfrontend (MF) Reuse

- Always check available MF remotes before creating new functionality.
- Reuse existing MF components, hooks, utilities, helpers, and services whenever possible.
- Do not copy MF source code into the local application.
- Do not recreate functionality that already exists in an MF remote without a clear reason.
- Prefer composition, props, wrappers, or supported extension points for customization.
- Create local functionality only when the MF functionality does not exist or cannot reasonably satisfy the requirement.
- Prefer **reuse → extend → create new**.

## 4. API & Axios

- Use the shared Axios/API layer for backend communication.
- Keep API functions outside UI components.
- Keep feature-specific API functions in the appropriate API module.
- Do not create unnecessary Axios instances.
- Keep request/response handling separate from presentation logic.

## 5. Redux

- Use Redux Toolkit for shared/global client-side state.
- Keep Redux slices focused on one domain.
- Do not store temporary component UI state in Redux when `useState` is sufficient.
- Do not duplicate API data in Redux if it can remain in the API/data layer.
- Keep Redux actions/selectors related to their feature when possible.

## 6. Custom Hooks

- Use custom hooks for complex or reusable logic.
- Hooks may contain API calls, Redux interaction, Socket.IO logic, event handlers, and side effects.
- Keep each hook focused on one responsibility.
- Do not create hooks only to rename another function/hook.
- Avoid large "god hooks".
- Check existing local and MF hooks before creating a new hook.

## 7. Socket.IO

- Keep Socket.IO logic in custom hooks or feature logic.
- Always clean up socket listeners/connections when required.
- Do not put complex socket logic directly inside presentation components.
- Reuse existing MF socket functionality when available.

## 8. Forms & Validation

- Use **React Hook Form** for complex forms.
- Use **Zod** for schema validation where applicable.
- Keep validation schemas inside the feature's `validation/` folder.
- Do not duplicate validation rules across components.
- Keep form/business logic in custom hooks when the form becomes complex.

## 9. Shared Components

- Put genuinely reusable components in the shared-components area.
- Keep feature-specific components inside their feature.
- Check existing local and MF components before creating a new component.
- Do not duplicate existing shared components.

## 10. Utilities

- Put generic reusable helpers in the utility folder.
- Keep feature-specific helpers inside the feature.
- Check existing local and MF utilities before creating a new utility.
- Do not put business logic into generic utility files.

## 11. Pages

- Pages should mainly compose components and hooks.
- Avoid large API, Redux, socket, and business-logic blocks inside pages.
- Keep pages readable and focused on layout/composition.

## 12. Import Order

All imports must follow this order.

### Group 1 — React, Frameworks & External Libraries

1. React
2. Router/state/data libraries
3. Other third-party libraries
4. Form/validation libraries
5. Socket libraries
6. UI libraries such as MUI
7. Icons and external assets

### Group 2 — Microfrontend Remotes

8. MF remote imports

### Group 3 — Components

9. Local/shared components

### Group 4 — Logic, Utilities & Hooks

10. API functions
11. Redux actions/selectors/store
12. Utilities/helpers/configuration
13. Custom hooks

- Keep exactly one blank line between groups.
- Remove all unused imports.
- Do not import the same module multiple times.
- Keep imports sorted and consistent.
- Use ESLint to enforce import ordering.

## 13. Remove Unused & Dead Code

Always remove:

- Unused imports
- Unused variables
- Unused functions
- Unused components
- Unused hooks
- Unused API functions
- Unused Redux actions/selectors
- Unused files
- Unused dependencies
- Duplicate code
- Dead code
- Commented-out old code

Do not leave temporary debugging code such as:

```text id="qpl3ar"
console.log()
debugger
temporary test code
```

in production code.

## 14. Code Quality

- Reuse existing code before creating new code.
- Check MF remotes before implementing common functionality.
- Avoid duplicated logic.
- Avoid unnecessary abstractions.
- Avoid circular dependencies.
- Keep business logic close to its feature.
- Keep components and hooks focused.
- Use clear and consistent naming.
- Keep functions simple and readable.
- Do not add a new library when the existing stack can solve the problem.
- Code must pass ESLint and Prettier checks.

## 15. Naming

- Components → `PascalCase`
- Hooks → `useSomething`
- Functions → `camelCase`
- Variables → `camelCase`
- Constants → `UPPER_SNAKE_CASE` when appropriate
- Component files → `PascalCase.jsx`
- Hook files → `useSomething.js`
- API files → descriptive `camelCase.js`
- Validation files → descriptive names

## 16. Error & Loading Handling

Every API-driven feature must handle:

- Loading

- Success

- Empty state

- Error

- Handle API and mutation errors properly.

- Show appropriate user feedback.

- Do not silently ignore errors.

## 17. Routing & Lazy Loading

- Keep routing configuration inside `src/routes/`.
- Keep route configuration separate from page implementation.
- Use lazy loading for appropriate routes/features.
- Provide a loading UI for lazy-loaded pages.
- Keep protected-route logic inside routing/auth infrastructure.

## 18. Before Creating New Code

Before creating a new component, hook, utility, API function, service, or helper:

1. Check existing shared components.
2. Check the current feature.
3. Check existing hooks/utilities/API modules.
4. Check available MF remotes.
5. Reuse existing functionality if possible.
6. Extend or compose existing functionality when appropriate.
7. Create new code only when necessary.

## 19. General Rule

Prefer:

**Reuse → Extend → Create**

Prefer code that is:

**Simple → Readable → Maintainable → Reusable → Testable**

Avoid:

**Duplicate → Over-engineered → Unused → Unnecessary**
