import clsx from "clsx";

import Logo from "~/assets/logo.svg?react";

import styles from "./styles.module.css";

type Props = {
  variant?: 'dark' | 'light';
  withIcon?: boolean;
}

const Title: React.FC<Props> = ({
  withIcon = false,
  variant = 'dark',
}) => {
  return <span className={clsx(styles['title'], styles[`title-variant-${variant}`])}>
    {withIcon && <Logo className={clsx(styles['icon'], styles[`icon-variant-${variant}`])} />}
    
    <span>ArtGalleryManager</span>
  </span>
}

export { Title };