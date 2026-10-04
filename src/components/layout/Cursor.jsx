import { forwardRef } from 'react';
import styles from './Cursor.module.css';

export const Cursor = forwardRef(function Cursor(_, ref) {
  return <div ref={ref} className={styles.cursor} />;
});
