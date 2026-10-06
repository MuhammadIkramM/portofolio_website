import { useState, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from '@/lib/gsap';
import { useLenis } from '@/hooks/useLenis';
import { Navbar } from '@/components/layout/Navbar';
import { Preloader } from '@/components/layout/Preloader';
import { BackgroundLayer } from '@/components/layout/BackgroundLayer';
import { Hero } from '@/components/sections/Hero/Hero';
import { Marquee } from '@/components/sections/Marquee/Marquee';
import { Profile } from '@/components/sections/Profile/Profile';
import { Experience } from '@/components/sections/Experience/Experience';
import { Projects } from '@/components/sections/Projects/Projects';
import { TechStack } from '@/components/sections/TechStack/TechStack';
import { Contact } from '@/components/sections/Contact/Contact';
import { initMasterIntro } from '@/animations/intro';

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  useLenis();

  useEffect(() => {
    // Lock page scroll during intro
    window.__lenis?.stop();
    document.body.style.overflow = 'hidden';

    // Collect DOM elements for master intro
    const preloaderOverlay = document.querySelector('[data-preloader-overlay]');
    const preloaderDark = document.querySelector('[data-preloader-dark]');
    const preloaderInner = document.querySelector('[data-preloader-inner]');
    const preloaderSignature = document.querySelector('[data-preloader-signature]');
    const preloaderChars = Array.from(document.querySelectorAll('[data-preloader-char] > span'));
    const preloaderCounter = document.querySelector('[data-preloader-counter]');
    const preloaderProgress = document.querySelector('[data-preloader-progress]');

    const wipeContainer = document.querySelector('[data-wipe-container]');
    const wipeCols = Array.from(document.querySelectorAll('[data-wipe-col]'));

    const heroPhoto = document.querySelector('[data-hero-photo]');
    const heroNameChars = Array.from(document.querySelectorAll('[data-hero-name-char] > span'));
    const heroTopChars = Array.from(document.querySelectorAll('[data-hero-top-char] > span, [data-hero-jp-char] > span'));
    const heroTextBlocks = Array.from(document.querySelectorAll('[data-hero-text]'));
    const heroSocials = Array.from(document.querySelectorAll('[data-hero-social]'));
    const heroDripLines = Array.from(document.querySelectorAll('[data-hero-drip]'));
    const heroFrame = document.querySelector('[data-hero-frame]');
    const heroSignature = document.querySelector('[data-hero-signature]');
    const heroScroll = document.querySelector('[data-hero-scroll]');

    const elements = {
      preloader: {
        overlay: preloaderOverlay,
        container: preloaderDark,
        inner: preloaderInner,
        signature: preloaderSignature,
        chars: preloaderChars,
        counterEl: preloaderCounter,
        progressBar: preloaderProgress,
      },
      wipe: {
        container: wipeContainer,
        cols: wipeCols,
      },
      hero: {
        photo: heroPhoto,
        nameChars: heroNameChars,
        topLabelChars: heroTopChars,
        jpChars: heroTopChars,
        textBlocks: heroTextBlocks,
        socials: heroSocials,
        dripLines: heroDripLines,
        frame: heroFrame,
        signature: heroSignature,
        scrollLabel: heroScroll,
      },
    };

    // Wrap in gsap.context for React StrictMode safety
    const ctx = gsap.context(() => {
      initMasterIntro(elements, {
        onComplete: () => {
          document.body.style.overflow = '';
          window.__lenis?.start();
          setIntroDone(true);
        },
      });
    });

    // Debounced ScrollTrigger.refresh on resize / orientation change
    let rafId;
    const refreshST = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    window.addEventListener('resize', refreshST, { passive: true });
    window.addEventListener('orientationchange', refreshST, { passive: true });

    return () => {
      document.body.style.overflow = '';
      window.__lenis?.start();
      ctx.revert();
      window.removeEventListener('resize', refreshST);
      window.removeEventListener('orientationchange', refreshST);
    };
  }, []);

  return (
    <>
      <BackgroundLayer />
      {!introDone && <Preloader />}
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Profile />
        <Experience />
        <Projects />
        <TechStack />
        <Contact />
      </main>
    </>
  );
}
