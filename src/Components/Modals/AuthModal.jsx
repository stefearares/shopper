import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/uiSlice";
import { supabase } from "../../lib/supabaseClient";
import ModalShell from "./ModalShell";
import styles from "./Modals.module.css";

export default function AuthModal() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const onClose = () => dispatch(closeModal());

  const switchTab = (newTab) => {
    setTab(newTab);
    setError("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (tab === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      if (tab === "login") {
        const { error: err } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (err) throw err;
        onClose();
      } else {
        const { error: err } = await supabase.auth.signUp({ email, password });
        if (err) throw err;
        setSuccessMsg("Check your email to confirm your account.");
      }
    } catch (err) {
      setError(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalShell
      title={tab === "login" ? "Welcome back" : "Create account"}
      onClose={onClose}
    >
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === "login" ? styles.active : ""}`}
          onClick={() => switchTab("login")}
          type="button"
        >
          Login
        </button>
        <button
          className={`${styles.tab} ${tab === "signup" ? styles.active : ""}`}
          onClick={() => switchTab("signup")}
          type="button"
        >
          Sign Up
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {successMsg && (
        <p
          style={{
            color: "#2d8a4e",
            background: "rgba(45,138,78,0.08)",
            borderRadius: "0.5rem",
            padding: "0.25rem 1rem",
            marginBottom: "1rem",
            fontSize: "1rem",
          }}
        >
          {successMsg}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="auth-email">Email</label>
          <input
            id="auth-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            autoFocus
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={tab === "login" ? "current-password" : "new-password"}
          />
        </div>

        {tab === "signup" && (
          <div className={styles.field}>
            <label htmlFor="auth-confirm">Confirm Password</label>
            <input
              id="auth-confirm"
              type="password"
              placeholder="*******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
        )}

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={isLoading}
            style={{ width: "100%" }}
          >
            {isLoading
              ? "Please wait…"
              : tab === "login"
                ? "Sign In"
                : "Create Account"}
          </button>
        </div>
      </form>

      <p className={styles.switchLink}>
        {tab === "login" ? "No account? " : "Already have one? "}
        <button
          type="button"
          onClick={() => switchTab(tab === "login" ? "signup" : "login")}
        >
          {tab === "login" ? "Sign up" : "Log in"}
        </button>
      </p>
    </ModalShell>
  );
}
