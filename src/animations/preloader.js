import { gsap } from '@/lib/gsap';

export function createPreloaderTimeline(refs, onComplete) {
  const tl = gsap.timeline({
    onComplete,
  });

  const counter = { value: 0 };

  tl.from(refs.chars, {
    yPercent: 110,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power3.out',
  }, 0.1);

  tl.to(counter, {
    value: 100,
    duration: 1.4,
    ease: 'power2.inOut',
    onUpdate: () => {
      if (refs.counterEl) {
        refs.counterEl.textContent = String(Math.floor(counter.value)).padStart(3, '0');
      }
    },
  }, 0.1);

  tl.to(refs.progressBar, {
    scaleX: 1,
    duration: 1.4,
    ease: 'power2.inOut',
    transformOrigin: 'left',
  }, 0.1);

  tl.to(refs.inner, {
    opacity: 0,
    duration: 0.3,
  }, '+=0.3');

  tl.fromTo(refs.wipeCols, {
    yPercent: 100,
  }, {
    yPercent: 0,
    duration: 0.5,
    stagger: 0.07,
    ease: 'power3.inOut',
  }, '+=0.25');

  if (refs.container) {
    tl.to(refs.container, {
      opacity: 0,
      duration: 0.15,
      onComplete: () => {
        refs.container.style.display = 'none';
      },
    });
  }

  return tl;
}
