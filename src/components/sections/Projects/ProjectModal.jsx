import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from '@/lib/gsap';
import { CheckCircleIcon } from '@/components/ui/icons/CheckCircleIcon';
import { ExternalLinkIcon } from '@/components/ui/icons/ExternalLinkIcon';
import { GitHubIcon } from '@/components/ui/icons/GitHubIcon';
import { LinkedInIcon } from '@/components/ui/icons/LinkedInIcon';
import styles from './ProjectModal.module.css';

export function ProjectModal({ project, onClose }) {
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const bannerRef = useRef(null);
  const bodyRef = useRef(null);
  const prevFocusedRef = useRef(null);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleClose = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced && panelRef.current && backdropRef.current) {
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' });
      gsap.to(panelRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  useEffect(() => {
    prevFocusedRef.current = document.activeElement;

    // Lock body scroll and smooth scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();

    // Focus body on open (tabindex="-1")
    bodyRef.current?.focus();

    // GSAP open animation
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced && panelRef.current && backdropRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }
      );
    }

    // Wheel over banner scrolls body: native passive wheel listener
    const bannerEl = bannerRef.current;
    const handleBannerWheel = (e) => {
      if (bodyRef.current) {
        bodyRef.current.scrollTop += e.deltaY;
      }
    };
    if (bannerEl) {
      bannerEl.addEventListener('wheel', handleBannerWheel, { passive: true });
    }

    // Keyboard handlers: ESC and Focus trap in document keydown listener inside open effect
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusables = panelRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
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

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      if (bannerEl) {
        bannerEl.removeEventListener('wheel', handleBannerWheel);
      }
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      window.__lenis?.start();
      prevFocusedRef.current?.focus?.();
    };
  }, []);

  const accentColor = project.accent === 'sec' ? 'var(--sec-bright)' : 'var(--eng)';
  const accentClass = project.accent === 'sec' ? styles.panelSec : styles.panelEng;

  const hasLinks = project.links?.live || project.links?.repo || project.links?.github || project.links?.linkedin;

  return createPortal(
    <div className={styles.overlay}>
      <div
        ref={backdropRef}
        className={styles.backdrop}
        aria-hidden="true"
        onClick={handleClose}
      />
      <dialog
        open
        ref={panelRef}
        className={`${styles.panel} ${accentClass}`}
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Top: Thumbnail banner with 44px circular close button */}
        <div ref={bannerRef} className={styles.banner}>
          <div className={styles.bannerFallback}>
            <span className={styles.fallbackTitle}>{project.title}</span>
          </div>

          {project.thumbnail && !imgError && (
            <img
              src={project.thumbnail}
              alt={project.title}
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`${styles.bannerImg} ${imgLoaded ? styles.bannerImgLoaded : ''}`}
              style={{ objectPosition: project.thumbnailPosition || 'center top' }}
            />
          )}

          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content in exact required order: tag chips, title, subtitle, description, highlights, link buttons */}
        <div
          ref={bodyRef}
          className={styles.body}
          data-lenis-prevent
          tabIndex={-1}
        >
          {/* 1. Tag chips (stack items as pills; accent border and text, transparent bg) */}
          {project.stack && project.stack.length > 0 && (
            <div className={styles.chipsRow}>
              {project.stack.map((tech) => (
                <span key={tech} className={styles.chip}>
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* 2. Title */}
          <h3 id="modal-project-title" className={styles.title}>
            {project.title}
          </h3>

          {/* 3. Subtitle (--text-3) */}
          {project.subtitle && <p className={styles.subtitle}>{project.subtitle}</p>}

          {/* 4. Description */}
          {project.description && <p className={styles.description}>{project.description}</p>}

          {/* 5. Highlights as a check list */}
          {project.highlights && project.highlights.length > 0 && (
            <div className={styles.highlightsWrap}>
              <h4 className={styles.highlightsHeader}>Key Highlights</h4>
              <ul className={styles.highlightsList}>
                {project.highlights.map((h) => (
                  <li key={h} className={styles.highlightItem}>
                    <CheckCircleIcon size={16} color={accentColor} className={styles.checkIcon} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 6. Pill link buttons with icons (Live Site, GitHub, LinkedIn) */}
          {hasLinks && (
            <div className={styles.actions}>
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.pillBtn}
                >
                  <ExternalLinkIcon size={18} />
                  <span>Live Site</span>
                </a>
              )}
              {(project.links?.repo || project.links?.github) && (
                <a
                  href={project.links.repo || project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.pillBtn}
                >
                  <GitHubIcon size={18} />
                  <span>GitHub</span>
                </a>
              )}
              {project.links?.linkedin && (
                <a
                  href={project.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.pillBtn}
                >
                  <LinkedInIcon size={18} />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          )}
        </div>
      </dialog>
    </div>,
    document.body
  );
}
