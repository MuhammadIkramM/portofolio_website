import { gsap } from '@/lib/gsap';

/**
 * Reveal all Hero elements immediately (used for ?skip query).
 */
export function revealHeroImmediately(heroRefs) {
  window.dispatchEvent(new CustomEvent('intro:reveal', { detail: { immediate: true } }));
  if (!heroRefs) return;

  if (heroRefs.photo) {
    gsap.set(heroRefs.photo, { opacity: 1, scale: 1 });
  }
  if (heroRefs.nameChars && heroRefs.nameChars.length > 0) {
    gsap.set(heroRefs.nameChars, { y: 0, yPercent: 0 });
  }
  const topChars = (heroRefs.topLabelChars && heroRefs.topLabelChars.length > 0)
    ? heroRefs.topLabelChars
    : heroRefs.jpChars;
  if (topChars && topChars.length > 0) {
    gsap.set(topChars, { y: 0, yPercent: 0 });
  }
  if (heroRefs.textBlocks && heroRefs.textBlocks.length > 0) {
    gsap.set(heroRefs.textBlocks, { opacity: 1 });
  }
  if (heroRefs.socials && heroRefs.socials.length > 0) {
    gsap.set(heroRefs.socials, { opacity: 1, y: 0 });
  }
  if (heroRefs.dripLines && heroRefs.dripLines.length > 0) {
    gsap.set(heroRefs.dripLines, { scaleY: 1 });
  }
  if (heroRefs.frame) {
    gsap.set(heroRefs.frame, { borderColor: 'var(--line)' });
    heroRefs.frame.classList.add('intro-complete');
  }
  if (heroRefs.signature) {
    gsap.set(heroRefs.signature, { clipPath: 'inset(0 0% 0 0)' });
  }
  if (heroRefs.scrollLabel) {
    gsap.set(heroRefs.scrollLabel, { opacity: 1 });
  }
}

/**
 * Build the sub-timeline for Preloader.
 */
function createPreloaderSubTimeline(preloader) {
  const tl = gsap.timeline();
  const counterObj = { value: 0 };

  // Signature "Zandik" write-on (clip-path left-to-right)
  const sigEl = preloader.signature || (preloader.chars && preloader.chars[0]);
  if (sigEl) {
    tl.fromTo(
      sigEl,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power2.inOut' },
      0
    );
  } else if (preloader.chars && preloader.chars.length > 0) {
    tl.fromTo(
      preloader.chars,
      { y: 0, yPercent: 110 },
      { y: 0, yPercent: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
      0
    );
  }

  // Counter 000 -> 100 in 1.4s (power2.inOut)
  if (preloader.counterEl) {
    tl.to(
      counterObj,
      {
        value: 100,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate: () => {
          preloader.counterEl.textContent = String(Math.floor(counterObj.value)).padStart(3, '0');
        },
      },
      0
    );
  }

  // Progress fill grows 0 -> 1 in 1.4s
  if (preloader.progressBar) {
    tl.fromTo(
      preloader.progressBar,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.4, ease: 'power2.inOut', transformOrigin: 'left' },
      0
    );
  }

  // Hold at 100 for 0.3s (1.4s -> 1.7s)
  // Fade out preloader content over 0.3s (1.7s -> 2.0s)
  if (preloader.inner) {
    tl.to(
      preloader.inner,
      { opacity: 0, duration: 0.3, ease: 'power1.inOut' },
      1.7
    );
  }

  return tl;
}

/**
 * Build the sub-timeline for 5-column Block Wipe.
 */
function createWipeSubTimeline(wipe) {
  const tl = gsap.timeline();

  if (wipe.cols && wipe.cols.length > 0) {
    // Tahap 1: 5 kolom naik dari bawah (yPercent 100 -> 0) menutup layar
    // Stagger 0.07s left to right, durasi 0.5s, power3.inOut
    tl.fromTo(
      wipe.cols,
      { y: 0, yPercent: 100 },
      {
        y: 0,
        yPercent: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power3.inOut',
      },
      0
    );

    // Tahap 2 (baru): Kolom keluar ke atas (yPercent 0 -> -100) membuka hero gelap
    // Stagger 0.07s left to right, durasi 0.5s, power3.inOut
    // Mulai saat kolom terakhir menutup layar (0.8s)
    tl.to(
      wipe.cols,
      {
        y: 0,
        yPercent: -100,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power3.inOut',
      },
      0.8
    );
  }

  return tl;
}

