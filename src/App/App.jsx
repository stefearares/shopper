import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main role="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
