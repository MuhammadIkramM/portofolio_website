import { useEffect, useRef, useCallback } from 'react';
import { gsap } from '@/lib/gsap';
import { NAV_ITEMS } from '@/data/nav';
import { SOCIALS } from '@/data/socials';
import { SocialIconLink } from '@/components/ui/SocialIconLink';
import { DownloadIcon } from '@/components/ui/icons/DownloadIcon';
import styles from './MobileMenu.module.css';

export function MobileMenu({ isOpen, onClose, activeSection }) {
  const overlayRef = useRef(null);
  const linkRefs = useRef([]);
  const firstLinkRef = useRef(null);
  const prevFocusRef = useRef(null);

  const animateOpen = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      gsap.set(overlay, { opacity: 1 });
      linkRefs.current.forEach((el) => el && gsap.set(el, { opacity: 1, y: 0 }));
      return;
    }

    gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' });
    linkRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, delay: i * 0.06, ease: 'power2.out' }
      );
    });
  }, []);

  const animateClose = useCallback((cb) => {
    const overlay = overlayRef.current;
    if (!overlay) { cb?.(); return; }
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      gsap.set(overlay, { opacity: 0 });
      cb?.();
      return;
    }

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: cb,
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      prevFocusRef.current = document.activeElement;
      animateOpen();

      window.__lenis?.stop();
      document.body.style.overflow = 'hidden';

      const mainEl = document.querySelector('main');
      if (mainEl) {
        mainEl.setAttribute('aria-hidden', 'true');
        mainEl.setAttribute('inert', '');
      }

      requestAnimationFrame(() => {
        firstLinkRef.current?.focus();
      });
    } else {
      document.body.style.overflow = '';
      window.__lenis?.start();

      const mainEl = document.querySelector('main');
      if (mainEl) {
        mainEl.removeAttribute('aria-hidden');
        mainEl.removeAttribute('inert');
      }

      prevFocusRef.current?.focus?.();
    }
  }, [isOpen, animateOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const panel = overlayRef.current;
        if (!panel) return;
        const focusables = panel.querySelectorAll(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 900) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, onClose]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();

    animateClose(() => {
      onClose();

      requestAnimationFrame(() => {
        const target = document.querySelector(href);
        if (target) {
          if (window.__lenis) {
            window.__lenis.scrollTo(target, { duration: 1.1 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  };

  return (
    <div
      ref={overlayRef}
      id="mobile-menu"
      className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <nav className={styles.linksList}>
        {NAV_ITEMS.map((item, i) => {
          const isActive = activeSection === item.href.replace('#', '');
          return (
            <a
              key={item.label}
              ref={(el) => {
                linkRefs.current[i] = el;
                if (i === 0) firstLinkRef.current = el;
              }}
              href={item.href}
              className={`${styles.linkItem} ${isActive ? styles.linkItemActive : ''}`}
              onClick={(e) => handleLinkClick(e, item.href)}
            >
              <span className={styles.linkNum}>{item.num}</span>
              <span className={styles.linkLabel}>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <div className={styles.socialRow}>
          {SOCIALS.map((social) => (
            <SocialIconLink key={social.id} social={social} />
          ))}
        </div>

        <a
          href="/cv/cv_muhammad_ikram_muslimin.pdf"
          download
          className={styles.cvButton}
          aria-label="Download CV"
        >
          <DownloadIcon size={18} />
          <span>Download CV</span>
        </a>
      </div>
    </div>
  );
}
