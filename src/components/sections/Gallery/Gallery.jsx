import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { GALLERY_ITEMS } from '@/data/gallery';
import { createGalleryScroll } from '@/animations/gallery';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Gallery.module.css';

function PhotoCard({ item }) {
  return (
    <article className={styles.card}>
      <img src={item.src} alt={item.tag} className={styles.cardImg} />
      <div className={styles.cardMeta}>
        <small>{item.num}</small>
        <small>{item.tag}</small>
      </div>
    </article>
  );
}

function DarkCard() {
  return (
    <article className={styles.darkCard}>
      <small>JKT48 — NEW ERA</small>
      <div className={styles.darkCardCenter}>
        <span className={styles.darkJp}>マーシャ</span>
      </div>
      <small>MARSHA LENATHEA</small>
    </article>
  );
}

function CtaCard() {
  return (
    <article className={styles.ctaCard}>
      <span className={styles.ctaScript}>
        Selalu<br />nantikan<br />aku ya!
      </span>
      <a href="#kontak" className={styles.ctaBtn}>KONTAK →</a>
    </article>
  );
}

export function Gallery() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    createGalleryScroll(sectionRef.current, trackRef.current);
  }, { scope: sectionRef });

  return (
    <section id="galeri" ref={sectionRef} className={styles.gallery}>
      <div className={styles.head}>
        <div>
          <div className="section-kicker">
            <span>04</span> GALERI
          </div>
          <Reveal>
            <h2 className={styles.heading}>
              Potret <i className={styles.script}>Marsha</i>
            </h2>
          </Reveal>
        </div>
        <span className={styles.hint}>GESER UNTUK MELIHAT →</span>
      </div>

      <div ref={trackRef} className={styles.track}>
        {GALLERY_ITEMS.map((item, i) => {
          if (item.type === 'dark') return <DarkCard key="dark" />;
          if (item.type === 'cta') return <CtaCard key="cta" />;
          return <PhotoCard key={i} item={item} />;
        })}
      </div>
    </section>
  );
}
