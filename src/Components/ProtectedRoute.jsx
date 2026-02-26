import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const user = useSelector((state) => state.auth.user);
  const isLoadingAuth = useSelector((state) => state.auth.isLoadingAuth);

  if (isLoadingAuth) return null;
  if (!user) return <Navigate to="/" replace />;
  return <Outlet />;
}
