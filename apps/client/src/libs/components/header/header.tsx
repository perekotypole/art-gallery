import { Title } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const Header: React.FC = () => {
  return <header className={styles["header"]}>
    <div className="main-container">
      <Title withIcon />
    </div>
  </header>
}

export { Header };