import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  GraduationCap,
  IdCard,
  Briefcase,
  HeartPulse,
  Scale,
  Lock,
  Filter,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VAULT_CATEGORIES, lifecycleStages } from '../data/mockData';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Timeline from '../components/ui/Timeline';
import Accordion from '../components/ui/Accordion';
import EmptyState from '../components/ui/EmptyState';
import {
  getCategoryContext,
  getCompletedAndCurrentStages,
} from '../utils/helpers';

const categoryIcons = {
  Academic: GraduationCap,
  Identity: IdCard,
  Professional: Briefcase,
  Medical: HeartPulse,
  Legal: Scale,
};

const RECENT_ACCESS_IDS = ['doc-001', 'doc-003'];

export default function Vault() {
  const navigate = useNavigate();
  const { documents } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDocument, setSelectedDocument] = useState(documents[0] ?? null);

  const filtered = useMemo(() => {
    if (selectedCategory === 'All') return documents;
    return documents.filter((d) => d.category === selectedCategory);
  }, [documents, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts = { All: documents.length };
    VAULT_CATEGORIES.slice(1).forEach((cat) => {
      counts[cat] = documents.filter((d) => d.category === cat).length;
    });
    return counts;
  }, [documents]);

  const recentDocs = documents.filter((d) =>
    RECENT_ACCESS_IDS.includes(d.id)
  );

  const timelineStages = useMemo(() => {
    if (!selectedDocument) return [];
    const statuses = getCompletedAndCurrentStages(
      selectedDocument.lifecycleStage
    );
    return lifecycleStages.map((stage, i) => ({
      ...stage,
      status: statuses[i],
    }));
  }, [selectedDocument]);

  if (documents.length === 0) {
    return (
      <EmptyState
        icon={<Lock />}
        title="Your vault is empty."
        description="Uploaded records will appear here once you add documents."
        ctaLabel="Upload First Document"
        onCta={() => navigate('/verify')}
      />
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-3 space-y-6">
        <Card className="!p-4">
          <h3 className="mb-3 text-sm font-semibold text-text">Categories</h3>
          <ul className="space-y-1">
            {VAULT_CATEGORIES.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition duration-200 ${
                    selectedCategory === cat
                      ? 'bg-accent font-medium text-primary'
                      : 'text-muted hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  {cat === 'All' ? 'All Documents' : cat}
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                    {categoryCounts[cat]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="!p-4">
          <h3 className="mb-3 text-sm font-semibold text-text">Recent Access</h3>
          <ul className="space-y-2">
            {recentDocs.map((doc) => (
              <li key={doc.id}>
                <button
                  type="button"
                  onClick={() => setSelectedDocument(doc)}
                  className="w-full truncate text-left text-sm text-primary hover:underline"
                >
                  {doc.name}
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="col-span-5">
        <Card className="overflow-hidden !p-0">
          <div className="border-b border-border px-4 py-3">
            <h3 className="text-sm font-semibold text-text">Documents</h3>
          </div>
          {selectedCategory !== 'All' && filtered.length === 0 ? (
            <EmptyState
              icon={<Filter />}
              title={`No ${selectedCategory} documents found.`}
              description="You have no documents in this category yet."
              ctaLabel="View All Documents"
              onCta={() => setSelectedCategory('All')}
            />
          ) : (
            <ul className="max-h-[520px] divide-y divide-border overflow-y-auto">
              {filtered.map((doc) => {
                const Icon = categoryIcons[doc.category] || FileText;
                const isSelected = selectedDocument?.id === doc.id;
                return (
                  <li key={doc.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedDocument(doc)}
                      className={`w-full px-4 py-4 text-left transition duration-200 hover:bg-gray-50 ${
                        isSelected ? 'bg-accent/50' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <Icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-text">
                            {doc.name}
                          </p>
                          <p className="truncate font-mono text-xs text-muted">
                            {doc.hashSignature || 'No hash on file'}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                              {doc.category}
                            </span>
                            <span className="text-xs text-muted">
                              {doc.uploadDate}
                            </span>
                            <Badge status={doc.verificationStatus} />
                          </div>
                          <div className="mt-2 flex gap-3 text-xs font-medium text-primary">
                            <span
                              role="button"
                              tabIndex={0}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDocument(doc);
                              }}
                              onKeyDown={() => {}}
                            >
                              View
                            </span>
                            <span
                              role="button"
                              tabIndex={0}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate('/verify');
                              }}
                              onKeyDown={() => {}}
                            >
                              Verify
                            </span>
                            <span
                              role="button"
                              tabIndex={0}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate('/share');
                              }}
                              onKeyDown={() => {}}
                            >
                              Share
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>

      <div className="col-span-4 space-y-6">
        {selectedDocument && filtered.some((d) => d.id === selectedDocument.id) && (
          <>
            <Card>
              <h3 className="mb-4 text-sm font-semibold text-text">
                Document Lifecycle
              </h3>
              <Timeline stages={timelineStages} />
            </Card>

            <Card>
              <h3 className="mb-2 text-sm font-semibold text-text">
                Active Context
              </h3>
              <p className="text-sm text-muted">
                {getCategoryContext(selectedDocument.category)}
              </p>
            </Card>

            <Accordion label="Technical Details">
              <div className="space-y-2">
                <p>Hash Signature: {selectedDocument.hashSignature || '—'}</p>
                <p>Reference Number: {selectedDocument.referenceNumber}</p>
                <p>Category: {selectedDocument.category}</p>
                <p>Upload Date: {selectedDocument.uploadDate}</p>
              </div>
            </Accordion>
          </>
        )}
      </div>
    </div>
  );
}
