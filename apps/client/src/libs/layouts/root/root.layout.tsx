import { Footer, Header } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles["page"]}>
      <Header />

      <main className={styles["content-wrapper"]}>{children}</main>

      <Footer />
    </div>
  );
};

export { RootLayout };
