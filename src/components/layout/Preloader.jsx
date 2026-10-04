import { createPortal } from 'react-dom';
import { Signature } from '@/components/ui/Signature';
import styles from './Preloader.module.css';

export function Preloader() {
  return createPortal(
    <>
      {/* Layer 2: Preloader Dark (z-index 10) */}
      <div data-preloader-dark className={styles.preloaderDark}>
        <div data-preloader-inner className={styles.inner}>
          <div data-preloader-signature className={styles.signatureWrap}>
            <Signature className={styles.signatureText} />
          </div>
          <div className={styles.progressWrap}>
            <div className={styles.progressTrack}>
              <div data-preloader-progress className={styles.progressFill} />
            </div>
            <div className={styles.progressMeta}>
              <span className={styles.name}>IKRAM</span>
              <span data-preloader-counter className={styles.counter}>000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 3: 5 Column Wipe (z-index 20) */}
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
    </>,
    document.body
  );
}
