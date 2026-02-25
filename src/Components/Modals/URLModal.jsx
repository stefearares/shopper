import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { closeModal } from "../../store/uiSlice";
import ModalShell from "./ModalShell";
import styles from "./Modals.module.css";

// Accepts: a full URL like https://…/lists/abc, a path like /lists/abc, or just an ID
function extractListPath(input) {
  const trimmed = input.trim();
  try {
    const url = new URL(trimmed);
    // Same-origin or relative path from any host
    return url.pathname;
  } catch {
    // Not a full URL — treat as a path or bare ID
    if (trimmed.startsWith("/lists/")) return trimmed;
    // Bare UUID or slug → treat as list ID
    if (trimmed && !trimmed.includes(" ")) return `/lists/${trimmed}`;
    return null;
  }
}

export default function URLModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const onClose = () => dispatch(closeModal());

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const path = extractListPath(value);
    if (!path || !path.startsWith("/lists/")) {
      setError("Please enter a valid list URL or list ID.");
      return;
    }

    onClose();
    navigate(path);
  };

  return (
    <ModalShell title="Open a shared list" onClose={onClose}>
      <p className={styles.hint}>
        Paste a full list URL or just the list ID you received from a friend.
      </p>

      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="url-input">List URL or ID</label>
          <input
            id="url-input"
            type="text"
            placeholder="https://…/lists/abc  or  abc"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            autoComplete="off"
          />
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={!value.trim()}
          >
            Go to list
          </button>
        </div>
      </form>
    </ModalShell>
  );
}
