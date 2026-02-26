import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../store/authSlice";
import { supabase } from "../lib/supabaseClient";

export function useAuthSync() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userRef = useRef(user);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
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
      const current = userRef.current;
      // Ignore a new user that comes from a shared url. fixed the previous bug where the user would get replaced
      if (current && session?.user && current.id !== session.user.id) return;

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
    await supabase.auth.signOut();
    dispatch(clearUser());
  };

  return {
    user,
    isAuthenticated: user !== null,
    isLoadingAuth,
    logout,
  };
}
