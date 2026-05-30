import { lifecycleStages } from '../data/mockData';

export function generateReferenceNumber() {
  const part1 = Math.floor(1000 + Math.random() * 9000);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const part2 =
    chars[Math.floor(Math.random() * 26)] +
    chars[Math.floor(Math.random() * 26)];
  return `LL-${part1}-${part2}`;
}

export function formatTodayDate() {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatFileSize(bytes) {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getLifecycleIndex(stage) {
  const idx = lifecycleStages.findIndex((s) => s.key === stage);
  return idx >= 0 ? idx : 0;
}

export function getCompletedAndCurrentStages(lifecycleStage) {
  const currentIndex = getLifecycleIndex(lifecycleStage);
  const isFinal = currentIndex >= lifecycleStages.length - 1;
  return lifecycleStages.map((stage, index) => {
    if (index <= currentIndex) return 'complete';
    if (!isFinal && index === currentIndex + 1) return 'current';
    return 'pending';
  });
}

export function getCategoryContext(category) {
  const contexts = {
    Academic:
      'Verification confirms this credential was issued by a recognized institution and has not been modified.',
    Identity:
      'Identity documents confirm your legal records are accurate and tamper-free.',
    Professional:
      'Professional credentials confirm employment and qualification records are authentic.',
    Medical:
      'Medical records confirm clinical documents originate from verified healthcare providers.',
    Legal:
      'Legal documents confirm authenticity and institutional validity of recorded agreements.',
  };
  return contexts[category] || contexts.Professional;
}

export function calculateExpiryDate(durationLabel) {
  const now = new Date();
  const map = {
    '24 Hours': 1,
    '48 Hours': 2,
    '7 Days': 7,
    '30 Days': 30,
  };
  const days = map[durationLabel] ?? 1;
  if (durationLabel.includes('Hour')) {
    now.setHours(now.getHours() + days);
  } else {
    now.setDate(now.getDate() + days);
  }
  return now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getPageTitle(pathname) {
  if (pathname === '/verify/failed') return 'Verification Failed';
  if (pathname.startsWith('/verify/result')) return 'Verification Result';
  const titles = {
    '/dashboard': 'Dashboard',
    '/vault': 'Document Vault',
    '/verify': 'Verify Document',
    '/share': 'Share Records',
    '/profile': 'Profile',
  };
  return titles[pathname] || 'LifeLink';
}