/**
 * Build the sub-timeline for Hero Intro.
 */
function createHeroIntroSubTimeline(hero) {
  const tl = gsap.timeline();

  // 1. Photo cutout fade-in (0.0s to 0.5s)
  if (hero.photo) {
    tl.fromTo(
      hero.photo,
      { opacity: 0, scale: 1.04 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
      0
    );
  }

  // 2. Letters I K R A M rise from mask one by one (stagger 0.09s, starts at 0.10s)
  if (hero.nameChars && hero.nameChars.length > 0) {
    tl.fromTo(
      hero.nameChars,
      { y: 0, yPercent: 110 },
      { y: 0, yPercent: 0, duration: 0.5, stagger: 0.09, ease: 'power3.out' },
      0.1
    );
  }

  // 3. Top baris kecil "Muhammad" appear left to right (stagger 0.05s, starts at 0.35s)
  const topChars = (hero.topLabelChars && hero.topLabelChars.length > 0)
    ? hero.topLabelChars
    : hero.jpChars;
  if (topChars && topChars.length > 0) {
    tl.fromTo(
      topChars,
      { y: 0, yPercent: 110 },
      { y: 0, yPercent: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' },
      0.35
    );
  }

  // 4. Small text blocks fade opacity 0->1 (starts at 0.60s)
  if (hero.textBlocks && hero.textBlocks.length > 0) {
    tl.fromTo(
      hero.textBlocks,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
      0.6
    );
  }

  // 4b. Social icon row (fade + y, stagger 0.06, starts at 0.60s)
  if (hero.socials && hero.socials.length > 0) {
    tl.fromTo(
      hero.socials,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
      0.6
    );
  }

  // 5. Border frame + drip lines grow downward (starts at 0.90s)
  if (hero.dripLines && hero.dripLines.length > 0) {
    tl.fromTo(
      hero.dripLines,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
        transformOrigin: 'top',
      },
      0.9
    );
  }

  if (hero.frame) {
    tl.fromTo(
      hero.frame,
      { borderColor: 'transparent' },
      { borderColor: 'var(--line)', duration: 0.4, ease: 'power2.out' },
      0.9
    );
  }

  // 6. Signature "Muslimin" written left to right with clip-path (duration 0.9s, starts at 1.30s)
  if (hero.signature) {
    tl.fromTo(
      hero.signature,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power2.inOut' },
      1.3
    );
  }

  // 7. Vertical text SCROLL (starts at 2.00s)
  if (hero.scrollLabel) {
    tl.fromTo(
      hero.scrollLabel,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' },
      2.0
    );
  }

  return tl;
}

/**
 * Create Master Timeline in GSAP.
 * Timeline t=0 is 0.4s in video time.
 */
export function createMasterIntroTimeline(elements, options = {}) {
  const { preloader, wipe, hero } = elements;

  const masterTl = gsap.timeline({
    onComplete: () => {
      // Re-enable Lenis scroll
      window.__lenis?.start();

      // Hide overlay elements
      if (preloader?.container) {
        preloader.container.style.display = 'none';
      }
      if (wipe?.container) {
        wipe.container.style.display = 'none';
      }
      if (wipe?.cols) {
        wipe.cols.forEach((col) => {
          col.style.display = 'none';
        });
      }

      // Reset z-index on hero frame to auto via clearProps so it behaves normally during scroll
      if (hero?.frame) {
        gsap.set(hero.frame, { clearProps: 'zIndex' });
        hero.frame.style.zIndex = 'auto';
        hero.frame.classList.add('intro-complete');
      }

      // Keep body background transparent
      document.body.style.backgroundColor = 'transparent';

      if (options.onComplete) {
        options.onComplete();
      }
    },
  });

  window.__introTimeline = masterTl;

  const preloaderTl = createPreloaderSubTimeline(preloader);
  const wipeTl = createWipeSubTimeline(wipe);
  const heroIntroTl = createHeroIntroSubTimeline(hero);

  // Calibrated labels:
  // Video time = Master Timeline time + 0.4s
  masterTl.addLabel('preloader-start', 0.1);
  masterTl.add(preloaderTl, 'preloader-start');

  // Block wipe starts at 2.37s (video 2.77s)
  masterTl.addLabel('wipe-start', 2.37);
  masterTl.add(wipeTl, 'wipe-start');

  // Hero intro starts at 3.27s (approx 0.1s after wipe phase 2 starts at 3.17s)
  masterTl.add(() => {
    window.dispatchEvent(new CustomEvent('intro:reveal'));
  }, 3.17);

  masterTl.addLabel('hero-start', 3.27);
  masterTl.add(heroIntroTl, 'hero-start');

  masterTl.addLabel('intro-complete', 5.5);

  return masterTl;
}

/**
 * Main entry point: checks query params (?slow, ?skip),
 * explicitly resets CSS translateY states to prevent px interpretation,
 * locks scroll, and returns the master timeline synchronously.
 */
export function initMasterIntro(elements, options = {}) {
  const params = new URLSearchParams(window.location.search);
  const isSlow = params.has('slow');
  const isSkip = params.has('skip');

  // Lock scroll during intro
  window.__lenis?.stop();

  // Skip option
  if (isSkip) {
    window.dispatchEvent(new CustomEvent('intro:reveal', { detail: { immediate: true } }));
    revealHeroImmediately(elements.hero);
    if (elements.preloader?.container) {
      elements.preloader.container.style.display = 'none';
    }
    if (elements.wipe?.container) {
      elements.wipe.container.style.display = 'none';
    }
    if (elements.wipe?.cols) {
      elements.wipe.cols.forEach((col) => {
        col.style.display = 'none';
      });
    }
    if (elements.hero?.frame) {
      gsap.set(elements.hero.frame, { clearProps: 'zIndex' });
      elements.hero.frame.style.zIndex = 'auto';
    }
    document.body.style.backgroundColor = 'transparent';
    window.__lenis?.start();
    if (options.onComplete) {
      options.onComplete();
    }
    return null;
  }

  // Explicitly reset initial transforms and states before timeline:
  const sigEl = elements.preloader?.signature || (elements.preloader?.chars && elements.preloader.chars[0]);
  if (sigEl) {
    gsap.set(sigEl, { clipPath: 'inset(0 100% 0 0)' });
  }
  if (elements.preloader?.chars && elements.preloader.chars.length > 0) {
    gsap.set(elements.preloader.chars, { y: 0, yPercent: 110 });
  }
  if (elements.wipe?.cols && elements.wipe.cols.length > 0) {
    gsap.set(elements.wipe.cols, { y: 0, yPercent: 100 });
  }
  if (elements.hero?.nameChars && elements.hero.nameChars.length > 0) {
    gsap.set(elements.hero.nameChars, { y: 0, yPercent: 110 });
  }
  const topChars = (elements.hero?.topLabelChars && elements.hero.topLabelChars.length > 0)
    ? elements.hero.topLabelChars
    : elements.hero?.jpChars;
  if (topChars && topChars.length > 0) {
    gsap.set(topChars, { y: 0, yPercent: 110 });
  }
  if (elements.hero?.textBlocks && elements.hero.textBlocks.length > 0) {
    gsap.set(elements.hero.textBlocks, { opacity: 0 });
  }
  if (elements.hero?.frame) {
    gsap.set(elements.hero.frame, { zIndex: 30 });
  }

  const masterTl = createMasterIntroTimeline(elements, options);

  if (isSlow) {
    masterTl.timeScale(0.25);
  }

  return masterTl;
}
