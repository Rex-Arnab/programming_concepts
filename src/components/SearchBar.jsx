import { useState } from "react";

export default function SearchBar({ value, onChange, accentColor, resultCount, placeholder = "Search concepts by name or description..." }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full max-w-2xl">
      <div
        className="flex items-center rounded-2xl transition-all duration-200"
        style={{
          border: `2px solid ${focused ? accentColor : "var(--color-border)"}`,
          backgroundColor: "var(--color-bg)",
          boxShadow: focused
            ? `0 0 0 3px ${accentColor}18, 0 2px 8px -2px var(--color-shadow)`
            : "0 1px 4px -1px var(--color-shadow)",
        }}
      >
        <span className="pl-5 text-(--color-text-muted)">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full py-3.5 pl-3.5 pr-5 bg-transparent text-(--color-text-primary) text-sm sm:text-base font-sans outline-none placeholder:text-(--color-text-muted)"
        />
        {value && (
          <div className="flex items-center gap-3 pr-5 shrink-0">
            {resultCount !== undefined && (
              <span className="text-xs font-semibold text-(--color-text-muted) whitespace-nowrap px-2 py-1 rounded-md bg-(--color-bg-card-hover)">
                {resultCount} result{resultCount !== 1 ? "s" : ""}
              </span>
            )}
            <button
              onClick={() => onChange("")}
              className="text-(--color-text-muted) hover:text-(--color-text-primary) transition-colors cursor-pointer w-7 h-7 rounded-lg flex items-center justify-center hover:bg-(--color-bg-card-hover)"
              aria-label="Clear search"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
