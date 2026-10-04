import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { QUOTE_DATA } from '@/data/profile';
import styles from './Quote.module.css';

export function Quote() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const words = sectionRef.current.querySelectorAll(`.${styles.word}`);
    const cite = sectionRef.current.querySelector(`.${styles.cite}`);

    gsap.fromTo(words, {
      opacity: 0.15,
    }, {
      opacity: 1,
      duration: 0.4,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'center center',
        scrub: true,
      },
    });

    if (cite) {
      gsap.fromTo(cite, {
        clipPath: 'inset(0 100% 0 0)',
      }, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.8,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center 60%',
          once: true,
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section id="quote" ref={sectionRef} className={styles.quote}>
      <div className={styles.label}>{QUOTE_DATA.label}</div>

      <div className={styles.bgChar} aria-hidden="true">マ</div>

      <blockquote className={styles.text}>
        {QUOTE_DATA.words.map((word, i) => (
          <span key={i} className={styles.word}>
            {word}{' '}
          </span>
        ))}
      </blockquote>

      <cite className={styles.cite}>{QUOTE_DATA.attribution}</cite>
    </section>
  );
}
