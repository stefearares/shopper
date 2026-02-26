import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { closeModal } from "../../store/uiSlice";
import ModalShell from "./ModalShell";
import styles from "./Modals.module.css";
import { extractListPath } from "../../utils/urlHelpers";

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
      setError("Please enter a valid list URL.");
      return;
    }

    onClose();
    navigate(path);
  };

  return (
    <ModalShell title="Open a shared list" onClose={onClose}>
      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="url-input">List URL or ID</label>
          <input
            id="url-input"
            type="text"
            placeholder="https:/lists/1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            autoComplete="off"
          />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={onClose}
          >
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
