import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { AuthModal, URLModal } from "../Components/Modals/index";
import LoadingPage from "../Components/LoadingPage/LoadingPage";
import { useAuthSync } from "../hooks/useAuth";

export default function App() {
  useAuthSync();

  const activeModal = useSelector((state) => state.ui.activeModal);

  return (
    <>
      <Navbar />
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
