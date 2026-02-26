import style from "./ListIdPage.module.css";

const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 16 16"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
    />
  </svg>
);

const ChevronLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 16 16"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 16 16"
    aria-hidden="true"
  >
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
  </svg>
);

export default function ItemColumn({
  title,
  ariaLabel,
  items,
  isOwner,
  emptyMessage,
  onMove,
  onDelete,
  moveLabel,
  isBought = false,
  footer,
}) {
  return (
    <section className={style.column} aria-label={ariaLabel}>
      <h2 className={style.columnTitle}>{title}</h2>

      <ul className={style.itemList}>
        {items.length === 0 && (
          <li className={style.emptyState}>{emptyMessage}</li>
        )}
        {items.map((item) => (
          <li
            key={item.id}
            className={`${style.item} ${isBought ? style.itemBought : ""}`}
          >
            {isOwner && isBought && (
              <button
                className={style.iconBtn}
                onClick={() => onMove(item)}
                type="button"
                aria-label={`${moveLabel} ${item.name}`}
                title="Move back"
              >
                <ChevronLeft />
              </button>
            )}

            <div className={style.itemInfo}>
              <span className={style.itemName} title={item.name}>
                {item.name}
              </span>
              {item.price && (
                <span className={style.itemPrice}>
                  ${Number(item.price).toFixed(2)}
                </span>
              )}
            </div>

            {isOwner && !isBought && (
              <div className={style.itemActions}>
                <button
                  className={style.iconBtn}
                  onClick={() => onMove(item)}
                  type="button"
                  aria-label={`Move ${item.name} to bought`}
                  title="Move to bought"
                >
                  <ChevronRight />
                </button>
                <button
                  className={`${style.iconBtn} ${style.deleteBtn}`}
                  onClick={() => onDelete(item.id)}
                  type="button"
                  aria-label={`Delete ${item.name}`}
                  title="Delete"
                >
                  <DeleteIcon />
                </button>
              </div>
            )}

            {isOwner && isBought && (
              <button
                className={`${style.iconBtn} ${style.deleteBtn}`}
                onClick={() => onDelete(item.id)}
                type="button"
                aria-label={`Delete ${item.name}`}
                title="Delete"
              >
                <DeleteIcon />
              </button>
            )}
          </li>
        ))}
      </ul>

      {isOwner && footer && <div className={style.columnFooter}>{footer}</div>}
    </section>
  );
}
