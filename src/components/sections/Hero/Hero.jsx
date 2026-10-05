import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { PROFILE, HERO } from '@/data/profile';
import { SOCIALS } from '@/data/socials';
import { LiveDate } from '@/components/ui/LiveDate';
import { SocialIconLink } from '@/components/ui/SocialIconLink';
import { createHeroExit } from '@/animations/hero';
import styles from './Hero.module.css';

const DRIP_HEIGHTS = [38, 22, 45, 26, 52, 30, 40];
const HERO_SOCIAL_ORDER = ['instagram', 'linkedin', 'github', 'email'];

export function Hero() {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (section) {
      createHeroExit(section);
    }
  }, { scope: sectionRef });

  const heroSocials = HERO_SOCIAL_ORDER
    .map((id) => SOCIALS.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <section id="top" ref={sectionRef} className={styles.hero}>
      <div data-hero-frame className={`${styles.frame} hero__frame`}>
        <div className={styles.top}>
          {/* Top-left: social icon links */}
          <div data-hero-text className={styles.textBlock}>
            <div className={styles.socialRow}>
              {heroSocials.map((social) => (
                <SocialIconLink key={social.id} social={social} data-hero-social />
              ))}
            </div>
          </div>

          {/* Top-right: Cybersecurity */}
          <div data-hero-text className={`${styles.topRight} ${styles.textBlock}`}>
            <div className={styles.accentLineSec} />
            <h3 className={styles.cybersecTitle}>{HERO.cybersecurity.title}</h3>
          </div>
        </div>

        {/* Title Group: Top Label (MUHAMMAD), Name (IKRAM), and Signature (MUSLIMIN) */}
        <div className={styles.nameBlock}>
          {/* Small row above title: "Muhammad" */}
          <div className={styles.topLabelRow}>
            {HERO.topLabel.split('').map((char, i) => (
              <span key={i} data-hero-top-char className={styles.topChar}>
                <span>{char}</span>
              </span>
            ))}
          </div>

          {/* Large title: IKRAM */}
          <div className={styles.nameRow}>
            {HERO.nameChars.map((char, i) => (
              <span key={i} data-hero-name-char className={`${styles.nameChar} hero__name-char`}>
                <span>{char}</span>
              </span>
            ))}
          </div>

          {/* "Muslimin" under the last letter (M) — same style as "MUHAMMAD" */}
          <div
            data-hero-signature
            className={`${styles.signature} hero__signature`}
          >
            {HERO.signature}
          </div>
        </div>

        {/* Backlight and cutout photo */}
        <div className={styles.photoBacklight} aria-hidden="true" />
        <img
          ref={photoRef}
          data-hero-photo
          className={styles.photo}
          src={HERO.photo}
          alt={PROFILE.fullName}
          fetchpriority="high"
        />

        {/* Bottom-left: Software Developer & Bottom-right: Drips + LiveDate */}
        <div className={styles.bottom}>
          <div data-hero-text className={`${styles.bottomCol} ${styles.textBlock}`}>
            <h3 className={styles.softwareDevTitle}>{HERO.softwareDev.title}</h3>
            <div className={styles.accentLineEng} />
          </div>

          <div data-hero-text className={`${styles.bottomCol} ${styles.bottomRight} ${styles.textBlock}`}>
            <div className={styles.dripDateGroup}>
              <div className={styles.dripsRotator}>
                {DRIP_HEIGHTS.map((height, i) => (
                  <div
                    key={i}
                    data-hero-drip
                    className={`${styles.drip} ${
                      height === 52 ? styles.dripEng : height === 45 ? styles.dripSec : ''
                    }`}
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
              <LiveDate className={styles.heroDate} />
            </div>
          </div>
        </div>

        {/* Vertical SCROLL label */}
        <div className={styles.scrollWrapper}>
          <div data-hero-scroll className={styles.scrollLabel}>
            <div className={styles.scrollInner}>SCROLL</div>
          </div>
        </div>
      </div>

      <div id="hero-end-marker" style={{ position: 'absolute', bottom: 0 }} />
    </section>
  );
}
