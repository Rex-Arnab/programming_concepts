export default function PageHeader({ label, title, subtitle, accentColor, badge, children }) {
  return (
    <div className="bg-(--color-bg-card) border-b border-(--color-border)">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10 2xl:px-14 pt-14 pb-10">
        {/* Badge row */}
        {(label || badge) && (
          <div className="flex items-center gap-3 mb-4">
            {label && (
              <span
                className="text-[11px] tracking-widest uppercase font-extrabold"
                style={{ color: accentColor }}
              >
                {label}
              </span>
            )}
            {badge && (
              <span
                className="text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wide"
                style={{
                  backgroundColor: `${accentColor}12`,
                  color: accentColor,
                  border: `1.5px solid ${accentColor}20`,
                }}
              >
                {badge}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-(--color-text-primary) mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base text-(--color-text-secondary) leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        )}

        {/* Optional children slot (e.g. search bar) */}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}
