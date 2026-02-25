# Implementation Plan

## Overview
A multi-phase implementation covering: centralized modal system, Redux + Supabase setup, auth/URL modals on Landing, Settings dropdown with dark mode, route protection, filter persistence via URL params, and an enhanced AddItem modal with API search.

---

## Phase 1: Install Dependencies & Store Setup

### Install
```
npm install @reduxjs/toolkit react-redux @supabase/supabase-js
```

### Files to Create
- `src/store/index.js` — configureStore with uiSlice + authSlice
- `src/store/uiSlice.js` — manages: `activeModal` (null | 'auth' | 'url' | 'confirm'), `darkMode` (bool), `confirmPayload` ({ message, onConfirm action key })
- `src/store/authSlice.js` — manages: `user` (null | object), `isLoadingAuth` (bool)
- `src/lib/supabaseClient.js` — single Supabase client init using `import.meta.env.VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Files to Modify
- `src/main.jsx` — wrap router with `<Provider store={store}>`, add lazy imports for all route pages, add `ProtectedRoute` wrapper for `/lists`, wire `useAuth` hook at root level

---

## Phase 2: Hooks & Utils

### Files to Create
- `src/hooks/useDarkMode.js` — reads `localStorage.getItem('darkMode')` on mount, applies/removes `.dark` class on `<html>`, exposes `{ isDark, toggle }`, syncs to Redux `uiSlice`
- `src/hooks/useAuth.js` — calls `supabase.auth.onAuthStateChange` once at app load, dispatches `setUser`/`clearUser` to `authSlice`; also exposes `{ user, isAuthenticated, logout }`
- `src/utils/productApi.js` — `searchProducts(query, page)` fetches from `https://dummyjson.com/products/search?q={query}&limit=10&skip={page*10}`, extracts `{ id, title, price }` from results, returns `{ items, total, hasMore }`

---

## Phase 3: Centralized Modal System

### New Folder: `src/Components/Modals/`

**`Backdrop.jsx`**
- Full-screen fixed overlay (rgba dark bg)
- Accepts `onClose` prop, calls it on click
- Traps focus (aria-modal, role="dialog")
- Renders children centered on top of backdrop

**`ModalShell.jsx`**
- Wraps content with: header (title + X close btn), body slot via `children`
- `onClick={e => e.stopPropagation()}` to prevent backdrop close
- Escape key listener via useEffect
- Props: `title`, `onClose`, `children`

**`ConfirmModal.jsx`**
- Uses `Backdrop` + `ModalShell`
- Props: `message`, `onConfirm`, `onClose`, `confirmLabel` (default "Confirm"), `isDanger` (applies red styling to confirm btn)
- Two buttons: cancel (calls onClose) + confirm (calls onConfirm then onClose)
- Dispatched from Redux: reads `confirmPayload` from `uiSlice`, or used via local state in parent (local state preferred to keep it simple)

**`AuthModal.jsx`**
- Uses `Backdrop` + `ModalShell` title="Sign in / Sign up"
- Two tabs: "Login" | "Sign Up"
- Fields: email + password (+ confirm password on signup tab)
- Calls `supabase.auth.signInWithPassword` or `supabase.auth.signUp`
- Shows inline error messages, loading state on submit button
- On success: close modal

**`URLModal.jsx`**
- Uses `Backdrop` + `ModalShell` title="Open a list"
- Single text input: "Paste a list URL or list ID"
- Validates: must be a valid path starting with `/lists/` or just a UUID
- On submit: calls `useNavigate` to route to the URL
- Shows error if URL is invalid

**`AddItemModal.jsx`** (replaces existing one in `ListIdPage/`)
- Uses `Backdrop` + `ModalShell` title="Add Item"
- Two tabs: "Custom" | "Search"
  - **Custom tab:** name (required) + price (optional) inputs, same as current
  - **Search tab:**
    - Text input for query
    - On change (debounced 400ms): calls `productApi.searchProducts(query, 0)`
    - Results list: each shows name + price with an "Add" button
    - Pagination: "Load more" button (or infinite scroll) increments page, appends results
    - If no results: show "Nothing found — switch to Custom tab"
- On add (either tab): calls `onAdd({ name, price })` prop and closes modal

**`ShareModal.jsx`** (moved from `ListIdPage/`)
- No changes to logic, just moved here for consistency

**`Modals.module.css`**
- Shared styles for backdrop, shell, tabs, buttons
- Tab active state with brand-color underline

**`index.js`**
- Re-exports all modals for clean imports

---

## Phase 4: Landing Page

### Modify: `src/Components/Pages/Landing/Landing.jsx`
- Import `useDispatch` + `openModal` action from `uiSlice`
- "Login/Register" button → `dispatch(openModal('auth'))`
- "URL" button → `dispatch(openModal('url'))`
- Render `<AuthModal>` and `<URLModal>` conditionally based on `uiSlice.activeModal`
- OR: render both modals at App level (preferred — see below)

### App-level modal rendering (`App.jsx`)
- Import all global modals (AuthModal, URLModal)
- Read `activeModal` from Redux
- Render the correct modal — this way modals are available on any page

---

## Phase 5: Settings Dropdown

### Modify: `src/Components/Settings/Settings.jsx`
- Add local `isOpen` state for dropdown visibility
- On icon click: toggle dropdown open/close
- Close on outside click via `useRef` + `useEffect` (`mousedown` listener)
- Dropdown contents:
  1. **Dark mode row:** label "Dark mode" + toggle switch (`<input type="checkbox">`) styled as a slider
     - Toggle calls `useDarkMode().toggle()`
     - Checked state from Redux `uiSlice.darkMode`
  2. **Divider**
  3. **Auth button:**
     - If `isAuthenticated`: "Logout" button → calls `useAuth().logout()` (calls `supabase.auth.signOut`, clears Redux)
     - If not authenticated: "Login / Sign Up" button → `dispatch(openModal('auth'))`
