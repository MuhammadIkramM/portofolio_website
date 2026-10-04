import { useEffect, useRef, useCallback } from 'react';
import { gsap } from '@/lib/gsap';

export function useCursor() {
  const cursorRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const quickX = useRef(null);
  const quickY = useRef(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    quickX.current = gsap.quickTo(el, 'x', { duration: 0.15, ease: 'power2.out' });
    quickY.current = gsap.quickTo(el, 'y', { duration: 0.15, ease: 'power2.out' });

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      quickX.current(e.clientX);
      quickY.current(e.clientY);
    };

    const onMouseOver = (e) => {
      if (e.target.closest('[data-cursor], a, button, [role="button"]')) {
        gsap.to(el, { scale: 5, duration: 0.25, ease: 'power2.out' });
      }
    };
    const onMouseOut = (e) => {
      if (e.target.closest('[data-cursor], a, button, [role="button"]')) {
        gsap.to(el, { scale: 1, duration: 0.25, ease: 'power2.out' });
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return cursorRef;
}
