import { gsap, ScrollTrigger } from '@/lib/gsap';

export function createMarqueeScroll(bandEl) {
  ScrollTrigger.create({
    trigger: bandEl,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    animation: gsap.fromTo(bandEl, {
      rotation: -2,
      scale: 1.04,
    }, {
      rotation: 0,
      scale: 1.04,
      ease: 'none',
    }),
  });
}
