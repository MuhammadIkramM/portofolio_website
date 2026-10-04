import { useEffect, useState, useRef } from 'react';
import { ScrollTrigger } from '@/lib/gsap';

export function useScrollSpy(sectionIds) {
  const [active, setActive] = useState('');
  const triggersRef = useRef([]);

  useEffect(() => {
    triggersRef.current = sectionIds.map((id) => {
      return ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) setActive(id);
        },
      });
    });

    return () => {
      triggersRef.current.forEach((t) => t.kill());
    };
  }, [sectionIds]);

  return active;
}
