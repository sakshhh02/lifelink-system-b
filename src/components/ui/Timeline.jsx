import { Check } from 'lucide-react';

export default function Timeline({ stages, currentStage }) {
  return (
    <div className="flex w-full items-start justify-between gap-2">
      {stages.map((stage, index) => {
        const status = stage.status ?? 'pending';
        const isComplete = status === 'complete';
        const isCurrent = status === 'current';

        return (
          <div key={stage.key || stage.label} className="flex flex-1 flex-col items-center">
            <div className="relative flex w-full items-center">
              {index > 0 && (
                <div
                  className={`absolute right-1/2 top-1/2 h-0.5 w-full -translate-y-1/2 ${
                    isComplete || isCurrent ? 'bg-secondary' : 'bg-border'
                  }`}
                  style={{ left: '-50%' }}
                />
              )}
              <div
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition duration-200 ${
                  isComplete
                    ? 'bg-primary text-white'
                    : isCurrent
                      ? 'border-2 border-primary bg-white text-primary'
                      : 'border-2 border-border bg-gray-100 text-muted'
                }`}
              >
                {isComplete ? (
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
                {isCurrent && (
                  <span className="absolute inset-0 animate-ping rounded-full border border-primary/40 opacity-40" />
                )}
              </div>
            </div>
            <p
              className={`mt-2 text-center text-xs ${
                isCurrent ? 'font-semibold text-primary' : 'text-muted'
              }`}
            >
              {stage.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
