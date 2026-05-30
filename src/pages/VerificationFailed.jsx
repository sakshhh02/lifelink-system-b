import { useNavigate } from 'react-router-dom';
import {
  XCircle,
  RefreshCw,
  Mail,
  ArrowLeft,
} from 'lucide-react';
import Accordion from '../components/ui/Accordion';
import { useToast } from '../context/ToastContext';

export default function VerificationFailed() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-8 animate-fade-in">
      <div>
        <div className="mb-2 flex items-center gap-3">
          <XCircle className="h-6 w-6 text-warning" />
          <h1 className="text-2xl font-semibold text-text">
            Verification Failed
          </h1>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted">
            What this means
          </p>
          <p className="text-sm text-muted">
            The uploaded document could not be matched with verification
            records. This may not indicate a permanent issue.
          </p>
        </div>

        <div className="mt-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
            What you can do
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            <div className="space-y-2 rounded-2xl border border-border p-4">
              <RefreshCw className="h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-text">
                Retry Verification
              </p>
              <p className="text-xs text-muted">
                Upload the document again to attempt re-verification.
              </p>
              <button
                type="button"
                onClick={() => navigate('/verify')}
                className="w-full rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white transition duration-200 hover:bg-primary/90"
              >
                Try Again
              </button>
            </div>

            <div className="space-y-2 rounded-2xl border border-border p-4">
              <Mail className="h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-text">
                Contact the Issuer
              </p>
              <p className="text-xs text-muted">
                Reach out to the document issuer to confirm the original record.
              </p>
              <button
                type="button"
                onClick={() =>
                  showToast(
                    'Contact support available in the full version.',
                    'info'
                  )
                }
                className="w-full rounded-lg border border-border px-4 py-2 text-xs font-medium text-text transition duration-200 hover:bg-gray-50"
              >
                Get Help
              </button>
            </div>

            <div className="space-y-2 rounded-2xl border border-border p-4">
              <ArrowLeft className="h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-text">Return to Vault</p>
              <p className="text-xs text-muted">
                Go back to your documents and try a different record.
              </p>
              <button
                type="button"
                onClick={() => navigate('/vault')}
                className="w-full rounded-lg border border-border px-4 py-2 text-xs font-medium text-text transition duration-200 hover:bg-gray-50"
              >
                Back to Vault
              </button>
            </div>
          </div>
        </div>
      </div>

      <Accordion label="Technical Details">
        <p>Error Reference: ERR-VRF-4022</p>
        <p>Attempted Hash: 0x4d1b...a022</p>
        <p>Failure Timestamp: {new Date().toISOString()}</p>
        <p>Network State: Global Ledger</p>
        <p>Node: LL-NODE-B04</p>
        <p>Status Code: MATCH_FAILED</p>
      </Accordion>
    </div>
  );
}
