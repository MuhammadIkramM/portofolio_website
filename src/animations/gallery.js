import { gsap, ScrollTrigger } from '@/lib/gsap';

export function createGalleryScroll(sectionEl, trackEl) {
  const getScrollAmount = () => -(trackEl.scrollWidth - window.innerWidth);

  ScrollTrigger.create({
    trigger: sectionEl,
    start: 'top top',
    end: () => `+=${Math.abs(getScrollAmount())}`,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
    animation: gsap.to(trackEl, {
      x: getScrollAmount,
      ease: 'none',
    }),
  });
}
