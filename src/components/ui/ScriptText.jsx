export function ScriptText({ children, className = '' }) {
  return (
    <span className={className} style={{ fontFamily: 'var(--script)', fontWeight: 400 }}>
      {children}
    </span>
  );
}
