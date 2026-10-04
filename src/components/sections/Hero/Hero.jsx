import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { HERO } from '@/data/profile';
import { createHeroExit } from '@/animations/hero';
import styles from './Hero.module.css';

const DRIP_HEIGHTS = [38, 22, 45, 26, 52, 30, 40];

export function Hero() {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const signatureRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (section) {
      createHeroExit(section);
    }
  }, { scope: sectionRef });

  return (
    <section id="top" ref={sectionRef} className={styles.hero}>
      {/* Background hero dipisah jadi elemen sendiri di layer paling bawah */}
      <div className={styles.heroBg} />

      {/* Layer 4: Konten hero (z-index 30) */}
      <div data-hero-frame className={`${styles.frame} hero__frame`}>
        <div className={styles.top}>
          <div data-hero-text className={styles.textBlock}>
            <div className={styles.badge}>
              <strong>JK|48</strong> NEW ERA
            </div>
            <strong className={styles.jikoTitle}>JIKOSOUKAI</strong>
            <p className={styles.jikoText}>{HERO.jikosoukai.text}</p>
          </div>
          <div data-hero-text className={`${styles.topRight} ${styles.textBlock}`}>
            <span className={styles.date}>{HERO.date}</span>
            <span className={styles.credit}>{HERO.credit}</span>
            <div className={styles.drips}>
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  data-hero-drip
                  className={styles.drip}
                  style={{ height: `${DRIP_HEIGHTS[i % DRIP_HEIGHTS.length]}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.jpHero}>
          {HERO.japaneseChars.map((char, i) => (
            <span key={i} data-hero-jp-char className={styles.jpChar}>
              <span>{char}</span>
            </span>
          ))}
        </div>

        <div className={styles.nameRow}>
          {HERO.nameChars.map((char, i) => (
            <span key={i} data-hero-name-char className={`${styles.nameChar} hero__name-char`}>
              <span>{char}</span>
            </span>
          ))}
        </div>

        <img
          ref={photoRef}
          data-hero-photo
          className={styles.photo}
          src={HERO.photo}
          alt="Marsha Lenathea"
        />

        <div
          ref={signatureRef}
          data-hero-signature
          className={`${styles.signature} hero__signature`}
        >
          {HERO.signature}
        </div>

        <div className={styles.bottom}>
          <div data-hero-text className={styles.textBlock}>
            <h3 className={styles.newsTitle}>{HERO.currentNews.title}</h3>
            <p className={styles.newsText}>{HERO.currentNews.text}</p>
          </div>
          <div data-hero-text className={`${styles.question} ${styles.textBlock}`}>
            <h3>{HERO.question.title}</h3>
            <p><strong>{HERO.question.quote}</strong></p>
            <small>{HERO.question.attribution}</small>
          </div>
        </div>

        <div data-hero-scroll className={styles.scrollLabel}>SCROLL</div>
      </div>

      <div id="hero-end-marker" style={{ position: 'absolute', bottom: 0 }} />
    </section>
  );
}
