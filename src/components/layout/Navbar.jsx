import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from '@/lib/gsap';
import { NAV_ITEMS } from '@/data/nav';
import { PROFILE } from '@/data/profile';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import styles from './Navbar.module.css';

const SECTION_IDS = NAV_ITEMS.map((n) => n.href.replace('#', ''));

export function Navbar() {
  const navRef = useRef(null);
  const active = useScrollSpy(SECTION_IDS);
  const [visible, setVisible] = useState(false);
  const [onPaper, setOnPaper] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#hero-end-marker',
      start: 'top top',
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    });

    const activePaperOverlaps = new Set();
    const updatePaperState = (id, isActive) => {
      if (isActive) {
        activePaperOverlaps.add(id);
      } else {
        activePaperOverlaps.delete(id);
      }
      setOnPaper(activePaperOverlaps.size > 0);
    };

    // Marquee band trigger: direct element trigger
    const marqueeEl = document.querySelector('[data-marquee-band]');
    if (marqueeEl) {
      ScrollTrigger.create({
        trigger: marqueeEl,
        start: 'top top+=56px',
        end: 'bottom top',
        onEnter: () => updatePaperState('marquee', true),
        onLeave: () => updatePaperState('marquee', false),
        onEnterBack: () => updatePaperState('marquee', true),
        onLeaveBack: () => updatePaperState('marquee', false),
      });
    }

    // Gallery break card trigger: direct element trigger with containerAnimation for horizontal scroll
    const setupBreakCardTrigger = (galleryTween) => {
      const breakCardEl = document.querySelector('[data-break-card]');
      if (!breakCardEl) return null;
      const config = {
        trigger: breakCardEl,
        start: 'top top+=56px',
        end: 'bottom top',
        onEnter: () => updatePaperState('breakCard', true),
        onLeave: () => updatePaperState('breakCard', false),
        onEnterBack: () => updatePaperState('breakCard', true),
        onLeaveBack: () => updatePaperState('breakCard', false),
      };
      if (galleryTween) {
        config.containerAnimation = galleryTween;
      }
      return ScrollTrigger.create(config);
    };

    let breakCardST = setupBreakCardTrigger(window.__galleryTween);

    const onGalleryReady = (e) => {
      if (breakCardST) breakCardST.kill();
      breakCardST = setupBreakCardTrigger(e.detail?.tween || window.__galleryTween);
    };
    window.addEventListener('gallery-scroll-ready', onGalleryReady, { once: true });

    return () => {
      window.removeEventListener('gallery-scroll-ready', onGalleryReady);
    };
  }, { scope: navRef });

  const handleClick = (e, href) => {
    e.preventDefault();
    if (href === '#top') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.1 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { duration: 1.1 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      ref={navRef}
      className={`${styles.nav} ${visible ? styles.visible : ''} ${onPaper ? `${styles.navOnPaper} nav--on-paper` : ''}`}
      role="navigation"
    >
      <a
        className={styles.brand}
        href="#top"
        onClick={(e) => handleClick(e, '#top')}
        data-cursor
      >
        {PROFILE.name} <span className={styles.brandScript}>Z.</span>
      </a>
      <nav className={styles.links}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`${styles.link} ${active === item.href.replace('#', '') ? styles.active : ''}`}
            onClick={(e) => handleClick(e, item.href)}
            data-cursor
          >
            <sup className={styles.num}>{item.num}</sup>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
