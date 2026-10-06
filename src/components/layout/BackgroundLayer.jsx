import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import styles from './BackgroundLayer.module.css';

export function BackgroundLayer() {
  const blueRef = useRef(null);
  const redRef = useRef(null);
  const revealedRef = useRef(false);

  useEffect(() => {
    const blue = blueRef.current;
    const red = redRef.current;
    if (!blue || !red) return;

    const reveal = (immediate = false) => {
      if (revealedRef.current) return;
      revealedRef.current = true;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (immediate || prefersReduced) {
        gsap.set([blue, red], { opacity: 1, scale: 1, clearProps: 'transform,willChange' });
        return;
      }

      gsap.set([blue, red], { willChange: 'transform, opacity' });
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set([blue, red], { opacity: 1, clearProps: 'transform,willChange' });
        },
      });

      tl.fromTo(
        blue,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 2.6, ease: 'power2.inOut' },
        0
      );

      tl.fromTo(
        red,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 2.6, ease: 'power2.inOut' },
        0.3
      );
    };

    // Check if intro is skipped via reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      reveal(true);
      return;
    }

    const handleReveal = (e) => {
      reveal(e?.detail?.immediate ?? false);
    };

    window.addEventListener('intro:reveal', handleReveal, { once: true });

    // Failsafe: if no trigger arrives within 6s of mount, reveal anyway
    const timer = setTimeout(() => {
      reveal(false);
    }, 6000);

    return () => {
      window.removeEventListener('intro:reveal', handleReveal);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div aria-hidden="true" className={styles.layer}>
      <div ref={blueRef} className={styles.layerBlue} />
      <div ref={redRef} className={styles.layerRed} />
    </div>
  );
}
