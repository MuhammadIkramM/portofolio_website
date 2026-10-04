import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { MARQUEE_DATA } from '@/data/profile';
import { createMarqueeScroll } from '@/animations/marquee';
import styles from './Marquee.module.css';

const REPEATS = [0, 1, 2, 3];

export function Marquee() {
  const bandRef = useRef(null);

  useGSAP(() => {
    createMarqueeScroll(bandRef.current);
  }, { scope: bandRef });

  return (
    <div className={styles.marqueeOuter}>
      <div ref={bandRef} data-marquee-band data-paper className={styles.band}>
        <div className={styles.track}>
          <div className={styles.loopGroup}>
            {REPEATS.map((i) => (
              <span key={i} className={styles.segment}>
                {MARQUEE_DATA.items.map((item, idx) => (
                  <span key={idx} className={styles.itemWrapper}>
                    <span>{item}</span>
                    <span className={idx % 2 === 0 ? styles.sepEng : styles.sepSec}>✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
          <div className={styles.loopGroup} aria-hidden="true">
            {REPEATS.map((i) => (
              <span key={i} className={styles.segment}>
                {MARQUEE_DATA.items.map((item, idx) => (
                  <span key={idx} className={styles.itemWrapper}>
                    <span>{item}</span>
                    <span className={idx % 2 === 0 ? styles.sepEng : styles.sepSec}>✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
