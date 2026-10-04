import { PROFILE } from '@/data/profile';

export function Signature({ className = '', style = {} }) {
  if (PROFILE.signatureImage) {
    return (
      <img
        src={PROFILE.signatureImage}
        alt={PROFILE.alias}
        className={className}
        style={{ display: 'inline-block', height: '1em', ...style }}
      />
    );
  }

  return (
    <span
      className={className}
      style={{
        fontFamily: 'var(--signature)',
        fontWeight: 400,
        fontStyle: 'normal',
        ...style,
      }}
    >
      {PROFILE.alias}
    </span>
  );
}
