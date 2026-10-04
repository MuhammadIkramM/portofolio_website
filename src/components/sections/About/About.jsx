import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { PROFILE } from '@/data/profile';
import { Reveal } from '@/components/ui/Reveal';
import styles from './About.module.css';

export function About() {
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
    <section id="profil" ref={sectionRef} className={styles.about}>
      <div className="section-kicker">
        <span>01</span> PROFIL
      </div>

      <div className={styles.grid}>
        <div className={styles.portraitWrap}>
          <img
            ref={photoRef}
            src={PROFILE.photo}
            alt="Marsha Lenathea portrait"
            className={styles.portrait}
          />
          <div className={styles.caption}>
            <span>{PROFILE.photoCaption.left}</span>
            <span>{PROFILE.photoCaption.right}</span>
          </div>
        </div>

        <div className={styles.jpCol}>
          {PROFILE.greeting === 'Halo, aku' && (
            <>{'マ\nー\nシ\nャ'.split('\n').map((c, i) => (
              <span key={i}>{c}</span>
            ))}</>
          )}
        </div>

        <div className={styles.copy}>
          <Reveal>
            <h2 className={styles.heading}>
              {PROFILE.greeting}<br />
              <i className={styles.scriptName}>{PROFILE.nameScript}</i>
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

          <Reveal className={styles.blockquote}>
            <div className={styles.bqLabel}>{PROFILE.intro.label}</div>
            <blockquote className={styles.bqText}>
              &ldquo;{PROFILE.intro.text}&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
