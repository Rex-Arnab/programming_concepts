import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import ReactMarkdown from "react-markdown";

export default function ConceptModal({ concept, categoryName, categoryColor, isOpen, onClose }) {
  // Body scroll lock
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!concept) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay
          className="fixed inset-0 z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        />

        {/* Dialog box */}
        <Dialog.Content
          className="fixed z-50 top-[50%] left-[50%] w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-(--color-bg-card) outline-none"
          style={{
            transform: "translate(-50%, -50%)",
            boxShadow: "0 25px 60px -15px rgba(0,0,0,0.45)",
            border: `1px solid var(--color-border)`,
          }}
          onEscapeKeyDown={onClose}
          onInteractOutside={onClose}
        >
          {/* ── Header ── */}
          <div
            className="flex items-start justify-between gap-3 px-6 pt-5 pb-4"
            style={{ borderBottom: `1px solid var(--color-border)` }}
          >
            <div className="flex items-start gap-3 min-w-0">
              {/* Number badge */}
              <span
                className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg tabular-nums shrink-0 tracking-wide mt-0.5"
                style={{
                  backgroundColor: `${categoryColor}12`,
                  color: categoryColor,
                  border: `1.5px solid ${categoryColor}22`,
                }}
              >
                {String(concept.id).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <Dialog.Title className="text-[16px] font-bold text-(--color-text-primary) leading-snug">
                  {concept.name}
                </Dialog.Title>
                {categoryName && (
                  <p
                    className="text-[11px] font-medium mt-0.5 px-2 py-0.5 rounded-md inline-block"
                    style={{
                      color: categoryColor,
                      backgroundColor: `${categoryColor}12`,
                    }}
                  >
                    {categoryName}
                  </p>
                )}
              </div>
            </div>

            {/* Close button */}
            <Dialog.Close
              className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors mt-0.5"
              style={{
                color: "var(--color-text-muted)",
                backgroundColor: "var(--color-bg)",
                border: "1.5px solid var(--color-border)",
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
              style={{ borderLeft: `3px solid ${categoryColor}35` }}
            >
              <ReactMarkdown>{concept.desc}</ReactMarkdown>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
