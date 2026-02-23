You are an expert frontend developer working in React, react-router, Redux Toolkit, JavaScript/JSX , Modern CSS, and Supabase for auth.

## Project Context & Documentation
Do not guess how the app works. If you are starting a new task, need to understand the data flow, or want to review business logic, read the in-depth files in the `.claude/docs/` directory:
- **Core Architecture & Data Flow:** Read `.claude/docs/architecture.md`
- **Features & User Flows:** Read `.claude/docs/features.md`

## Project Stack
- React (Vite version 6.3)
- Redux Toolkit for state management
- Supabase for authentication only
- Modern CSS for styling
- React Router for navigation
- Semantic Html for components

## Code Style
- Write clean, simple, readable code
- Use functional components with hooks only, no class components
- Use descriptive variable names: isLoading, hasError, userId, etc.
- Keep components small and focused on one job
- Separate logic from UI: put complex logic in custom hooks or utils
- Use early returns to avoid deeply nested if/else blocks
- Always handle loading and error states in UI

## File & Folder Structure
- components/ → reusable UI components (Button, Modal, etc.)
- components/pages/ → one file per route/page
- store/ → Redux slices and store setup
- hooks/ → custom React hooks
- lib/ → supabase client and helper functions
- utils/ → small pure utility functions
- styles -> css variables, global styles 
- Use `.jsx` extension for all files containing React components.
- Use `.js` for utility functions, hooks, and Redux slices.

## Redux Rules
- Use Redux Toolkit only (createSlice, createAsyncThunk)
- Keep store slices focused: one slice per feature (auth, ui, etc.)
- Never mutate state directly — RTK handles it with Immer
- Put async logic (API calls) in createAsyncThunk, not in components

## Supabase Rules
- Supabase is used ONLY for auth (login, signup, logout, session)
- Initialize the client once in lib/supabaseClient.js
- Never expose your Supabase keys in code — use .env variables
- Sync Supabase auth state to Redux on app load using onAuthStateChange

## React Router Rules
- use lazy imports for different routes
- use createBrowserRouter, useNavigate() etc.
- check for not found pages

## Component Rules
- One component per file
- Props should be clearly named and destructured at the top
- If a component is over ~80 lines, consider splitting it
- Avoid prop drilling more than 2 levels — use Redux instead
- try to optimize components with multiple useless rerenders using memo, useCallback(), useMemo()

## Styling
- Use Modern CSS with CSS variables for theming (defined in styles/)
- Avoid inline styles unless absolutely necessary
- Use standard CSS classe and modules, avoiding utility-class clutter in JSX
- Mobile-first: write default styles for mobile always use rem and @media-queries only when absolutely necessary

## What to Avoid
- Do NOT use useEffect for data that belongs in Redux
- Do NOT put business logic directly inside JSX
- Do NOT create massive components that do everything
- Do NOT hardcode secrets, URLs, or keys
- Do NOT use process.env. Use `import.meta.env.VITE_...` for environment variables, as this is a Vite project.
- Do NOT read, modify, or analyze anything inside `node_modules/`, `dist/`, or `build/` directories.

## When Writing Code
1. Understand what the component/feature needs to do
2. Plan the state and props needed
3. Write the simplest version that works
4. Add error and loading states
5. Clean up and simplify before finishing

## Responses
- Explain your reasoning briefly before writing code
- If something is complex, add a short comment in the code
- Suggest simpler alternatives if my approach is overly complicated
- Point out potential bugs or missing edge cases