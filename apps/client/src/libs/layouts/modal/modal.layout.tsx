import X from "~/assets/icons/cross.svg?react";

import styles from "./styles.module.css";

type Props = React.PropsWithChildren<{
  onClose: () => void;
}>;

const ModalLayout: React.FC<Props> = ({ children, onClose }) => {
  return (
    <div
      className={styles["overlay"]}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={styles["modal-content"]}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
      >
        <button
          onClick={onClose}
          className={styles["close-button"]}
          aria-label="Close modal"
        >
          <X className={styles["close-button-icon"]} />
        </button>

        <div className={styles["content"]}>{children}</div>
      </div>
    </div>
  );
};

export { ModalLayout };
