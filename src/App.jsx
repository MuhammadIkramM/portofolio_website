import { useState, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { useLenis } from '@/hooks/useLenis';
import { useCursor } from '@/hooks/useCursor';
import { Navbar } from '@/components/layout/Navbar';
import { Cursor } from '@/components/layout/Cursor';
import { Preloader } from '@/components/layout/Preloader';
import { Hero } from '@/components/sections/Hero/Hero';
import { Marquee } from '@/components/sections/Marquee/Marquee';
import { About } from '@/components/sections/About/About';
import { Stage } from '@/components/sections/Stage/Stage';
import { Quote } from '@/components/sections/Quote/Quote';
import { Gallery } from '@/components/sections/Gallery/Gallery';
import { Contact } from '@/components/sections/Contact/Contact';
import { initMasterIntro } from '@/animations/intro';

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  useLenis();
  const cursorRef = useCursor();

  useEffect(() => {
    // Lock page scroll during intro
    window.__lenis?.stop();
    document.body.style.overflow = 'hidden';

    // Collect DOM elements for master intro
    const preloaderDark = document.querySelector('[data-preloader-dark]');
    const preloaderInner = document.querySelector('[data-preloader-inner]');
    const preloaderChars = Array.from(document.querySelectorAll('[data-preloader-char] > span'));
    const preloaderCounter = document.querySelector('[data-preloader-counter]');
    const preloaderProgress = document.querySelector('[data-preloader-progress]');

    const wipeContainer = document.querySelector('[data-wipe-container]');
    const wipeCols = Array.from(document.querySelectorAll('[data-wipe-col]'));

    const heroPhoto = document.querySelector('[data-hero-photo]');
    const heroNameChars = Array.from(document.querySelectorAll('[data-hero-name-char] > span'));
    const heroJpChars = Array.from(document.querySelectorAll('[data-hero-jp-char] > span'));
    const heroTextBlocks = Array.from(document.querySelectorAll('[data-hero-text]'));
    const heroDripLines = Array.from(document.querySelectorAll('[data-hero-drip]'));
    const heroFrame = document.querySelector('[data-hero-frame]');
    const heroSignature = document.querySelector('[data-hero-signature]');
    const heroScroll = document.querySelector('[data-hero-scroll]');

    const elements = {
      preloader: {
        container: preloaderDark,
        inner: preloaderInner,
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
        jpChars: heroJpChars,
        textBlocks: heroTextBlocks,
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

    return () => {
      document.body.style.overflow = '';
      window.__lenis?.start();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <Preloader />
      <Cursor ref={cursorRef} />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Stage />
        <Quote />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}
