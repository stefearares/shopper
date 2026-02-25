import { useEffect } from "react";
import Backdrop from "./Backdrop";
import styles from "./Modals.module.css";

export default function ModalShell({ title, onClose, children }) {
  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <Backdrop onClose={onClose}>
      <div
        className={styles.shell}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.shellHeader}>
          <h2 className={styles.shellTitle} id="modal-title">
            {title}
          </h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className={styles.shellBody}>{children}</div>
      </div>
    </Backdrop>
  );
}
