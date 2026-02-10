const modules = import.meta.glob('./*.jsx', { eager: true });

const concepts = Object.entries(modules).map(([path, mod]) => {
  const slug = path.replace('./', '').replace('.jsx', '');
  return {
    slug,
    title: mod.meta?.title || slug,
    description: mod.meta?.description || '',
    icon: mod.meta?.icon || null,
    color: mod.meta?.color || '#818cf8',
    Component: mod.default,
  };
});

export default concepts;
