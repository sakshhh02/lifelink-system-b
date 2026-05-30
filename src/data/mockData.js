export const documents = [
  {
    id: 'doc-001',
    name: 'PhD_Mathematics_Diploma.pdf',
    category: 'Academic',
    uploadDate: 'Oct 12, 2023',
    fileSize: '2.4 MB',
    verificationStatus: 'Verified',
    lifecycleStage: 'Shared',
    referenceNumber: 'LL-8821-XP',
    hashSignature: '0x8a2f...c91e',
    verifiedBy: 'Northern University',
    verifiedAt: 'Nov 02, 2023',
    pinned: true,
  },
  {
    id: 'doc-002',
    name: 'Passport_Scan_Main.jpg',
    category: 'Identity',
    uploadDate: 'Jan 05, 2024',
    fileSize: '1.1 MB',
    verificationStatus: 'Pending',
    lifecycleStage: 'VerificationAvailable',
    referenceNumber: 'LL-1045-BK',
    hashSignature: '0x4d1b...a022',
    verifiedBy: null,
    verifiedAt: null,
    pinned: false,
  },
  {
    id: 'doc-003',
    name: 'Employment_Contract_2022.pdf',
    category: 'Professional',
    uploadDate: 'Dec 20, 2022',
    fileSize: '890 KB',
    verificationStatus: 'Verified',
    lifecycleStage: 'Verified',
    referenceNumber: 'LL-0042-CR',
    hashSignature: '0x22f9...f44b',
    verifiedBy: 'Global Careers Institute',
    verifiedAt: 'Jan 18, 2023',
    pinned: false,
  },
  {
    id: 'doc-004',
    name: 'Medical_Certificate_2024.pdf',
    category: 'Medical',
    uploadDate: 'Mar 01, 2024',
    fileSize: '760 KB',
    verificationStatus: 'Unverified',
    lifecycleStage: 'Stored',
    referenceNumber: 'LL-3321-MZ',
    hashSignature: null,
    verifiedBy: null,
    verifiedAt: null,
    pinned: false,
  },
  {
    id: 'doc-005',
    name: 'Tax_Statement_FY2023.pdf',
    category: 'Professional',
    uploadDate: 'Feb 14, 2024',
    fileSize: '1.3 MB',
    verificationStatus: 'Archived',
    lifecycleStage: 'Stored',
    referenceNumber: 'LL-9901-TX',
    hashSignature: '0x9c31...e82d',
    verifiedBy: null,
    verifiedAt: null,
    pinned: false,
  },
];

export const activityFeed = [
  {
    id: 'act-001',
    type: 'VERIFICATION_PENDING',
    title: 'Verification Pending',
    description:
      'Passport_Scan_Main.jpg requires verification before it can be shared.',
    action: 'Verify Now',
    actionRoute: '/verify',
    timestamp: '2 hours ago',
    icon: 'warning',
  },
  {
    id: 'act-002',
    type: 'DOCUMENT_SHARED',
    title: 'Document Successfully Shared',
    description:
      'Employment_Contract_2022.pdf has been shared with employer@company.com. Access expires in 7 days.',
    action: 'Manage Access',
    actionRoute: '/share',
    timestamp: 'Yesterday at 4:30 PM',
    icon: 'success',
  },
  {
    id: 'act-003',
    type: 'VERIFICATION_COMPLETE',
    title: 'Verification Complete',
    description: 'PhD_Mathematics_Diploma.pdf has been successfully verified.',
    action: 'View Result',
    actionRoute: '/verify/result/doc-001',
    timestamp: 'Nov 02, 2023',
    icon: 'success',
  },
  {
    id: 'act-004',
    type: 'DOCUMENT_UPLOADED',
    title: 'Document Uploaded',
    description: 'Medical_Certificate_2024.pdf added to your vault.',
    action: 'View Document',
    actionRoute: '/vault',
    timestamp: 'Mar 01, 2024',
    icon: 'info',
  },
  {
    id: 'act-005',
    type: 'SHARE_EXPIRED',
    title: 'Share Link Expired',
    description:
      'Access for university@edu.com to PhD_Mathematics_Diploma.pdf has expired.',
    action: null,
    actionRoute: null,
    timestamp: 'Jan 12, 2024',
    icon: 'muted',
  },
];

export const shares = [
  {
    id: 'share-001',
    recipientEmail: 'employer@company.com',
    recipientInitials: 'EC',
    documents: ['Employment_Contract_2022.pdf'],
    accessLevel: 'View Only',
    expiresAt: 'Dec 07, 2024',
    status: 'Active',
    lastAccessed: '2 hours ago',
  },
  {
    id: 'share-002',
    recipientEmail: 'university@edu.com',
    recipientInitials: 'NU',
    documents: ['PhD_Mathematics_Diploma.pdf'],
    accessLevel: 'View Only',
    expiresAt: 'Jan 12, 2024',
    status: 'Expired',
    lastAccessed: '3 days ago',
  },
];

export const profileTimeline = [
  {
    id: 'evt-001',
    title: 'Academic Transcript uploaded',
    description: 'PhD_Mathematics_Diploma.pdf added to your secure vault.',
    timestamp: 'Oct 12, 2023 · 09:12 AM',
  },
  {
    id: 'evt-002',
    title: 'Verification completed',
    description: 'PhD_Mathematics_Diploma.pdf was successfully verified.',
    timestamp: 'Nov 02, 2023 · 02:45 PM',
  },
  {
    id: 'evt-003',
    title: 'Employer access granted',
    description: 'Employment records shared with employer@company.com.',
    timestamp: 'Nov 15, 2023 · 11:00 AM',
  },
  {
    id: 'evt-004',
    title: 'Share link expired',
    description: 'University access to PhD_Mathematics_Diploma.pdf expired.',
    timestamp: 'Jan 12, 2024 · 04:30 PM',
  },
  {
    id: 'evt-005',
    title: 'Medical certificate uploaded',
    description: 'Medical_Certificate_2024.pdf added to your secure vault.',
    timestamp: 'Mar 01, 2024 · 10:15 AM',
  },
];

export const verificationSteps = [
  {
    number: 1,
    label: 'Document Received',
    meaning:
      'Your document has been received and indexed for verification.',
  },
  {
    number: 2,
    label: 'Checking Verification Records',
    meaning:
      'Comparing your document against institutional verification records.',
  },
  {
    number: 3,
    label: 'Confirming Authenticity',
    meaning:
      "Confirming the document's authenticity matches institutional records.",
  },
  {
    number: 4,
    label: 'Verification Complete',
    meaning: 'Your document has been successfully verified.',
  },
];

export const lifecycleStages = [
  { key: 'Uploaded', label: 'Uploaded' },
  { key: 'Stored', label: 'Stored' },
  { key: 'VerificationAvailable', label: 'Verification Available' },
  { key: 'Verified', label: 'Verified' },
  { key: 'Shared', label: 'Shared' },
];

export const VAULT_CATEGORIES = [
  'All',
  'Academic',
  'Identity',
  'Professional',
  'Medical',
  'Legal',
];
