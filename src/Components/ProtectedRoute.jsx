import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { IS_SUPABASE_CONFIGURED } from "../lib/supabaseClient";

export default function ProtectedRoute() {
  const user = useSelector((state) => state.auth.user);
  const isLoadingAuth = useSelector((state) => state.auth.isLoadingAuth);

  // When Supabase is not set up, allow access for development/testing
  if (!IS_SUPABASE_CONFIGURED) return <Outlet />;

  if (isLoadingAuth) return null;
  if (!user) return <Navigate to="/" replace />;
  return <Outlet />;
}
