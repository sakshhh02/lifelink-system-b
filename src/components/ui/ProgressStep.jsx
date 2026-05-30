import { Check } from 'lucide-react';

export default function ProgressStep({ steps, currentStep }) {
  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const stepNum = step.number ?? index + 1;
        const isComplete =
          step.status === 'complete' || currentStep > stepNum;
        const isActive = currentStep === stepNum && !isComplete;
        const showMeaning = isComplete || isActive;

        return (
          <div
            key={stepNum}
            className="animate-fade-in relative flex gap-4 pl-3"
            style={{ animationDelay: `${index * 300}ms` }}
          >
            {isActive && (
              <div className="absolute bottom-0 left-0 top-0 w-1 rounded-full bg-primary" />
            )}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition duration-200 ${
                  isComplete
                    ? 'bg-primary text-white'
                    : isActive
                      ? 'bg-primary text-white'
                      : 'border-2 border-border bg-gray-50 text-muted'
                }`}
              >
                {isComplete ? (
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                ) : (
                  stepNum
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`my-1 min-h-[24px] w-0.5 flex-1 ${
                    isComplete ? 'bg-primary' : 'bg-border'
                  }`}
                />
              )}
            </div>
            <div className="flex-1 pb-8">
              <p
                className={`text-sm ${
                  isActive ? 'font-semibold text-text' : 'font-medium text-muted'
                }`}
              >
                {step.label}
              </p>
              {showMeaning && (
                <p className="mt-1 text-sm text-muted">{step.meaning}</p>
              )}
              {isActive && (
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full w-1/2 animate-pulse rounded-full bg-primary transition-all duration-1000" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
