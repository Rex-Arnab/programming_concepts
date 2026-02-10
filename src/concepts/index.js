// Auto-registry: import your concept components here
// Each concept file should export: default component + named `meta` object

const modules = import.meta.glob('./*.jsx', { eager: true });

const concepts = Object.entries(modules).map(([path, mod]) => {
  const slug = path.replace('./', '').replace('.jsx', '');
  return {
    slug,
    title: mod.meta?.title || slug,
    description: mod.meta?.description || '',
    Component: mod.default,
  };
});

export default concepts;
