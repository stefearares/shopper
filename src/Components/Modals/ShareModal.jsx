import { useState } from "react";
import ModalShell from "./ModalShell";
import styles from "./Modals.module.css";

export default function ShareModal({ onClose }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ModalShell title="Share List" onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <button
          className={styles.btnSecondary}
          onClick={handleCopyLink}
          type="button"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 9H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
            <path d="M9 5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 7h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
          </svg>
          {isCopied ? "Copied!" : "Copy Link"}
        </button>

        <button
          className={styles.btnSecondary}
          type="button"
          disabled
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center", opacity: 0.5 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.105 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
          </svg>
          Add Friend
          <span style={{ fontSize: "0.7rem", background: "var(--brand-color)", color: "#fff", borderRadius: "0.25rem", padding: "0.1rem 0.35rem", marginLeft: "0.25rem" }}>
            Soon
          </span>
        </button>
      </div>
    </ModalShell>
  );
}
