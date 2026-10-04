import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { PROFILE, HERO } from '@/data/profile';
import { LiveDate } from '@/components/ui/LiveDate';
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
      {/* Layer 4: Konten hero (z-index 30) */}
      <div data-hero-frame className={`${styles.frame} hero__frame`}>
        <div className={styles.top}>
          {/* Kiri atas: quote (serif bold, 2–3 baris) */}
          <div data-hero-text className={styles.textBlock}>
            <p className={styles.heroQuote}>{PROFILE.quote}</p>
          </div>

          {/* Kanan atas: LiveDate + Garis tetesan */}
          <div data-hero-text className={`${styles.topRight} ${styles.textBlock}`}>
            <LiveDate className={styles.heroDate} />
            <div className={styles.drips}>
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
          </div>
        </div>

        {/* Baris kecil di atas judul: "Muhammad", sans, letter-spacing lebar */}
        <div className={styles.topLabelRow}>
          {HERO.topLabel.split('').map((char, i) => (
            <span key={i} data-hero-top-char className={styles.topChar}>
              <span>{char}</span>
            </span>
          ))}
        </div>

        {/* Judul besar: IKRAM (tetap flex space-between) */}
        <div className={styles.nameRow}>
          {HERO.nameChars.map((char, i) => (
            <span key={i} data-hero-name-char className={`${styles.nameChar} hero__name-char`}>
              <span>{char}</span>
            </span>
          ))}
        </div>

        {/* Backlight lembut dan foto cutout */}
        <div className={styles.photoBacklight} aria-hidden="true" />
        <img
          ref={photoRef}
          data-hero-photo
          className={styles.photo}
          src={HERO.photo}
          alt={PROFILE.fullName}
        />

        {/* Script di bawah huruf terakhir (M): "Muslimin" */}
        <div
          ref={signatureRef}
          data-hero-signature
          className={`${styles.signature} hero__signature`}
        >
          {HERO.signature}
        </div>

        {/* Kiri bawah: Software Developer & Kanan bawah: Cybersecurity */}
        <div className={styles.bottom}>
          <div data-hero-text className={`${styles.bottomCol} ${styles.textBlock}`}>
            <div className={styles.accentLineEng} />
            <h3 className={styles.softwareDevTitle}>{HERO.softwareDev.title}</h3>
            <p className={styles.bottomText}>{HERO.softwareDev.text}</p>
          </div>

          <div data-hero-text className={`${styles.bottomCol} ${styles.bottomRight} ${styles.textBlock}`}>
            <div className={styles.accentLineSec} />
            <h3 className={styles.cybersecTitle}>{HERO.cybersecurity.title}</h3>
            <p className={styles.bottomText}>{HERO.cybersecurity.text}</p>
            <small className={styles.attribution}>{HERO.cybersecurity.attribution}</small>
          </div>
        </div>

        {/* Teks vertikal SCROLL */}
        <div data-hero-scroll className={styles.scrollLabel}>SCROLL</div>
      </div>

      <div id="hero-end-marker" style={{ position: 'absolute', bottom: 0 }} />
    </section>
  );
}
