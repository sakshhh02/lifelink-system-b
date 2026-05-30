export default function EmptyState({
  icon,
  title,
  description,
  ctaLabel,
  onCta,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-8 py-16">
      {icon && (
        <div className="rounded-full bg-gray-50 p-3 text-muted [&>svg]:h-12 [&>svg]:w-12">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      <p className="max-w-xs text-center text-sm text-muted">{description}</p>
      {ctaLabel && onCta && (
        <button
          type="button"
          onClick={onCta}
          className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
