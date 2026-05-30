import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import { useToast } from '../context/ToastContext';

export default function Profile() {
  const { documents, shares, profileTimeline, revokeShare, addTimelineEvent } =
    useApp();
  const { showToast } = useToast();

  const activeShares = shares.filter((s) => s.status === 'Active').length;
  const verifiedCount = documents.filter(
    (d) => d.verificationStatus === 'Verified'
  ).length;

  const handleRevoke = (share) => {
    if (
      !window.confirm(`Revoke access for ${share.recipientEmail}?`)
    ) {
      return;
    }
    revokeShare(share.id);
    addTimelineEvent({
      title: 'Access revoked',
      description: `Access for ${share.recipientEmail} has been revoked.`,
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
    showToast('Access revoked', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <h2 className="text-base font-semibold text-text">
            Security & Access
          </h2>
          <div className="mt-6 space-y-6">
            <div>
              <p className="font-medium text-text">Authentication Enabled</p>
              <p className="mt-1 text-sm text-muted">
                Biometric and MFA are active.
              </p>
            </div>
            <div>
              <p className="font-medium text-text">Recovery Available</p>
              <p className="mt-1 text-sm text-muted">
                Backup contacts have been verified.
              </p>
            </div>
            <div>
              <p className="font-medium text-text">Digital Signature</p>
              <p className="mt-1 text-sm text-muted">
                Hardware key bound and operational.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              showToast(
                'Credential management available in full version',
                'info'
              )
            }
            className="mt-6 rounded-2xl border border-border px-4 py-2 text-sm font-medium text-text transition duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Manage Credentials
          </button>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="text-base font-semibold text-text">
            Identity Lifecycle
          </h2>
          <p className="text-xs uppercase tracking-wider text-muted">
            History Feed
          </p>
          <ul className="mt-6 space-y-0">
            {profileTimeline.map((event, index) => (
              <li key={event.id}>
                <div className="flex gap-4 py-4">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-xs text-muted">{event.timestamp}</p>
                    <p className="mt-1 font-semibold text-text">
                      {event.title}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {event.description}
                    </p>
                  </div>
                </div>
                {index < profileTimeline.length - 1 && (
                  <div className="ml-1 border-l border-border pl-4" />
                )}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() =>
              showToast('Full log available in complete version', 'info')
            }
            className="mt-2 text-sm font-medium text-primary hover:underline"
          >
            View full activity log →
          </button>
        </Card>
      </div>

      <Card>
        <h2 className="text-base font-semibold text-text">
          Active Institutional Shares
        </h2>
        <p className="mt-1 text-sm text-muted">
          Overview of entities currently accessing your records.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="pb-3 pr-4 font-medium">Institution</th>
                <th className="pb-3 pr-4 font-medium">Data Package</th>
                <th className="pb-3 pr-4 font-medium">Access Level</th>
                <th className="pb-3 pr-4 font-medium">Expiration</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {shares.map((share) => (
                <tr key={share.id} className="border-b border-border">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-semibold text-primary">
                        {share.recipientInitials}
                      </div>
                      <span className="text-text">{share.recipientEmail}</span>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-muted">
                    {share.documents.join(', ')}
                  </td>
                  <td className="py-4 pr-4 text-muted">{share.accessLevel}</td>
                  <td className="py-4 pr-4 text-muted">{share.expiresAt}</td>
                  <td className="py-4">
                    {share.status === 'Active' ? (
                      <button
                        type="button"
                        onClick={() => handleRevoke(share)}
                        className="text-sm font-medium text-danger transition duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2"
                      >
                        Revoke Access
                      </button>
                    ) : (
                      <span className="text-sm text-muted">Expired</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <Card className="text-center">
          <p className="text-2xl font-semibold text-text">{documents.length}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
            Stored Docs
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-semibold text-text">{activeShares}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
            Active Shares
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-semibold text-text">{verifiedCount}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
            Verified
          </p>
        </Card>
      </div>
    </div>
  );
}
