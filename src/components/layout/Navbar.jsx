import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { NAV_ITEMS } from '@/data/nav';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import styles from './Navbar.module.css';

const SECTION_IDS = NAV_ITEMS.map((n) => n.href.replace('#', ''));

export function Navbar() {
  const navRef = useRef(null);
  const active = useScrollSpy(SECTION_IDS);
  const [visible, setVisible] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#hero-end-marker',
      start: 'top top',
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    });
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
      className={`${styles.nav} ${visible ? styles.visible : ''}`}
      role="navigation"
    >
      <a
        className={styles.brand}
        href="#top"
        onClick={(e) => handleClick(e, '#top')}
        data-cursor
      >
        Marsha <span className={styles.brandScript}>ℒ</span>.
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
