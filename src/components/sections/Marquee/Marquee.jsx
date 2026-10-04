import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { MARQUEE_DATA } from '@/data/profile';
import { Signature } from '@/components/ui/Signature';
import { createMarqueeScroll } from '@/animations/marquee';
import styles from './Marquee.module.css';

const REPEATS = [0, 1, 2, 3, 4, 5, 6, 7];

export function Marquee() {
  const bandRef = useRef(null);

  useGSAP(() => {
    createMarqueeScroll(bandRef.current);
  }, { scope: bandRef });

  return (
    <div ref={bandRef} data-marquee-band data-paper className={styles.band}>
      <div className={styles.track}>
        <div className={styles.loopGroup}>
          {REPEATS.map((i) => (
            <span key={i} className={styles.segment}>
              <span>{MARQUEE_DATA.name}</span>
              <span className={styles.sepEng}>✦</span>
              <span className={styles.jp}>{MARQUEE_DATA.nameJp}</span>
              <span className={styles.sepSec}>✦</span>
              <Signature className={styles.signature} />
              <span className={styles.sepEng}>✦</span>
            </span>
          ))}
        </div>
        <div className={styles.loopGroup} aria-hidden="true">
          {REPEATS.map((i) => (
            <span key={i} className={styles.segment}>
              <span>{MARQUEE_DATA.name}</span>
              <span className={styles.sepEng}>✦</span>
              <span className={styles.jp}>{MARQUEE_DATA.nameJp}</span>
              <span className={styles.sepSec}>✦</span>
              <Signature className={styles.signature} />
              <span className={styles.sepEng}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
