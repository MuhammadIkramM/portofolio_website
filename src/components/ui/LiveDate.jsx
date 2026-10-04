import { useState, useEffect, useRef } from 'react';
import { PROFILE } from '@/data/profile';

function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  const prefix = PROFILE.city ? `${PROFILE.city},` : '';
  return `${prefix}${dd}-${mm}-${yyyy}`;
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
        fontFamily: 'var(--script)',
        fontWeight: 400,
        ...style,
      }}
    >
      {display}
    </span>
  );
}
