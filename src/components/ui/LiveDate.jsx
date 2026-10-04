import { useState, useEffect, useRef } from 'react';
import { PROFILE } from '@/data/profile';

const dtf = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

function formatDate(date) {
  const formatted = dtf.format(date);
  const prefix = PROFILE.city ? `${PROFILE.city}, ` : '';
  return `${prefix}${formatted}`;
}

export function LiveDate({ className = '', style = {} }) {
  const [display, setDisplay] = useState(() => formatDate(new Date()));
  const lastDateRef = useRef(display);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = formatDate(new Date());
      if (now !== lastDateRef.current) {
        lastDateRef.current = now;
        setDisplay(now);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={className}
      style={{
        fontFamily: 'var(--font-sans)',
        fontVariantNumeric: 'tabular-nums',
        fontWeight: 400,
        fontStyle: 'normal',
        ...style,
      }}
    >
      {display}
    </span>
  );
}
