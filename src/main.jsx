import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App/App";
import Landing from "./Components/Pages/Landing/Landing";
import PageNotFound from "./Components/Pages/PageNotFound/PageNotFound";
import ShoppingLists from "./Components/Pages/ShoppingLists/ShoppingLists";
import Contact from "./Components/Pages/Contact/Contact";
import ListIdPage from "./Components/Pages/ListIdPage/ListIdPage";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: "lists", element: <ShoppingLists /> },
      { path: "*", element: <PageNotFound /> },
      { path: "lists/:listId", element: <ListIdPage /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
