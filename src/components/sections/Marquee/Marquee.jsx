import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { MARQUEE_DATA } from '@/data/profile';
import { createMarqueeScroll } from '@/animations/marquee';
import styles from './Marquee.module.css';

const REPEATS = [0, 1, 2, 3];

function MarqueeGroup({ items, ariaHidden }) {
  return (
    <div className={styles.loopGroup} {...(ariaHidden ? { 'aria-hidden': 'true' } : {})}>
      {REPEATS.map((repeatIndex) => (
        <span key={`repeat-${repeatIndex}`} className={styles.segment}>
          {items.map((item, idx) => (
            <span key={`${repeatIndex}-${item}`} className={styles.itemWrapper}>
              <span>{item}</span>
              <span className={idx % 2 === 0 ? styles.sepEng : styles.sepSec}>✦</span>
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  const bandRef = useRef(null);

  useGSAP(() => {
    createMarqueeScroll(bandRef.current);
  }, { scope: bandRef });

  return (
    <div className={styles.marqueeOuter}>
      <div ref={bandRef} data-marquee-band data-paper className={styles.band}>
        <div className={styles.track}>
          <MarqueeGroup items={MARQUEE_DATA.items} />
          <MarqueeGroup items={MARQUEE_DATA.items} ariaHidden />
        </div>
      </div>
    </div>
  );
}
