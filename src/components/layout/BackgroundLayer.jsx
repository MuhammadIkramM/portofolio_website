import styles from './BackgroundLayer.module.css';

export function BackgroundLayer() {
  return (
    <div
      aria-hidden="true"
      className={styles['bg-layer'] || styles.layer}
    />
  );
}
