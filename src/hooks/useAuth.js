import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../store/authSlice";
import { supabase, IS_SUPABASE_CONFIGURED } from "../lib/supabaseClient";

export function useAuthSync() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!IS_SUPABASE_CONFIGURED) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        dispatch(setUser(session.user));
      } else {
        dispatch(clearUser());
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        dispatch(setUser(session.user));
      } else {
        dispatch(clearUser());
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);
}

export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoadingAuth = useSelector((state) => state.auth.isLoadingAuth);

  const logout = async () => {
    if (IS_SUPABASE_CONFIGURED) await supabase.auth.signOut();
    dispatch(clearUser());
  };

  return {
    user,
    isAuthenticated: user !== null,
    isLoadingAuth,
    logout,
  };
}
