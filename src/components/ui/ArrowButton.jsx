import styles from './ArrowButton.module.css';

export function ArrowButton({ filled = false, direction = 'right', onClick, className = '' }) {
  const arrows = {
    right: '→',
    up: '↑',
    external: '↗',
  };

  return (
    <button
      className={`${styles.btn} ${filled ? styles.filled : ''} ${className}`}
      onClick={onClick}
      aria-label={`Arrow ${direction}`}
    >
      {arrows[direction] || '→'}
    </button>
  );
}
