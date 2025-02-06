import styles from "./styles.module.css";

type Props = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

const Button: React.FC<Props> = ({ label, onClick, type = "button" }) => {
  return (
    <button className={styles["button"]} onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export { Button };
