import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { EXPERIENCE_ITEMS } from '@/data/experience';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { BriefcaseIcon } from '@/components/ui/icons/BriefcaseIcon';
import { CalendarIcon } from '@/components/ui/icons/CalendarIcon';
import { MapPinIcon } from '@/components/ui/icons/MapPinIcon';
import { CheckCircleIcon } from '@/components/ui/icons/CheckCircleIcon';
import styles from './Experience.module.css';

export function Experience() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    // Timeline line scrub
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 85%',
            scrub: true,
          },
        }
      );
    }

    // Items fade up on entry
    const items = sectionRef.current.querySelectorAll(`.${styles.item}`);
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section id="experience" ref={sectionRef} className={styles.experience}>
      <SectionHeader
        kicker={<><span>02</span> EXPERIENCE</>}
        title="Work"
        accent="Experience"
        subtitle="Roles, responsibilities, and impact."
      />

      {EXPERIENCE_ITEMS.length === 0 ? (
        <div className={styles.emptyWrap}>
          <p className={styles.empty}>Experience details coming soon.</p>
        </div>
      ) : (
        <div className={styles.timeline}>
          {/* Vertical line through centers of nodes */}
          <div className={styles.lineTrack} aria-hidden="true">
            <div ref={lineRef} className={styles.lineFill} />
          </div>

          <div className={styles.itemsList}>
            {EXPERIENCE_ITEMS.map((item) => {
              const accentColor = item.accent === 'sec' ? 'var(--sec-bright)' : 'var(--eng)';
              const accentClass = item.accent === 'sec' ? styles.itemSec : styles.itemEng;

              return (
                <div key={item.id} className={`${styles.item} ${accentClass}`}>
                  <div className={styles.node} aria-hidden="true">
                    <BriefcaseIcon size={20} color={accentColor} />
                  </div>

                  <article className={styles.card}>
                    <header className={styles.cardHeader}>
                      <div className={styles.roleGroup}>
                        <h3 className={styles.role}>{item.role}</h3>
                        <span className={styles.organization}>{item.organization}</span>
                      </div>
                      <span className={styles.typePill}>{item.type}</span>
                    </header>

                    <div className={styles.metaRow}>
                      <span className={styles.metaItem}>
                        <CalendarIcon size={14} color="var(--text-2)" />
                        <span>{item.period}</span>
                      </span>
                      <span className={styles.metaItem}>
                        <MapPinIcon size={14} color="var(--text-2)" />
                        <span>{item.location}</span>
                      </span>
                    </div>

                    <p className={styles.summary}>{item.summary}</p>

                    {item.highlights && item.highlights.length > 0 && (
                      <ul className={styles.highlights}>
                        {item.highlights.map((h) => (
                          <li key={h} className={styles.highlightItem}>
                            <CheckCircleIcon size={15} color={accentColor} className={styles.checkIcon} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
