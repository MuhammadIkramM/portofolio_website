import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { MARQUEE_TEXT } from '@/data/profile';
import { createMarqueeScroll } from '@/animations/marquee';
import styles from './Marquee.module.css';

export function Marquee() {
  const bandRef = useRef(null);

  useGSAP(() => {
    createMarqueeScroll(bandRef.current);
  }, { scope: bandRef });

  const content = MARQUEE_TEXT.repeat(4);

  return (
    <div ref={bandRef} className={styles.band}>
      <div className={styles.track}>
        <span className={styles.text}>{content}</span>
        <span className={styles.text} aria-hidden="true">{content}</span>
      </div>
    </div>
  );
}
