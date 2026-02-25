import ModalShell from "./ModalShell";
import styles from "./Modals.module.css";

const SORT_OPTIONS = [
  { value: "date_desc", label: "Newest first" },
  { value: "date_asc", label: "Oldest first" },
  { value: "name_asc", label: "Name A to Z" },
  { value: "name_desc", label: "Name Z to A" },
];

export default function FilterModal({ current, onApply, onClose }) {
  return (
    <ModalShell title="Sort & Filter" onClose={onClose}>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {SORT_OPTIONS.map((opt) => {
          const isActive = current === opt.value;
          return (
            <li key={opt.value}>
              <button
                type="button"
                className={`${styles.btnSecondary} ${isActive ? styles.btnPrimary : ""}`}
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => {
                  onApply(opt.value);
                  onClose();
                }}
              >
                {opt.label}
                {isActive && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </ModalShell>
  );
}
