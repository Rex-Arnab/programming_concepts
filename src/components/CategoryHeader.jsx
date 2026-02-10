export default function CategoryHeader({ name, icon, color, count }) {
  return (
    <div
      className="rounded-2xl p-6 sm:p-7 mb-9 border-[1.5px]"
      style={{
        borderColor: `${color}25`,
        backgroundColor: `${color}06`,
        boxShadow: `0 2px 12px -4px ${color}12`,
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shrink-0 border-[1.5px]"
          style={{
            backgroundColor: `${color}12`,
            borderColor: `${color}20`,
          }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2
            className="text-xl sm:text-2xl font-extrabold tracking-tight"
            style={{ color }}
          >
            {name}
          </h2>
          <p className="text-xs sm:text-sm text-(--color-text-muted) mt-0.5 font-medium">
            {count} concept{count !== 1 ? "s" : ""} in this category
          </p>
        </div>
      </div>
    </div>
  );
}
