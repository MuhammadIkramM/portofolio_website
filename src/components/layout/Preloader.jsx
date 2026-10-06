import { createPortal } from 'react-dom';
import styles from './Preloader.module.css';

export function Preloader() {
  return createPortal(
    <div data-preloader-overlay className={styles.preloaderOverlay}>
      {/* Layer 2: Preloader Dark */}
      <div data-preloader-dark className={styles.preloaderDark}>
        <div data-preloader-inner className={styles.inner}>
          <div data-preloader-signature className={styles.titleWrap}>
            <h1 className={styles.title}>IKRAM</h1>
          </div>
          <div className={styles.progressWrap}>
            <div className={styles.progressTrack}>
              <div data-preloader-progress className={styles.progressFill} />
            </div>
            <div className={styles.progressMeta}>
              <span className={styles.name}>Loading...</span>
              <span data-preloader-counter className={styles.counter}>000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 3: 5 Column Wipe */}
      <div data-wipe-container className={styles.wipe}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            data-wipe-col
            className={styles.wipeCol}
            style={{ left: `${i * 20}%` }}
          />
        ))}
      </div>
    </div>,
    document.body
  );
}
