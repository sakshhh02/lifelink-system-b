import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { calculateExpiryDate } from '../utils/helpers';

const STEPS = [
  'Recipient',
  'Duration',
  'Documents',
  'Preview',
  'Grant Access',
];

const DURATIONS = ['24 Hours', '48 Hours', '7 Days', '30 Days'];

function getInitials(email) {
  const part = email.split('@')[0] || '';
  return part.slice(0, 2).toUpperCase() || '??';
}

export default function Share() {
  const navigate = useNavigate();
  const { documents, addShare } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [accessDuration, setAccessDuration] = useState('24 Hours');
  const [selectedDocIds, setSelectedDocIds] = useState([]);
  const [shareComplete, setShareComplete] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');

  const selectedDocs = documents.filter((d) => selectedDocIds.includes(d.id));
  const restrictedDocs = documents.filter((d) => !selectedDocIds.includes(d.id));

  const toggleDoc = (doc) => {
    if (doc.verificationStatus !== 'Verified') return;
    setSelectedDocIds((prev) =>
      prev.includes(doc.id)
        ? prev.filter((id) => id !== doc.id)
        : [...prev, doc.id]
    );
  };

  const handleAuthorize = () => {
    const expires = calculateExpiryDate(accessDuration);
    setExpiryDate(expires);
    addShare({
      recipientEmail,
      recipientInitials: getInitials(recipientEmail),
      documentNames: selectedDocs.map((d) => d.name),
      accessLevel: 'View Only',
      expiresAt: expires,
    });
    setShareComplete(true);
  };

  if (shareComplete) {
    return (
      <Card className="mx-auto max-w-lg text-center animate-fade-in">
        <h2 className="text-2xl font-semibold text-text">Access Granted</h2>
        <p className="mt-4 text-sm text-muted">
          {recipientEmail} can now access {selectedDocs.length} selected
          records.
        </p>
        <p className="mt-2 text-sm text-muted">Access expires {expiryDate}.</p>
        <p className="mt-2 text-sm text-muted">
          Manage anytime from your profile.
        </p>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="mt-8 rounded-2xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Return to Dashboard
        </button>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between gap-2 border-b border-border pb-4">
        {STEPS.map((label, index) => {
          const stepNum = index + 1;
          const isActive = currentStep === stepNum;
          const isComplete = currentStep > stepNum;
          return (
            <div key={label} className="flex flex-1 flex-col items-center">
              <div className="flex items-center gap-1">
                {isComplete ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <span
                    className={`text-xs font-medium ${
                      isActive ? 'text-primary' : 'text-muted'
                    }`}
                  >
                    {stepNum}
                  </span>
                )}
                <span
                  className={`hidden text-xs sm:inline ${
                    isActive
                      ? 'font-semibold text-primary underline decoration-primary decoration-2 underline-offset-4'
                      : 'text-muted'
                  }`}
                >
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <Card className="animate-slide-left" key={currentStep}>
        {currentStep === 1 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-text">
              Recipient Email
            </label>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="Enter recipient email"
              className="w-full rounded-2xl border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            />
            <button
              type="button"
              disabled={!recipientEmail.trim()}
              onClick={() => setCurrentStep(2)}
              className="rounded-2xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Next
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-text">
              Access Duration
            </label>
            <select
              value={accessDuration}
              onChange={(e) => setAccessDuration(e.target.value)}
              className="w-full rounded-2xl border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {DURATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="rounded-2xl border border-border px-6 py-2.5 text-sm font-medium text-text hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="rounded-2xl bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-text">Choose Documents</p>
            <ul className="divide-y divide-border rounded-2xl border border-border">
              {documents.map((doc) => {
                const verified = doc.verificationStatus === 'Verified';
                return (
                  <li
                    key={doc.id}
                    className={`flex items-center gap-4 px-4 py-3 ${
                      !verified ? 'opacity-50' : ''
                    }`}
                    title={
                      !verified
                        ? 'Verify this document first before sharing.'
                        : undefined
                    }
                  >
                    <input
                      type="checkbox"
                      disabled={!verified}
                      checked={selectedDocIds.includes(doc.id)}
                      onChange={() => toggleDoc(doc)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="flex-1 text-sm font-medium text-text">
                      {doc.name}
                    </span>
                    <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                      {doc.category}
                    </span>
                    <Badge status={doc.verificationStatus} />
                  </li>
                );
              })}
            </ul>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="rounded-2xl border border-border px-6 py-2.5 text-sm font-medium"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="rounded-2xl bg-primary px-6 py-2.5 text-sm font-medium text-white"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-l-4 !border-l-success !p-4">
                <h4 className="text-sm font-semibold text-text">
                  ✓ Visible to Recipient
                </h4>
                <p className="text-xs text-muted">
                  {selectedDocs.length} Records Selected
                </p>
                <ul className="mt-3 space-y-2">
                  {selectedDocs.map((d) => (
                    <li key={d.id} className="text-sm">
                      <span className="font-medium">{d.name}</span>
                      <span className="text-muted"> · {d.category}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="border-l-4 !border-l-border !p-4">
                <h4 className="flex items-center gap-1 text-sm font-semibold text-text">
                  <Lock className="h-4 w-4" /> Hidden / No Access
                </h4>
                <p className="text-xs text-muted">
                  {restrictedDocs.length} Items Restricted
                </p>
                <ul className="mt-3 space-y-2">
                  {restrictedDocs.map((d) => (
                    <li key={d.id} className="text-sm text-muted">
                      {d.name} · Restricted
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
            <p className="text-sm text-muted">
              Only selected records become accessible. Access expires in{' '}
              {accessDuration}.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="rounded-2xl border border-border px-6 py-2.5 text-sm"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="rounded-2xl bg-primary px-6 py-2.5 text-sm font-medium text-white"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-4">
            <Card className="!bg-background">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Recipient</dt>
                  <dd className="font-medium">{recipientEmail}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Documents</dt>
                  <dd className="font-medium">{selectedDocs.length} records</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Expires</dt>
                  <dd className="font-medium">
                    {calculateExpiryDate(accessDuration)}
                  </dd>
                </div>
              </dl>
            </Card>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAuthorize}
                className="rounded-2xl bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
              >
                Authorize Access
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="rounded-2xl border border-border px-6 py-2.5 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
