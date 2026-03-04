import { useState } from "react";

export default function FilterChip({ label, icon, count, color, isActive, onClick, dataActive }) {
  const [isHovered, setIsHovered] = useState(false);

  const bgColor = isActive
    ? color
    : isHovered
    ? `${color}22`
    : `${color}10`;

  const textColor = isActive ? "#ffffff" : color;
  const borderColor = isActive ? color : `${color}28`;

  return (
    <button
      data-active={dataActive}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold cursor-pointer"
      style={{
        border: `1.5px solid ${borderColor}`,
        backgroundColor: bgColor,
        color: textColor,
        boxShadow: isActive
          ? `0 2px 8px -2px ${color}35`
          : "0 1px 3px -1px var(--color-shadow)",
        transition: "background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease",
      }}
    >
      {icon && <span className="text-sm">{icon}</span>}
      <span className="whitespace-nowrap">{label}</span>
      {count !== undefined && (
        <span
          className="text-[11px] font-bold px-1.5 py-0.5 rounded-md tabular-nums"
          style={{
            backgroundColor: isActive ? "rgba(255,255,255,0.22)" : "var(--color-bg)",
            color: isActive ? "#ffffff" : "var(--color-text-muted)",
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}
