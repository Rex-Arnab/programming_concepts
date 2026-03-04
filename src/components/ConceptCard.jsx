function stripMarkdown(text) {
  return text
    .replace(/#{1,6}\s+/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/^[-*]\s+/gm, "")
    .replace(/\n+/g, " ")
    .trim();
}

export default function ConceptCard({ concept, color, onOpen, peekLength = 120 }) {
  const plain = stripMarkdown(concept.desc);
  const peek =
    plain.length > peekLength
      ? plain.slice(0, peekLength) + "..."
      : plain;

  return (
    <div
      onClick={() => onOpen(concept)}
      className="rounded-2xl cursor-pointer transition-all duration-200 bg-(--color-bg-card) hover:bg-(--color-bg-card-hover)"
      style={{
        borderTop: `1.5px solid var(--color-border)`,
        borderRight: `1.5px solid var(--color-border)`,
        borderBottom: `1.5px solid var(--color-border)`,
        borderLeft: `5px solid ${color}50`,
        boxShadow: `0 2px 8px -2px var(--color-shadow), 0 1px 2px -1px ${color}08`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderLeftColor = color;
        e.currentTarget.style.boxShadow = `0 8px 24px -6px ${color}20, 0 2px 8px -2px var(--color-shadow)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderLeftColor = `${color}50`;
        e.currentTarget.style.boxShadow = `0 2px 8px -2px var(--color-shadow), 0 1px 2px -1px ${color}08`;
      }}
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Number badge + name */}
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

            {/* Peek text */}
            <p className="text-[13px] text-(--color-text-secondary) leading-relaxed mt-1 pl-[46px]">
              {peek}
            </p>
          </div>

          {/* Open indicator */}
          <span
            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-text-muted)",
              border: `1.5px solid var(--color-border)`,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
