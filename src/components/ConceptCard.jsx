export default function ConceptCard({ concept, color, isExpanded, onToggle, peekLength = 120 }) {
  const peek =
    concept.desc.length > peekLength
      ? concept.desc.slice(0, peekLength) + "..."
      : concept.desc;

  return (
    <div
      onClick={onToggle}
      className="rounded-2xl cursor-pointer transition-all duration-200 bg-(--color-bg-card) hover:bg-(--color-bg-card-hover)"
      style={{
        borderTop: `1.5px solid ${isExpanded ? `${color}35` : "var(--color-border)"}`,
        borderRight: `1.5px solid ${isExpanded ? `${color}35` : "var(--color-border)"}`,
        borderBottom: `1.5px solid ${isExpanded ? `${color}35` : "var(--color-border)"}`,
        borderLeft: `5px solid ${isExpanded ? color : `${color}50`}`,
        boxShadow: isExpanded
          ? `0 8px 24px -6px ${color}20, 0 2px 8px -2px var(--color-shadow)`
          : `0 2px 8px -2px var(--color-shadow), 0 1px 2px -1px ${color}08`,
      }}
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Concept number + name */}
            <div className="flex items-center gap-3 mb-2.5">
              <span
                className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg tabular-nums shrink-0 tracking-wide"
                style={{
                  backgroundColor: `${color}12`,
                  color: color,
                  border: `1.5px solid ${color}22`,
                }}
              >
                {String(concept.id).padStart(2, "0")}
              </span>
              <h3 className="text-[15px] font-bold text-(--color-text-primary) leading-snug">
                {concept.name}
              </h3>
            </div>

            {/* Description peek (collapsed) */}
            {!isExpanded && (
              <p className="text-[13px] text-(--color-text-secondary) leading-relaxed mt-1 pl-[46px]">
                {peek}
              </p>
            )}
          </div>

          {/* Expand indicator */}
          <span
            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 mt-0.5"
            style={{
              backgroundColor: isExpanded ? `${color}15` : "var(--color-bg)",
              color: isExpanded ? color : "var(--color-text-muted)",
              border: `1.5px solid ${isExpanded ? `${color}25` : "var(--color-border)"}`,
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 200ms ease",
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>

        {/* Expanded description */}
        {isExpanded && (
          <div className="mt-4 pl-[46px]">
            <div
              className="pl-5 border-l-[3px]"
              style={{ borderColor: `${color}35` }}
            >
              <p className="text-[14px] leading-[1.85] text-(--color-text-secondary)">
                {concept.desc}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
