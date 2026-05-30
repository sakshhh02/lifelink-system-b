import { createContext, useCallback, useContext, useState } from 'react';
import {
  activityFeed as mockActivity,
  documents as mockDocuments,
  profileTimeline as mockTimeline,
  shares as mockShares,
  verificationSteps,
} from '../data/mockData';
import { generateReferenceNumber, formatTodayDate } from '../utils/helpers';

const AppContext = createContext(null);

const initialVerificationState = {
  status: 'idle',
  currentStep: 0,
  steps: verificationSteps.map((s) => ({ ...s, status: 'pending' })),
  documentId: null,
  failed: false,
};

export function AppProvider({ children }) {
  const [documents, setDocuments] = useState([...mockDocuments]);
  const [shares, setShares] = useState([...mockShares]);
  const [activityFeed, setActivityFeed] = useState([...mockActivity]);
  const [profileTimeline, setProfileTimeline] = useState([...mockTimeline]);
  const [selectedDocument, setSelectedDocumentState] = useState(null);
  const [verificationState, setVerificationState] = useState(
    initialVerificationState
  );
  const [lastVerifiedDocument, setLastVerifiedDocument] = useState(null);
  const [lastVerificationFailed, setLastVerificationFailed] = useState(false);

  const setSelectedDocument = useCallback((doc) => {
    setSelectedDocumentState(doc);
  }, []);

  const startVerification = useCallback((doc) => {
    setLastVerificationFailed(false);
    setVerificationState({
      status: 'running',
      currentStep: 0,
      steps: verificationSteps.map((s) => ({ ...s, status: 'pending' })),
      documentId: doc?.id ?? null,
      failed: false,
    });
  }, []);

  const updateVerificationStep = useCallback((stepNumber, status) => {
    setVerificationState((prev) => ({
      ...prev,
      currentStep: stepNumber,
      steps: prev.steps.map((s) =>
        s.number === stepNumber ? { ...s, status } : s
      ),
    }));
  }, []);

  const completeVerification = useCallback(
    (uploadedMeta, success = true) => {
      if (!success) {
        setLastVerificationFailed(true);
        setVerificationState((prev) => ({ ...prev, status: 'failed' }));
        return;
      }

      setLastVerificationFailed(false);
      const newDoc = {
        id: `doc-${Date.now()}`,
        name: uploadedMeta.name,
        category: uploadedMeta.category || 'Professional',
        uploadDate: formatTodayDate(),
        fileSize: uploadedMeta.fileSize,
        verificationStatus: 'Verified',
        lifecycleStage: 'Verified',
        referenceNumber: uploadedMeta.referenceNumber,
        hashSignature: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
        verifiedBy: 'Verification Authority',
        verifiedAt: formatTodayDate(),
        pinned: false,
      };

      setDocuments((prev) => [...prev, newDoc]);
      setLastVerifiedDocument(newDoc);
      setVerificationState((prev) => ({ ...prev, status: 'complete' }));

      setActivityFeed((prev) => [
        {
          id: `act-${Date.now()}`,
          type: 'VERIFICATION_COMPLETE',
          title: 'Verification Complete',
          description: `${newDoc.name} has been successfully verified.`,
          action: 'View Result',
          actionRoute: `/verify/result/${newDoc.id}`,
          timestamp: 'Just now',
          icon: 'success',
        },
        ...prev,
      ]);
    },
    []
  );

  const resetVerification = useCallback(() => {
    setVerificationState(initialVerificationState);
    setLastVerificationFailed(false);
  }, []);

  const addDocument = useCallback((doc) => {
    setDocuments((prev) => [...prev, doc]);
    setActivityFeed((prev) => [
      {
        id: `act-${Date.now()}`,
        type: 'DOCUMENT_UPLOADED',
        title: 'Document Uploaded',
        description: `${doc.name} added to your vault.`,
        action: 'View Document',
        actionRoute: '/vault',
        timestamp: 'Just now',
        icon: 'info',
      },
      ...prev,
    ]);
  }, []);

  const revokeShare = useCallback((shareId) => {
    setShares((prev) => prev.filter((s) => s.id !== shareId));
  }, []);

  const addActivityEvent = useCallback((event) => {
    setActivityFeed((prev) => [{ ...event, id: event.id || `act-${Date.now()}` }, ...prev]);
  }, []);

  const addShare = useCallback(
    ({ recipientEmail, recipientInitials, documentNames, accessLevel, expiresAt }) => {
      const newShare = {
        id: `share-${Date.now()}`,
        recipientEmail,
        recipientInitials,
        documents: documentNames,
        accessLevel,
        expiresAt,
        status: 'Active',
        lastAccessed: 'Never',
      };
      setShares((prev) => [newShare, ...prev]);
      addActivityEvent({
        type: 'DOCUMENT_SHARED',
        title: 'Document Successfully Shared',
        description: `${documentNames.join(', ')} has been shared with ${recipientEmail}.`,
        action: 'Manage Access',
        actionRoute: '/share',
        timestamp: 'Just now',
        icon: 'success',
      });
      setProfileTimeline((prev) => [
        {
          id: `evt-${Date.now()}`,
          title: 'Access granted',
          description: `Records shared with ${recipientEmail}.`,
          timestamp: `${formatTodayDate()} · ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
        },
        ...prev,
      ]);
      return newShare;
    },
    [addActivityEvent]
  );

  const addTimelineEvent = useCallback((event) => {
    setProfileTimeline((prev) => [
      { ...event, id: event.id || `evt-${Date.now()}` },
      ...prev,
    ]);
  }, []);

  const value = {
    documents,
    shares,
    activityFeed,
    profileTimeline,
    selectedDocument,
    verificationState,
    lastVerifiedDocument,
    lastVerificationFailed,
    setSelectedDocument,
    startVerification,
    updateVerificationStep,
    completeVerification,
    resetVerification,
    addDocument,
    revokeShare,
    addActivityEvent,
    addShare,
    addTimelineEvent,
    generateReferenceNumber,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
