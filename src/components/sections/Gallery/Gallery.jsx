import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { GALLERY_HEADER, GALLERY_DARK_CARD, GALLERY_CTA, GALLERY_ITEMS } from '@/data/gallery';
import { Signature } from '@/components/ui/Signature';
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
    <article data-break-card data-paper className={styles.darkCard}>
      <div className={styles.darkCardHeader}>
        <small className={styles.roleEng}>{GALLERY_DARK_CARD.roleEng}</small>
        <small className={styles.roleSec}>{GALLERY_DARK_CARD.roleSec}</small>
      </div>
      <div className={styles.darkCardCenter}>
        <Signature className={styles.darkCardSig} />
      </div>
      <div className={styles.darkCardFooter}>
        <small className={styles.darkCardName}>{GALLERY_DARK_CARD.name}</small>
      </div>
    </article>
  );
}

function CtaCard() {
  return (
    <article className={styles.ctaCard}>
      <span className={styles.ctaScript}>
        {GALLERY_CTA.text}
      </span>
      <a href={GALLERY_CTA.buttonHref} className={styles.ctaBtn}>
        {GALLERY_CTA.buttonText}
      </a>
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
              {GALLERY_HEADER.title} <i className={styles.script}>{GALLERY_HEADER.script}</i>
            </h2>
          </Reveal>
        </div>
        <span className={styles.hint}>{GALLERY_HEADER.hint}</span>
      </div>

      <div ref={trackRef} className={styles.track}>
        {GALLERY_ITEMS.map((item, i) => {
          if (item.type === 'dark') return <DarkCard key="dark" />;
          if (item.type === 'cta') return <CtaCard key="cta" />;
          if (!item.src) return null;
          return <PhotoCard key={i} item={item} />;
        })}
      </div>
    </section>
  );
}
