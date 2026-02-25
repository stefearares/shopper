import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { AuthModal, URLModal } from "../Components/Modals/index";
import LoadingPage from "../Components/LoadingPage/LoadingPage";
import { useAuthSync } from "../hooks/useAuth";
import { useDarkMode } from "../hooks/useDarkMode";

export default function App() {
  useAuthSync();
  useDarkMode();

  const activeModal = useSelector((state) => state.ui.activeModal);

  return (
    <>
      <Navbar />
      {/* Suspense here so Navbar stays visible during lazy route loads */}
      <main role="main">
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />

      {activeModal === "auth" && <AuthModal />}
      {activeModal === "url" && <URLModal />}
    </>
  );
}
