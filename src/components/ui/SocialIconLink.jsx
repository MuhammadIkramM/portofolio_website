import { InstagramIcon } from '@/components/ui/icons/InstagramIcon';
import { LinkedInIcon } from '@/components/ui/icons/LinkedInIcon';
import { GitHubIcon } from '@/components/ui/icons/GitHubIcon';
import { MailIcon } from '@/components/ui/icons/MailIcon';
import styles from './SocialIconLink.module.css';

const ICON_MAP = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  email: MailIcon,
};

export function SocialIconLink({ social, className = '', ...props }) {
  const IconComponent = ICON_MAP[social.id];
  if (!IconComponent) return null;

  const externalProps = social.external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      href={social.href}
      aria-label={social.ariaLabel || social.label}
      className={`${styles.iconLink} ${className}`}
      {...externalProps}
      {...props}
    >
      <IconComponent size={20} />
    </a>
  );
}
