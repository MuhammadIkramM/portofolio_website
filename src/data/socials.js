import { EMAIL, INSTAGRAM_URL, LINKEDIN_URL, GITHUB_URL } from './socialLinks';

function clean(val) {
  return typeof val === 'string' ? val.trim() : '';
}

function buildSocials() {
  const items = [];

  // LinkedIn
  const rawLinkedIn = clean(LINKEDIN_URL);
  if (rawLinkedIn) {
    const slug = rawLinkedIn.replace(/^@/, '');
    const href = rawLinkedIn.startsWith('http')
      ? rawLinkedIn
      : `https://www.linkedin.com/in/${slug}`;
    items.push({
      id: 'linkedin',
      label: 'LinkedIn',
      ariaLabel: 'LinkedIn (opens in a new tab)',
      href,
      external: true,
    });
  }

  // GitHub
  const rawGitHub = clean(GITHUB_URL);
  if (rawGitHub) {
    const slug = rawGitHub.replace(/^@/, '');
    const href = rawGitHub.startsWith('http')
      ? rawGitHub
      : `https://github.com/${slug}`;
    items.push({
      id: 'github',
      label: 'GitHub',
      ariaLabel: 'GitHub (opens in a new tab)',
      href,
      external: true,
    });
  }

  // Instagram
  const rawInstagram = clean(INSTAGRAM_URL);
  if (rawInstagram) {
    const slug = rawInstagram.replace(/^@/, '');
    const href = rawInstagram.startsWith('http')
      ? rawInstagram
      : `https://www.instagram.com/${slug}/`;
    items.push({
      id: 'instagram',
      label: 'Instagram',
      ariaLabel: 'Instagram (opens in a new tab)',
      href,
      external: true,
    });
  }

  // Email
  const rawEmail = clean(EMAIL);
  if (rawEmail) {
    const address = rawEmail.replace(/^mailto:/i, '').trim();
    if (address) {
      items.push({
        id: 'email',
        label: 'Email',
        ariaLabel: 'Email',
        href: `mailto:${address}`,
        external: false,
      });
    }
  }

  return items;
}

export const SOCIALS = buildSocials();
