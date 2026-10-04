import { gsap, ScrollTrigger } from '@/lib/gsap';

export function createHeroIntro(refs) {
  const tl = gsap.timeline();

  tl.fromTo(refs.photo, {
    opacity: 0,
    scale: 1.04,
  }, {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    ease: 'power2.out',
  });

  tl.from(refs.nameChars, {
    yPercent: 110,
    duration: 0.5,
    stagger: 0.09,
    ease: 'power3.out',
  }, '-=0.3');

  tl.from(refs.jpChars, {
    yPercent: 110,
    duration: 0.4,
    stagger: 0.1,
    ease: 'power3.out',
  }, '-=0.2');

  tl.fromTo(refs.textBlocks, {
    color: '#999',
    opacity: 0.3,
  }, {
    color: 'var(--ink)',
    opacity: 1,
    duration: 0.5,
    stagger: 0.08,
    ease: 'power2.out',
  }, '-=0.2');

  tl.fromTo(refs.borderLines, {
    scaleY: 0,
  }, {
    scaleY: 1,
    duration: 0.4,
    stagger: 0.05,
    ease: 'power2.out',
    transformOrigin: 'top',
  }, '-=0.3');

  tl.fromTo(refs.signature, {
    clipPath: 'inset(0 100% 0 0)',
  }, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 0.9,
    ease: 'power2.inOut',
  }, '-=0.2');

  return tl;
}

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
