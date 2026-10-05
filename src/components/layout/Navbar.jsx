import { useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from '@/lib/gsap';
import { NAV_ITEMS } from '@/data/nav';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { MobileMenu } from './MobileMenu';
import styles from './Navbar.module.css';

const SECTION_IDS = NAV_ITEMS.map((n) => n.href.replace('#', ''));

export function Navbar() {
  const navRef = useRef(null);
  const active = useScrollSpy(SECTION_IDS);
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className={`${styles.nav} ${visible ? styles.visible : ''}`}
        role="navigation"
      >
        <a
          className={styles.brand}
          href="#top"
          onClick={(e) => handleClick(e, '#top')}
          aria-label="Ikrams, back to top"
        >
          Ikrams.
        </a>

        {/* Desktop links (>= 900px) */}
        <nav className={styles.links}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`${styles.link} ${active === item.href.replace('#', '') ? styles.active : ''}`}
              onClick={(e) => handleClick(e, item.href)}
            >
              <sup className={styles.num}>{item.num}</sup>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Hamburger button (<= 899px) */}
        <button
          type="button"
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
        </button>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={closeMenu} activeSection={active} />
    </>
  );
}
