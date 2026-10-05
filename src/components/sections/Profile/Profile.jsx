import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { PROFILE } from '@/data/profile';
import { DownloadIcon } from '@/components/ui/icons/DownloadIcon';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Profile.module.css';

export function Profile() {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(photoRef.current, {
      filter: 'grayscale(1)',
      clipPath: 'inset(100% 0 0 0)',
    }, {
      filter: 'grayscale(0)',
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.2,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: photoRef.current,
        start: 'top 80%',
        once: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section id="profile" ref={sectionRef} className={styles.about}>
      <div className="section-kicker">
        <span>01</span> PROFILE
      </div>

      <div className={styles.grid}>
        <div className={styles.portraitWrap}>
          <img
            ref={photoRef}
            src={PROFILE.photo}
            alt={`${PROFILE.fullName} portrait`}
            className={styles.portrait}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.caption}>
            <span>{PROFILE.photoCaption}</span>
          </div>
        </div>

        <div className={styles.copy}>
          <Reveal>
            <h2 className={styles.heading}>
              <span className={styles.headingMain}>{PROFILE.greeting}</span>
              <span className={styles.nameAccent}>{PROFILE.nameLabel}</span>
            </h2>
          </Reveal>

          <Reveal>
            <p className={styles.lead}>{PROFILE.bio}</p>
          </Reveal>

          <div className={styles.facts}>
            {PROFILE.facts.map((fact) => (
              <Reveal key={fact.label} className={styles.fact}>
                <small>{fact.label}</small>
                <b>{fact.value}</b>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <a
              href="/cv/Muhammad-Ikram-Muslimin-CV.pdf"
              download
              className={styles.cvButton}
              aria-label="Download CV"
            >
              <DownloadIcon size={18} />
              <span>Download CV</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
