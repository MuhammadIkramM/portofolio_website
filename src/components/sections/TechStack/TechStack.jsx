import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { TECH_STACK } from '@/data/techStack';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './TechStack.module.css';

export function TechStack() {
  const sectionRef = useRef(null);

  const activeCategories = TECH_STACK.filter(
    (group) => group.items && group.items.length > 0
  );

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const categories = sectionRef.current.querySelectorAll(`.${styles.categoryBlock}`);
    categories.forEach((cat) => {
      const cards = cat.querySelectorAll(`.${styles.card}`);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cat,
          start: 'top 85%',
          once: true,
        },
      });

      tl.fromTo(
        cat,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        }
      );

      if (cards.length > 0) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: 'power2.out',
          },
          0.15
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section id="tech-stack" ref={sectionRef} className={styles.techStack}>
      <SectionHeader
        className={styles.sectionHeader}
        kicker={<><span>04</span> TECH STACK</>}
        title="Tech"
        accent="Stack"
        subtitle="The tools and technologies I use across development and security."
      />

      <div className={styles.categoriesList}>
        {activeCategories.map((group) => (
          <div key={group.category} className={styles.categoryBlock}>
            <div className={styles.categoryLabel}>{group.category}</div>
            <div className={styles.cardsGrid}>
              {group.items.map((tech) => {
                const IconComponent = tech.Icon;
                const iconColor = tech.brand || 'var(--text)';
                const iconSize = tech.outline ? 40 : 32;

                return (
                  <div key={tech.id} className={styles.card}>
                    <div className={styles.iconWrap} style={{ color: iconColor }}>
                      <IconComponent size={iconSize} />
                    </div>
                    <span className={styles.name} title={tech.name}>
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
