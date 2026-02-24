# System Architecture & Technical Stack

This document outlines the technical design, data flow, and infrastructure powering the Collaborative Shopping List application.



## Technology Stack
* **Frontend Framework:** React (with functional components and hooks).
* **Styling:** CSS/SCSS (custom styling or a lightweight utility framework).
* **State Management:** Redux (for complex global state like user sessions, cached lists, and UI states).
* **Routing:** React Router DOM.
* **Backend & Database:** Supabase (PostgreSQL).
* **Authentication:** Supabase Auth.
* **External APIs:** 3rd-party Product API for populating the item dropdown.

## Core Infrastructure

**Frontend Architecture**
* Component-driven design separating presentational components (UI cards, buttons, inputs) from container components (data fetching, Redux connections).
* Redux slices divided by domains: `userSlice` (auth state), `listsSlice` (dashboard data), `activeListSlice` (current open list data), and `uiSlice` (modals, dark mode).

**Backend & BaaS (Supabase)**
* Supabase provides the PostgreSQL database, RESTful APIs, and user authentication out of the box.
* **Row Level Security (RLS):** Crucial for handling the complex permission model. RLS policies will ensure:
    * Lists can only be updated/deleted by their owner or associated collaborators.
    * Lists can be read by anyone possessing the specific `list_id` or unique URL slug.



**Data Persistence & Storage**
* **Supabase Database:** Handles all sensitive and structured data (Users, Lists, Items, Collaborator mapping).
* **LocalStorage:** Handles non-sensitive, user-specific UI preferences. Specifically used for the Dark Mode toggle state and user-selected Dashboard Filters/Sorting preferences to maintain state between sessions without database calls.

## External Integrations
**Product API Integration**
* A dedicated service function will handle fetching data from the external product API.
* Must implement pagination to handle large datasets efficiently within the dropdown UI.
* Fallback mechanism: If the API search returns empty, the UI must seamlessly transition to a custom text input for manual entry, which is then saved directly to the list's database table rather than the external API.

## Real-time Capabilities (Optional but Recommended)
* Utilize Supabase's real-time subscriptions on the `list_items` table to allow collaborators to see items moving between "To Buy", "Bought", and "Not Needed Anymore" instantly without refreshing.