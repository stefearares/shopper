import ModalShell from "./ModalShell";
import styles from "./Modals.module.css";

export default function ConfirmModal({
  message,
  onConfirm,
  onClose,
  confirmLabel = "Confirm",
  isDanger = false,
}) {
  return (
    <ModalShell title="Are you sure?" onClose={onClose}>
      <p
        style={{
          color: "var(--text-muted)",
          marginBottom: "0.25rem",
          lineHeight: 1.5,
        }}
      >
        {message}
      </p>
      <div className={styles.actions}>
        <button className={styles.btnSecondary} onClick={onClose}>
          Cancel
        </button>
        <button
          className={`${styles.btnPrimary} ${isDanger ? styles.danger : ""}`}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmLabel}
        </button>
      </div>
    </ModalShell>
  );
}
