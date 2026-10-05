import { gsap, ScrollTrigger } from '@/lib/gsap';

export function createHeroExit(heroEl) {
  ScrollTrigger.create({
    trigger: heroEl,
    start: 'bottom 80%',
    end: 'bottom top',
    scrub: 1,
    animation: gsap.timeline()
      .to(heroEl.querySelectorAll('.hero__name-char'), {
        letterSpacing: '0.3em',
        opacity: 0,
        duration: 1,
      })
      .to(heroEl.querySelector('.hero__signature'), {
        opacity: 0,
        duration: 0.5,
      }, 0)
      .to(heroEl.querySelector('.hero__frame'), {
        opacity: 0,
        duration: 0.5,
      }, 0),
  });
}
