import { gsap, ScrollTrigger } from '@/lib/gsap';

export function createGalleryScroll(sectionEl, trackEl) {
  const getScrollAmount = () => {
    const diff = trackEl.scrollWidth - window.innerWidth;
    return diff > 0 ? -diff : 0;
  };

  const tween = gsap.to(trackEl, {
    x: () => getScrollAmount(),
    ease: 'none',
  });

  ScrollTrigger.create({
    trigger: sectionEl,
    start: 'top top',
    end: () => `+=${Math.max(400, Math.abs(getScrollAmount()))}`,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
    animation: tween,
  });

  window.__galleryTween = tween;
  window.dispatchEvent(new CustomEvent('gallery-scroll-ready', { detail: { tween } }));

  return tween;
}
