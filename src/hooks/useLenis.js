import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, []);

  return lenisRef;
}
