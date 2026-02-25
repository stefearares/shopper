import { useState } from "react";
import ModalShell from "./ModalShell";
import styles from "./Modals.module.css";

export default function CreateListModal({ onCreate, onClose }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({ title: title.trim(), date });
    onClose();
  };

  return (
    <ModalShell title="New Shopping List" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="list-title">List Name</label>
          <input
            id="list-title"
            type="text"
            placeholder="e.g. Weekly Groceries"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="list-date">Date</label>
          <input
            id="list-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
            disabled={!title.trim()}
          >
            Create
          </button>
        </div>
      </form>
    </ModalShell>
  );
}
