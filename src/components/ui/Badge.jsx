const variants = {
  Verified: 'bg-accent text-primary',
  Pending: 'bg-amber-50 text-amber-700',
  Unverified: 'bg-gray-100 text-gray-600',
  Failed: 'bg-red-50 text-danger',
  Archived: 'bg-gray-50 text-muted italic',
  Active: 'bg-accent text-primary',
  Expired: 'bg-gray-100 text-muted',
  Revoked: 'bg-red-50 text-danger',
};

export default function Badge({ status, className = '' }) {
  const styles = variants[status] || 'bg-gray-100 text-gray-600';
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles} ${className}`}
    >
      {status}
    </span>
  );
}
