import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({
  label,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const toggle = () => {
    const next = !open;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className="mt-4 border-t border-border pt-4">
      <div className="rounded-2xl border border-border bg-surface">
        <button
          type="button"
          onClick={toggle}
          className="flex w-full cursor-pointer flex-row items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium text-text transition duration-200 hover:bg-gray-50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-expanded={open}
        >
          {label}
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-muted transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
        {!open && (
          <p className="mt-1 px-4 pb-3 text-xs text-muted">
            Hash, metadata and network details
          </p>
        )}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <div className="space-y-2 border-t border-border px-4 py-3 font-mono text-sm text-muted">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
