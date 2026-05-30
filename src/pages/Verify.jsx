import { useRef, useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { verificationSteps } from '../data/mockData';
import { useVerification } from '../hooks/useVerification';
import Card from '../components/ui/Card';
import ProgressStep from '../components/ui/ProgressStep';
import Accordion from '../components/ui/Accordion';
import {
  formatTodayDate,
  formatFileSize,
  generateReferenceNumber,
} from '../utils/helpers';

export default function Verify() {
  const { simulateVerification } = useVerification();
  const fileInputRef = useRef(null);

  const [uploadState, setUploadState] = useState('idle');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [simulateFailure, setSimulateFailure] = useState(false);

  const metadata = uploadedFile
    ? {
        name: uploadedFile.name,
        fileSize: formatFileSize(uploadedFile.size),
        uploadDate: formatTodayDate(),
        referenceNumber: generateReferenceNumber(),
        category: 'Professional',
      }
    : null;

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    setUploadState('uploaded');
  };

  const handleStartVerification = () => {
    setUploadState('running');
    setCurrentStep(1);
    setCompletedSteps([]);

    simulateVerification(
      metadata,
      (step) => {
        if (step > 1) {
          setCompletedSteps((prev) => {
            const next = [...prev];
            for (let i = 1; i < step; i++) {
              if (!next.includes(i)) next.push(i);
            }
            return next;
          });
        }
        setCurrentStep(step);
      },
      (result) => {
        if (result === 'complete') {
          setCompletedSteps([1, 2, 3, 4]);
          setCurrentStep(4);
          setUploadState('complete');
        }
      },
      simulateFailure
    );
  };

  const stepsWithStatus = verificationSteps.map((s) => ({
    ...s,
    status: completedSteps.includes(s.number) ? 'complete' : 'pending',
  }));

  const showRightPanel = uploadState !== 'idle';

  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        <div className="w-[45%] space-y-6">
          {uploadState === 'idle' && (
            <Card
              className="flex min-h-[360px] cursor-pointer flex-col items-center justify-center border-2 border-dashed border-border bg-background/50 transition duration-200 hover:border-primary/40"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleFileSelect}
              />
              <Upload className="mb-4 h-12 w-12 text-muted" />
              <h3 className="text-lg font-semibold text-text">
                Upload Verification Document
              </h3>
              <p className="mt-2 text-sm text-muted">
                Supported: PDF, JPEG, Certificate Files
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="mt-6 rounded-2xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Upload Document
              </button>
            </Card>
          )}

          {(uploadState === 'uploaded' ||
            uploadState === 'running' ||
            uploadState === 'complete') && (
            <Card>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex aspect-[4/5] items-center justify-center rounded-2xl bg-gray-100">
                  <FileText className="h-16 w-16 text-muted" />
                </div>
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-text">
                    Extracted Metadata
                  </h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between gap-4 border-b border-border py-2">
                      <dt className="text-muted">File Name</dt>
                      <dd className="font-medium text-text">{metadata?.name}</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-border py-2">
                      <dt className="text-muted">File Size</dt>
                      <dd className="font-medium text-text">{metadata?.fileSize}</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-border py-2">
                      <dt className="text-muted">Upload Date</dt>
                      <dd className="font-medium text-text">{metadata?.uploadDate}</dd>
                    </div>
                    <div className="flex justify-between gap-4 py-2">
                      <dt className="text-muted">Reference Number</dt>
                      <dd className="font-mono text-xs font-medium text-text">
                        {metadata?.referenceNumber}
                      </dd>
                    </div>
                  </dl>
                  {uploadState === 'uploaded' && (
                    <button
                      type="button"
                      onClick={handleStartVerification}
                      className="mt-6 w-full rounded-2xl bg-primary py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      Start Verification
                    </button>
                  )}
                </div>
              </div>
            </Card>
          )}

          <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-gray-50 p-3">
            <input
              type="checkbox"
              id="simulateFailure"
              checked={simulateFailure}
              onChange={(e) => setSimulateFailure(e.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            <label
              htmlFor="simulateFailure"
              className="cursor-pointer select-none text-xs text-muted"
            >
              Simulate verification failure (prototype testing)
            </label>
          </div>
        </div>

        <div
          className={`w-[55%] border-l-4 border-primary bg-gradient-to-b from-accent/20 to-transparent pl-6 transition-opacity duration-200 ${
            showRightPanel ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          {showRightPanel && (
            <Card className="border-0 bg-transparent shadow-none">
              <h3 className="mb-6 text-xl font-semibold text-text">
                Verification Journey
              </h3>
              <ProgressStep
                steps={stepsWithStatus}
                currentStep={currentStep || 1}
              />
            </Card>
          )}
        </div>
      </div>

      <Accordion label="Technical Execution Details">
        <p>Simulated Hash: 0x{Math.random().toString(16).slice(2, 10)}</p>
        <p>Node Reference: LL-NODE-B04</p>
        <p>Network: Global Verification Network</p>
        <p>Timestamp: {new Date().toISOString()}</p>
      </Accordion>
    </div>
  );
}
