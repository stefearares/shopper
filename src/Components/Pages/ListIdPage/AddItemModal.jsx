import { useState, useEffect } from "react";
import style from "./Modal.module.css";

const INITIAL = { name: "", price: "" };

export default function AddItemModal({ onAdd, onClose }) {
  const [form, setForm] = useState(INITIAL);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onAdd({ name: form.name.trim(), price: form.price || "0.00" });
  };

  return (
    <div
      className={style.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Add item"
    >
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.modalHeader}>
          <h2 className={style.modalTitle}>Add Item</h2>
          <button className={style.closeBtn} onClick={onClose} aria-label="Close modal" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className={style.modalFields}>
            <div className={style.modalFieldGroup}>
              <label htmlFor="item-name">Item name</label>
              <input
                id="item-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Whole Milk"
                required
                autoFocus
                autoComplete="off"
              />
            </div>

            <div className={style.modalFieldGroup}>
              <label htmlFor="item-price">Price (optional)</label>
              <input
                id="item-price"
                name="price"
                type="text"
                inputMode="decimal"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                autoComplete="off"
              />
            </div>
          </div>

          <div className={style.modalActions}>
            <button className={style.modalCancelBtn} type="button" onClick={onClose}>
              Cancel
            </button>
            <button className={style.modalSubmitBtn} type="submit" disabled={!form.name.trim()}>
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
