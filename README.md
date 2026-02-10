# Programming Concepts

A static React site hosting interactive reference guides for core programming and engineering concepts. Built with Vite, deployed on GitHub Pages.

**Live:** [https://arnabbiswas.github.io/ProgrammingConcepts/](https://arnabbiswas.github.io/ProgrammingConcepts/)

## Concepts Covered

- Frontend Development
- Backend Development
- System Design
- DevOps
- Testing
- AI / Machine Learning
- Marketing
- Closures (JavaScript)

## Adding a New Concept

Create a `.jsx` file in `src/concepts/`:

```jsx
import { useState } from "react";

export const meta = {
  title: "Your Topic",
  description: "Short description",
};

export default function YourTopic() {
  return <div>...</div>;
}
```

It auto-registers via `import.meta.glob` -- no manual imports needed.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Deployment to GitHub Pages is automated via GitHub Actions on push to `main`.
