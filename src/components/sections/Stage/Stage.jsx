import { useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { STAGE_HEADER, STAGE_ITEMS, STAGE_INTRO } from '@/data/stage';
import { ArrowButton } from '@/components/ui/ArrowButton';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Stage.module.css';

export function Stage() {
  const sectionRef = useRef(null);
  const thumbRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const quickX = useRef(null);
  const quickY = useRef(null);

  useGSAP(() => {
    if (!thumbRef.current) return;
    quickX.current = gsap.quickTo(thumbRef.current, 'x', { duration: 0.2, ease: 'power2.out' });
    quickY.current = gsap.quickTo(thumbRef.current, 'y', { duration: 0.2, ease: 'power2.out' });
  }, { scope: sectionRef });

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    quickX.current?.(e.clientX - rect.left - 48);
    quickY.current?.(e.clientY - rect.top - 60);
  }, []);

  return (
    <section id="aktivitas" ref={sectionRef} className={styles.stage}>
      <div className={styles.head}>
        <div>
          <div className="section-kicker">
            <span>{STAGE_HEADER.kickerNum}</span> {STAGE_HEADER.kicker}
          </div>
          <Reveal>
            <h2 className={styles.heading}>
              {STAGE_HEADER.title} <i className={styles.script}>{STAGE_HEADER.titleScript}</i>
            </h2>
          </Reveal>
        </div>
        <Reveal>
          <p className={styles.intro}>{STAGE_INTRO}</p>
        </Reveal>
      </div>

      <div className={styles.list}>
        {STAGE_ITEMS.map((item, i) => (
          <div
            key={item.num}
            className={`${styles.row} ${hoveredIdx === i ? styles.hovered : ''} ${
              item.accent === 'eng' ? styles.rowEng : item.accent === 'sec' ? styles.rowSec : styles.rowDefault
            }`}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(-1)}
            onMouseMove={handleMouseMove}
            data-cursor
          >
            <span className={styles.num}>({item.num})</span>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.desc}>{item.desc}</p>
            <ArrowButton filled={hoveredIdx === i} className={styles.arrowBtn} />
          </div>
        ))}
      </div>

      <div
        ref={thumbRef}
        className={styles.thumb}
        style={{
          opacity: hoveredIdx >= 0 ? 1 : 0,
          backgroundImage: hoveredIdx >= 0 ? `url(${STAGE_ITEMS[hoveredIdx]?.thumb})` : 'none',
        }}
      />
    </section>
  );
}
