import styles from "./LoadingPage.module.css";

export default function LoadingPage() {
  return (
    <div className={styles.wrapper} role="status" aria-label="Loading">
      <span className={styles.spinner} aria-hidden="true" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
