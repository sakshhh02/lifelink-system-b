import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Circle,
  FolderOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircle2,
  info: Info,
  muted: Circle,
};

const iconColors = {
  warning: 'text-warning',
  success: 'text-success',
  info: 'text-primary',
  muted: 'text-muted',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { documents, shares, activityFeed } = useApp();

  const pendingCount = documents.filter(
    (d) =>
      d.verificationStatus === 'Pending' ||
      d.verificationStatus === 'Unverified'
  ).length;

  const activeShares = shares.filter((s) => s.status === 'Active').length;

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div className="space-y-6 xl:col-span-2">
        {documents.length === 0 ? (
          <EmptyState
            icon={<FolderOpen />}
            title="No records uploaded yet."
            description="Upload a document to begin storage and verification."
            ctaLabel="Upload Document"
            onCta={() => navigate('/vault')}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card>
                <p className="text-sm text-muted">Stored Documents</p>
                <p className="mt-2 text-3xl font-semibold text-text">
                  {documents.length}
                </p>
                <p className="mt-1 text-sm text-muted">+2 this month</p>
              </Card>
              <Card>
                <p className="text-sm text-muted">Pending Verification</p>
                <p className="mt-2 text-3xl font-semibold text-text">
                  {pendingCount}
                </p>
                <p
                  className={`mt-1 text-sm font-medium ${
                    pendingCount > 0 ? 'text-warning' : 'text-success'
                  }`}
                >
                  {pendingCount > 0 ? 'Requires Action' : 'All up to date'}
                </p>
              </Card>
              <Card>
                <p className="text-sm text-muted">Shared Records</p>
                <p className="mt-2 text-3xl font-semibold text-text">
                  {activeShares}
                </p>
                <p className="mt-1 text-sm text-muted">Active shares</p>
              </Card>
            </div>

            <div>
              <h3 className="mb-4 text-base font-semibold text-text">
                Activity Feed
              </h3>
              <div className="space-y-4">
                {activityFeed.map((item) => {
                  const Icon = iconMap[item.icon] || Info;
                  return (
                    <Card key={item.id} className="flex gap-4 !p-5">
                      <Icon
                        className={`mt-0.5 h-5 w-5 shrink-0 ${iconColors[item.icon]}`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-text">{item.title}</p>
                        <p className="mt-1 text-sm text-muted">
                          {item.description}
                        </p>
                        <div className="mt-3 flex items-center justify-between gap-4">
                          {item.action && item.actionRoute && (
                            <button
                              type="button"
                              onClick={() => navigate(item.actionRoute)}
                              className="rounded-xl border border-primary px-4 py-1.5 text-sm font-medium text-primary transition duration-200 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                              {item.action}
                            </button>
                          )}
                          <span className="ml-auto text-xs text-muted">
                            {item.timestamp}
                          </span>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      <Card className="h-fit">
        <h3 className="mb-4 text-base font-semibold text-text">Quick Actions</h3>
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => navigate('/vault')}
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-left text-sm font-medium text-text transition duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Upload Document
          </button>
          <button
            type="button"
            onClick={() => navigate('/verify')}
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-left text-sm font-medium text-text transition duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Verify Existing
          </button>
          <button
            type="button"
            onClick={() => navigate('/share')}
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-left text-sm font-medium text-text transition duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Share Document
          </button>
        </div>
      </Card>
    </div>
  );
}
