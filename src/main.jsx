import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App/App";
import Landing from "./Components/Pages/Landing/Landing";
import PageNotFound from "./Components/Pages/PageNotFound/PageNotFound";
import ShoppingLists from "./Components/Pages/ShoppingLists/ShoppingLists";
import "./index.css";
import Contact from "./Components/Pages/Contact/Contact";
import ListIdPage from "./Components/Pages/ListIdPage/ListIdPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: "lists", element: <ShoppingLists /> },
      { path: "lists/:listId", element: <ListIdPage /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
