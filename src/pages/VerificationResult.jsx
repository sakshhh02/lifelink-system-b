import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { documents as mockDocuments } from '../data/mockData';
import Card from '../components/ui/Card';
import Accordion from '../components/ui/Accordion';
import { useToast } from '../context/ToastContext';
import { formatTodayDate } from '../utils/helpers';

export default function VerificationResult() {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { lastVerifiedDocument } = useApp();

  let document = null;
  if (documentId === 'new') {
    document = lastVerifiedDocument;
  } else {
    document = mockDocuments.find((d) => d.id === documentId);
  }

  if (!document) {
    document = mockDocuments[0];
  }

  const handleDownload = () => {
    showToast('Receipt downloaded', 'success');
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in">
      <Card>
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 className="h-6 w-6 text-primary" strokeWidth={2} />
          <h1 className="mt-4 text-2xl font-semibold text-text">
            Verification Complete
          </h1>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            What this means
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text">
            This document matches institutional verification records. No
            modifications were detected.
          </p>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Verification Evidence
          </p>
          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-muted">Verified By</dt>
              <dd className="mt-1 text-sm font-medium text-text">
                {document.verifiedBy || 'Verification Authority'}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Verification Date</dt>
              <dd className="mt-1 text-sm font-medium text-text">
                {document.verifiedAt || formatTodayDate()}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Reference Number</dt>
              <dd className="mt-1 font-mono text-sm font-medium text-text">
                {document.referenceNumber}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-8">
          <button
            type="button"
            onClick={handleDownload}
            className="rounded-2xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Download Receipt
          </button>
          <button
            type="button"
            onClick={() => navigate('/vault')}
            className="rounded-2xl border border-border px-6 py-2.5 text-sm font-medium text-text transition duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Return to Vault
          </button>
        </div>
      </Card>

      <Accordion label="Technical Details">
        <p>Hash Signature: {document.hashSignature || '—'}</p>
        <p>Network: Global Ledger</p>
        <p>Node Reference: LL-NODE-B04</p>
        <p>Timestamp: {new Date().toISOString()}</p>
      </Accordion>
    </div>
  );
}
