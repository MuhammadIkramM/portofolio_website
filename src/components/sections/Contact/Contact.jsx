import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { SOCIALS, FOOTER } from '@/data/social';
import { LiveDate } from '@/components/ui/LiveDate';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowButton } from '@/components/ui/ArrowButton';
import styles from './Contact.module.css';

export function Contact() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const links = sectionRef.current.querySelectorAll(`.${styles.socialLink}`);
    gsap.from(links, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
      },
    });

    const giant = sectionRef.current.querySelector(`.${styles.giant}`);
    if (giant) {
      gsap.from(giant, {
        yPercent: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: giant,
          start: 'top 90%',
          once: true,
        },
      });
    }
  }, { scope: sectionRef });

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <section id="kontak" ref={sectionRef} className={styles.contact}>
      <div className="section-kicker">
        <span>{FOOTER.kickerNum}</span> {FOOTER.kicker}
      </div>

      <Reveal>
        <h2 className={styles.heading}>
          {FOOTER.heading}<br />
          <i className={styles.script}>{FOOTER.headingScript}</i>
        </h2>
      </Reveal>

      <div className={styles.socials}>
        {SOCIALS.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
            data-cursor
          >
            <span>{social.name}</span>
            <span className={styles.arrow}>↗</span>
          </a>
        ))}
      </div>

      <div className={styles.meta}>
        <span className={styles.credit}>{FOOTER.credit}</span>
        <LiveDate className={styles.metaDate} />
        <button className={styles.backTop} onClick={scrollToTop}>
          {FOOTER.backToTop}
          <ArrowButton direction="up" className={styles.backTopBtn} />
        </button>
      </div>

      <div className={styles.giantWrap}>
        <div className={styles.giant} aria-hidden="true">{FOOTER.giant}</div>
      </div>

      <div className={styles.copyright}>
        &copy; {currentYear} {FOOTER.credit} · Portfolio
      </div>
    </section>
  );
}
