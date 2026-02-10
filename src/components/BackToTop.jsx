export default function BackToTop() {
  return (
    <div className="flex justify-center pt-4">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-sm text-(--color-text-muted) hover:text-(--color-text-primary) cursor-pointer transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-(--color-bg-card)"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
        Back to top
      </button>
    </div>
  );
}