- Dropdown positioned absolutely below the icon, right-aligned
- `Settings.module.css` updated for dropdown panel, toggle switch, divider

---

## Phase 6: Route Protection

### Modify: `src/main.jsx`
- Add `ProtectedRoute` component:
  ```jsx
  function ProtectedRoute({ children }) {
    const isAuthenticated = useSelector(state => state.auth.user !== null);
    const isLoading = useSelector(state => state.auth.isLoadingAuth);
    if (isLoading) return <LoadingSpinner />;
    if (!isAuthenticated) return <Navigate to="/" replace />;
    return children;
  }
  ```
- Wrap `/lists` route: `element: <ProtectedRoute><ShoppingLists /></ProtectedRoute>`
- `/lists/:listId` stays open to guests (read-only enforced in component)
- Add lazy imports: `const Landing = lazy(() => import(...))` etc.
- Wrap entire router in `<Suspense fallback={<LoadingSpinner />}>`

---

## Phase 7: ShoppingLists Page (Filter + Confirm Delete)

### Modify: `src/Components/Pages/ShoppingLists/ShoppingLists.jsx`
- Replace hardcoded data with Redux `listsSlice` (stub for now, can be populated later)
- Use `useSearchParams` from react-router for persistent filters:
  - `?q=search+term` — text search
  - `?filter=date_asc|date_desc|name_asc|name_desc` — sort order
- Filter button opens a small inline panel (or dropdown) with sort options; each option updates URL params
- Search input uses controlled state, updates `?q=` param on Enter or debounce
- Delete button → opens `ConfirmModal` with message "Delete this list? This action cannot be undone." and `isDanger`
- On confirm: dispatch delete action (stub for now)

---

## Phase 8: ListIdPage (Confirm Done + Enhanced Add)

### Modify: `src/Components/Pages/ListIdPage/ListIdPage.jsx`
- "Done Shopping" button → opens `ConfirmModal` (local state `isConfirmOpen`) with message "Mark this list as done? It will be removed from your dashboard." and `isDanger`
- On confirm: dispatch delete/archive action (stub), navigate to `/lists`
- Replace local `AddItemModal` import with the new one from `Modals/`
- Remove old `AddItemModal.jsx` and `ShareModal.jsx` from `ListIdPage/` folder (now in `Modals/`)
- Update `Modal.module.css` path or remove (styles now in `Modals.module.css`)

---

## Phase 9: Cleanup & Polish
- Update all import paths after moving modals
- Remove orphaned files (`ListIdPage/AddItemModal.jsx`, `ListIdPage/ShareModal.jsx`, `ListIdPage/Modal.module.css`)
- Add loading spinner component (`src/Components/LoadingSpinner/`) for Suspense fallback and auth loading
- Save memory notes about architecture

---

## File Summary

### New Files (14)
| File | Purpose |
|------|---------|
| `src/store/index.js` | Redux store |
| `src/store/uiSlice.js` | Modal + dark mode state |
| `src/store/authSlice.js` | Auth state |
| `src/lib/supabaseClient.js` | Supabase client |
| `src/hooks/useDarkMode.js` | Dark mode logic |
| `src/hooks/useAuth.js` | Auth state sync |
| `src/utils/productApi.js` | Product API search |
| `src/Components/Modals/Backdrop.jsx` | Shared backdrop |
| `src/Components/Modals/ModalShell.jsx` | Modal container |
| `src/Components/Modals/ConfirmModal.jsx` | Reusable confirm dialog |
| `src/Components/Modals/AuthModal.jsx` | Login/signup |
| `src/Components/Modals/URLModal.jsx` | URL navigate |
| `src/Components/Modals/AddItemModal.jsx` | Custom + API search tabs |
| `src/Components/Modals/Modals.module.css` | Shared modal styles |

### Modified Files (7)
| File | Change |
|------|--------|
| `src/main.jsx` | Provider, lazy routes, ProtectedRoute |
| `src/App/App.jsx` | Render global modals, wire useDarkMode |
| `src/Components/Pages/Landing/Landing.jsx` | Wire CTA buttons to modal dispatches |
| `src/Components/Settings/Settings.jsx` | Dropdown with dark mode toggle + auth button |
| `src/Components/Pages/ShoppingLists/ShoppingLists.jsx` | URL-based filter, ConfirmModal for delete |
| `src/Components/Pages/ListIdPage/ListIdPage.jsx` | ConfirmModal for done, updated AddItemModal import |
| `src/Components/Modals/ShareModal.jsx` | Move from ListIdPage, no logic change |

### Deleted Files (3)
- `src/Components/Pages/ListIdPage/ShareModal.jsx` (moved)
- `src/Components/Pages/ListIdPage/AddItemModal.jsx` (replaced)
- `src/Components/Pages/ListIdPage/Modal.module.css` (replaced)

---

## Notes
- `ConfirmModal` is used locally (parent manages `isOpen` state) to keep it simple and avoid Redux overkill for ephemeral UI
- Global modals (Auth, URL) are driven by Redux since they can be triggered from anywhere (Navbar, Landing, Settings)
- Product search uses DummyJSON as a demo API — easily swappable via `productApi.js`
- Supabase keys must be in `.env`: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
