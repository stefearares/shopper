import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./App/App";
import ProtectedRoute from "./Components/ProtectedRoute";
// Landing loads immediately — it's the first route users see
import Landing from "./Components/Pages/Landing/Landing";
import "./index.css";

// All other pages are lazy-loaded (downloaded only when navigated to)
const ShoppingLists = lazy(() => import("./Components/Pages/ShoppingLists/ShoppingLists"));
const ListIdPage = lazy(() => import("./Components/Pages/ListIdPage/ListIdPage"));
const Contact = lazy(() => import("./Components/Pages/Contact/Contact"));
const PageNotFound = lazy(() => import("./Components/Pages/PageNotFound/PageNotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: "lists",
        element: <ProtectedRoute />,
        children: [{ index: true, element: <ShoppingLists /> }],
      },
      { path: "lists/:listId", element: <ListIdPage /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <PageNotFound /> },
      { path: "lists/:listId", element: <ListIdPage /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
