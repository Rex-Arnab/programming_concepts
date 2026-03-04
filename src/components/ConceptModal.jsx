import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import ReactMarkdown from "react-markdown";

export default function ConceptModal({
  concept,
  categoryName,
  categoryColor,
  isOpen,
  onClose,
  allConcepts = [],
  onNavigate,
}) {
  const currentIndex = allConcepts.findIndex((c) => c.id === concept?.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allConcepts.length - 1;

  // Body scroll lock
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Keyboard arrow navigation
  useEffect(() => {
    if (!isOpen || !onNavigate) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(allConcepts[currentIndex - 1]);
      if (e.key === "ArrowRight" && hasNext) onNavigate(allConcepts[currentIndex + 1]);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, currentIndex, hasPrev, hasNext, allConcepts, onNavigate]);

  if (!concept) return null;

  const navBtnStyle = (enabled) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    fontSize: "12px",
    fontWeight: 600,
    padding: "0.3rem 0.75rem",
    borderRadius: "8px",
    border: `1.5px solid ${enabled ? `${categoryColor}35` : "var(--color-border)"}`,
    backgroundColor: enabled ? `${categoryColor}10` : "transparent",
    color: enabled ? categoryColor : "var(--color-text-muted)",
    cursor: enabled ? "pointer" : "not-allowed",
    opacity: enabled ? 1 : 0.4,
    transition: "all 150ms ease",
  });

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay
          className="modal-overlay fixed inset-0 z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        />

        {/* Dialog box */}
        <Dialog.Content
          className="modal-content fixed z-50 top-[50%] left-[50%] w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-(--color-bg-card) outline-none"
          style={{
            transform: "translate(-50%, -50%)",
            boxShadow: "0 25px 60px -15px rgba(0,0,0,0.5), 0 0 0 1px var(--color-border)",
          }}
          onEscapeKeyDown={onClose}
          onInteractOutside={onClose}
        >
          {/* ── Header ── */}
          <div
            className="flex items-start justify-between gap-3 px-6 pt-5 pb-4"
            style={{
              borderBottom: `1px solid var(--color-border)`,
              borderLeft: `4px solid ${categoryColor}`,
              paddingLeft: "1.5rem",
            }}
          >
            <div className="flex items-start gap-3 min-w-0">
              {/* Number badge */}
              <span
                className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg tabular-nums shrink-0 tracking-wide mt-0.5"
                style={{
                  backgroundColor: `${categoryColor}12`,
                  color: categoryColor,
                  border: `1.5px solid ${categoryColor}22`,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {String(concept.id).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <Dialog.Title className="text-[16px] font-bold text-(--color-text-primary) leading-snug">
                  {concept.name}
                </Dialog.Title>
                {categoryName && (
                  <span
                    className="text-[11px] font-bold mt-1 px-2 py-0.5 rounded inline-block"
                    style={{
                      backgroundColor: categoryColor,
                      color: "#ffffff",
                    }}
                  >
                    {categoryName}
                  </span>
                )}
              </div>
            </div>

            {/* Close button */}
            <Dialog.Close
              className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer mt-0.5"
              style={{
                color: "var(--color-text-muted)",
                backgroundColor: "var(--color-bg)",
                border: "1.5px solid var(--color-border)",
                transition: "all 150ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-bg-card-hover)";
                e.currentTarget.style.color = "var(--color-text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-bg)";
                e.currentTarget.style.color = "var(--color-text-muted)";
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </Dialog.Close>
          </div>

          {/* ── Content ── */}
          <div className="overflow-y-auto flex-1 px-6 py-5">
            <div
              className="text-[14px] leading-[1.85] text-(--color-text-secondary) markdown-content pl-5"
              style={{ borderLeft: `3px solid ${categoryColor}40` }}
            >
              <ReactMarkdown>{concept.desc}</ReactMarkdown>
            </div>
          </div>

          {/* ── Footer navigation ── */}
          {allConcepts.length > 1 && (
            <div
              className="flex items-center justify-between px-6 py-3"
              style={{ borderTop: `1px solid var(--color-border)` }}
            >
              <span
                className="text-[12px] text-(--color-text-muted)"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {currentIndex + 1} / {allConcepts.length}
                <span className="ml-1 opacity-60">in {categoryName}</span>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => hasPrev && onNavigate(allConcepts[currentIndex - 1])}
                  style={navBtnStyle(hasPrev)}
                  title="Previous (←)"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => hasNext && onNavigate(allConcepts[currentIndex + 1])}
                  style={navBtnStyle(hasNext)}
                  title="Next (→)"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
