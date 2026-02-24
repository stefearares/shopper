# App Features & UI Requirements

This document outlines the core functionality, user flows, and page-by-page feature breakdowns for the Collaborative Shopping List application.

## User Roles & Permissions
* **Guest (Non-Logged In):** Can view the Landing Page, Contact Page, and read-only versions of shopping lists if provided a direct URL.
* **Authenticated User (Owner):** Can create, edit, manage, and delete their own shopping lists.
* **Collaborator:** Authenticated users who have been granted access to a specific list via the "+" button. They share edit privileges for that list.

## Global Components
**Navbar**
* Logo ("shopper") on the far left, linking to the Landing Page (`/`).
* Navigation links for "Contact Page" and "Lists Page" (Lists Page is hidden for non-authenticated users).
* Profile Icon on the far right featuring a dropdown menu.
* Dropdown contains "Login / Enter URL" (if logged out) or "Logout" (if logged in).
* Dark Mode toggle slider inside the dropdown (state saved in LocalStorage).

**Modals**
* **Auth Modal:** Triggered by the "Join" or "Login" buttons for account creation and authentication.
* **URL Prompt Modal:** Triggered by "Find someone's list" or "Enter URL" to input a shared list link.
* **Confirmation Modal:** A standard "Are you sure?" prompt used before destructive actions (e.g., deleting a list).

## Pages
**1. Landing Page (`/`)**
* Primary Call to Action (CTA) area.
* "Join" button: Opens the Auth Modal.
* "Find someone's list" button: Opens the URL Prompt Modal.

**2. Contact Page (`/contact`)**
* Contact form aligned to the left side.
* Company/Contact information aligned to the right side.
* Embedded interactive map for "where to find us" positioned at the bottom.

**3. Lists Dashboard (`/lists` - Authenticated Only)**
* Displays a list/grid of all shopping lists accessible to the user (owned and collaborated).
* Control bar featuring sorting and searching options by List Title and Date.
* Each list item features an "Open" button (eye icon) to view the list, and a "Done" button (trash/check icon) to delete it (triggers Confirmation Modal).

**4. Single Shopping List View (`/list/:id`)**
* **Header Settings:** Editable list title, editable associated date (via calendar widget).
* **Sharing Options:** "Copy URL" and "Send to Mail" buttons located on the far right of the header. Add Collaborator "+" button for owners.
* **Item Board:** Three distinct columns/cards for managing products: "To Buy", "Bought", and "Not Needed Anymore". Items can be moved between these cards.
* **Adding Products:** The "To Buy" card features an "Add" button.
* **Product Selection:** Opens a paginated dropdown populated by an external Product API. If a product is missing, the user can manually type and add a custom product via a modal.
* **Completion:** A "Done Shopping" button at the bottom of the page. This deletes or archives the list and triggers the Confirmation Modal.
* **Access Control:** All interactive/editing features are disabled for users viewing via a shared link without being logged in or added as a collaborator.