import { Reveal } from '@/components/ui/Reveal';
import styles from './SectionHeader.module.css';

export function SectionHeader({ kicker, title, accent, subtitle }) {
  return (
    <div className={styles.head}>
      <div>
        <div className="section-kicker">
          {kicker}
        </div>
        <Reveal>
          <h2 className={styles.heading}>
            {title} <i className={styles.headingAccent}>{accent}</i>
          </h2>
        </Reveal>
      </div>
      {subtitle && (
        <Reveal>
          <p className={styles.subtitle}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
