import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export function SplitText({ text, className = '', as: Tag = 'span' }) {
  const containerRef = useRef(null);

  return (
    <Tag className={className} ref={containerRef}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="split-char"
          style={{ display: 'inline-block', overflow: 'hidden' }}
        >
          <span style={{ display: 'inline-block' }}>{char === ' ' ? '\u00A0' : char}</span>
        </span>
      ))}
    </Tag>
  );
}
