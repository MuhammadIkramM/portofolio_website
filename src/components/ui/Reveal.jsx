import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.fromTo(ref.current, {
      y: 40,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 82%',
        once: true,
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform, opacity' }}>
      {children}
    </div>
  );
}
