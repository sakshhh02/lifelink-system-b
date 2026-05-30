import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const STEP_DELAYS = [1000, 2500, 4000, 5500];

export function useVerification() {
  const navigate = useNavigate();
  const { updateVerificationStep, completeVerification, startVerification } =
    useApp();
  const timeoutsRef = useRef([]);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const simulateVerification = useCallback(
    (uploadedMeta, onStepChange, onComplete, simulateFailure = false) => {
      clearTimeouts();
      startVerification(uploadedMeta);

      const markComplete = (stepNum) => {
        updateVerificationStep(stepNum, 'complete');
        onStepChange?.(stepNum);
      };

      onStepChange?.(1);

      const delays = simulateFailure ? STEP_DELAYS.slice(0, 3) : STEP_DELAYS;

      delays.forEach((delay, index) => {
        const stepNum = index + 1;
        const timeout = setTimeout(() => {
          if (simulateFailure && stepNum === 3) {
            clearTimeouts();
            completeVerification(uploadedMeta, false);
            onComplete?.('failed');
            navigate('/verify/failed');
            return;
          }

          markComplete(stepNum);

          if (stepNum < 4) {
            onStepChange?.(stepNum + 1);
          } else {
            completeVerification(uploadedMeta, true);
            onComplete?.('complete');
            navigate('/verify/result/new');
          }
        }, delay);
        timeoutsRef.current.push(timeout);
      });
    },
    [
      clearTimeouts,
      startVerification,
      updateVerificationStep,
      completeVerification,
      navigate,
    ]
  );

  return { simulateVerification, clearTimeouts };
}
