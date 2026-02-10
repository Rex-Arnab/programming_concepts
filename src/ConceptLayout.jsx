import { useState, useRef, useEffect } from "react";
import { SearchBar, FilterChip, CategoryHeader, ConceptCard, PageHeader, BackToTop } from "./components";

export default function ConceptLayout({
  title,
  subtitle,
  accentColor,
  categories,
}) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const filterScrollRef = useRef(null);

  const totalConcepts = categories.reduce(
    (sum, c) => sum + c.concepts.length,
    0
  );

  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      concepts: cat.concepts.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.desc.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.concepts.length > 0);

  const displayCategories = activeCategory
    ? filteredCategories.filter((c) => c.name === activeCategory)
    : filteredCategories;

  const matchCount = filteredCategories.reduce(
    (sum, c) => sum + c.concepts.length,
    0
  );

  // Scroll active filter chip into view
  useEffect(() => {
    if (filterScrollRef.current && activeCategory) {
      const container = filterScrollRef.current;
      const activeBtn = container.querySelector('[data-active="true"]');
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-text-primary) font-sans">
      {/* ========== HEADER ========== */}
      <header>
        <PageHeader
          label="Reference Guide"
          title={title}
          subtitle={subtitle}
          accentColor={accentColor}
          badge={`${totalConcepts} concepts`}
        >
          <SearchBar
            value={search}
            onChange={setSearch}
            accentColor={accentColor}
            resultCount={search ? matchCount : undefined}
          />
        </PageHeader>

        {/* ========== CATEGORY FILTER BAR ========== */}
        <div className="border-t border-(--color-border) bg-(--color-bg-card)">
          <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10 2xl:px-14">
            <div
              ref={filterScrollRef}
              className="flex gap-2.5 py-5 overflow-x-auto"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <FilterChip
                label="All"
                icon="*"
                count={totalConcepts}
                color={accentColor}
                isActive={!activeCategory}
                onClick={() => setActiveCategory(null)}
              />
              {categories.map((cat) => (
                <FilterChip
                  key={cat.name}
                  label={cat.name}
                  icon={cat.icon}
                  count={cat.concepts.length}
                  color={cat.color}
                  isActive={activeCategory === cat.name}
                  dataActive={activeCategory === cat.name}
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === cat.name ? null : cat.name
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ========== CONTENT ========== */}
      <main className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10 2xl:px-14 pt-12 pb-24">
        {/* Empty state */}
        {displayCategories.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4 opacity-30">?</div>
            <h3 className="text-lg font-semibold text-(--color-text-primary) mb-2">
              No concepts found
            </h3>
            <p className="text-sm text-(--color-text-muted)">
              Try adjusting your search or clearing the filter.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory(null);
              }}
              className="mt-4 text-sm font-medium cursor-pointer px-4 py-2 rounded-lg transition-colors"
              style={{ color: accentColor, backgroundColor: `${accentColor}10` }}
            >
              Clear all filters
            </button>
          </div>
        )}

        {displayCategories.map((cat) => (
          <section key={cat.name} className="mb-14">
            <CategoryHeader
              name={cat.name}
              icon={cat.icon}
              color={cat.color}
              count={cat.concepts.length}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {cat.concepts.map((concept) => (
                <ConceptCard
                  key={concept.id}
                  concept={concept}
                  color={cat.color}
                  isExpanded={expandedId === concept.id}
                  onToggle={() =>
                    setExpandedId(
                      expandedId === concept.id ? null : concept.id
                    )
                  }
                />
              ))}
            </div>
          </section>
        ))}

        {displayCategories.length > 2 && <BackToTop />}
      </main>
    </div>
  );
}
