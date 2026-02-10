export default function FilterChip({ label, icon, count, color, isActive, onClick, dataActive }) {
  return (
    <button
      data-active={dataActive}
      onClick={onClick}
      className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold cursor-pointer transition-all duration-200"
      style={{
        border: `1.5px solid ${isActive ? `${color}40` : "var(--color-border)"}`,
        backgroundColor: isActive ? `${color}10` : "var(--color-bg-card)",
        color: isActive ? color : "var(--color-text-secondary)",
        boxShadow: isActive
          ? `0 2px 8px -2px ${color}18`
          : "0 1px 3px -1px var(--color-shadow)",
      }}
    >
      {icon && <span className="text-sm">{icon}</span>}
      <span className="whitespace-nowrap">{label}</span>
      {count !== undefined && (
        <span
          className="text-[11px] font-bold px-1.5 py-0.5 rounded-md tabular-nums"
          style={{
            backgroundColor: isActive ? `${color}18` : "var(--color-bg)",
            color: isActive ? color : "var(--color-text-muted)",
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}
