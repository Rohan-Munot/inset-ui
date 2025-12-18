# Inset UI - Development Instructions

A personal component library built on Base UI primitives with a distinctive inset shadow aesthetic.

## Purpose

This project exists to:

1. **Learn** component library architecture and design systems
2. **Explore** Base UI as unstyled primitives for accessible components
3. **Develop** a personal design language with inner shadows and smooth animations
4. **Practice** monorepo management with Turborepo and Bun

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) >= 1.3.1

### Setup

```bash
# Clone and install
bun install

# Start development
bun dev
```

This runs the Next.js web app at `http://localhost:3000` for testing components.

## Project Structure

```
├── apps/web/           # Next.js app for demos & documentation
├── packages/ui/        # @inset/ui component library
│   ├── components/     # React components
│   ├── lib/            # Utilities
│   └── styles/         # CSS with design tokens
└── packages/typescript-config/  # Shared TS configs
```

## Component Development Guide

### Architecture: Compound Components

All components follow the compound component pattern. This enables flexible composition:

```tsx
// ❌ Avoid monolithic APIs
<Accordion items={[{ title: '...', content: '...' }]} />

// ✅ Use composition
<Accordion>
  <AccordionItem value="1">
    <AccordionTrigger>Title</AccordionTrigger>
    <AccordionContent>Content</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Component Template

```tsx
"use client";

import { Primitive } from "@base-ui/react/primitive";
import { cn } from "@inset/ui/lib/utils";

function Root(props: Primitive.Root.Props) {
  return <Primitive.Root data-slot="component" {...props} />;
}

function Part({ className, ...props }: Primitive.Part.Props) {
  return (
    <Primitive.Part
      className={cn(
        // Base styles - use design tokens
        "rounded-lg border border-border bg-card",
        // Inset shadow - signature style
        "shadow-inner",
        // Smooth animations
        "transition-all duration-200 ease-in-out",
        // Allow overrides
        className
      )}
      data-slot="component-part"
      {...props}
    />
  );
}

export { Root as Component, Part as ComponentPart };
```

### Styling Rules

1. **Use Tailwind CSS** - No inline styles or CSS modules
2. **Use design tokens** - Colors from `global.css` variables
3. **Include transitions** - 200ms ease-in-out as default
4. **Support dark mode** - Semantic tokens handle this automatically
5. **Use `cn()` utility** - For merging classNames properly

### Design Tokens

Key variables defined in `packages/ui/styles/global.css`:

| Token                                | Usage                    |
| ------------------------------------ | ------------------------ |
| `--background` / `--foreground`      | Page background and text |
| `--card` / `--card-foreground`       | Card surfaces            |
| `--primary` / `--primary-foreground` | Primary actions          |
| `--muted` / `--muted-foreground`     | Subtle text/backgrounds  |
| `--border`                           | Border colors            |
| `--ring`                             | Focus rings              |
| `--radius-*`                         | Border radius scale      |

### Inset Style Guide

The "inset" aesthetic includes:

- **Inner shadows** - `shadow-inner`, `shadow-[inset_...]`
- **Subtle borders** - Often with alpha transparency
- **Soft backgrounds** - Using muted colors
- **Smooth transitions** - Never jarring, always refined
- **Rounded corners** - Using the radius scale

## Adding a New Component

1. **Choose a Base UI primitive** from [base-ui.com](https://base-ui.com)
2. **Create the file** at `packages/ui/components/<name>.tsx`
3. **Build compound components** following the pattern
4. **Apply inset styling** with design tokens
5. **Export from the component file**
6. **Test in the web app** by importing from `@inset/ui/<name>`

## Commands Reference

```bash
# Development
bun dev              # Start all workspaces
bun dev --filter web # Start only web app

# Building
bun build            # Build all
bun build --filter @inset/ui  # Build only UI package

# Linting
bun lint             # Lint all

# Package management (from root)
bun add <pkg> --cwd packages/ui    # Add to UI package
bun add <pkg> --cwd apps/web       # Add to web app
bun add -d <pkg> --cwd packages/ui # Add as devDependency
```

## Key Principles

1. **Learn by building** - This is a learning project, experiment freely
2. **Composition over configuration** - Compound components, not prop APIs
3. **Consistent aesthetics** - Every component should feel like it belongs
4. **Accessibility first** - Base UI provides this, don't break it
5. **Keep it simple** - No over-engineering, solve the current need
