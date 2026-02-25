import styles from "./Modals.module.css";

export default function Backdrop({ onClose, children }) {
  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="presentation"
      aria-hidden="false"
    >
      {children}
    </div>
  );
}
