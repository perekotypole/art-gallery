import { Title } from "~/libs/components/components.js";

import { SocialMedia } from "./libs/consts/consts.js";
import styles from "./styles.module.css";
import clsx from "clsx";

const Footer: React.FC = () => {
  return (
    <footer className={styles["footer"]}>
      <div className={clsx("main-container", styles["footer-wrapper"])}>
        <div className={styles["title-wrapper"]}>
          <Title variant="light" />

          <p>
            You go-to platform for managing and exploring exquisite art pieces.
          </p>
        </div>

        <div className={styles["socials-wrapper"]}>
          {SocialMedia.map(({ name, url, icon: IconComponent }) => (
            <a
              className={styles["socials-item"]}
              key={`footer-social-${name}`}
              target="_blank"
              href={url}
            >
              <IconComponent className={styles["socials-icon"]} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export { Footer };
