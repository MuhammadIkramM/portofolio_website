import { PROFILE } from '@/data/profile';

export function Signature({ className = '', style = {} }) {
  if (PROFILE.signatureImage) {
    return (
      <img
        src={PROFILE.signatureImage}
        alt={PROFILE.name}
        className={className}
        style={{ display: 'inline-block', height: '1em', ...style }}
      />
    );
  }

  return (
    <span
      className={className}
      style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 500,
        fontStyle: 'normal',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        ...style,
      }}
    >
      {PROFILE.name}
    </span>
  );
}
