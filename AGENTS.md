# Agents Guide

This document provides context for AI agents and assistants working with the Inset UI codebase.

## Project Overview

**Inset UI** is a personal learning project for building reusable React components using [Base UI](https://base-ui.com/) as unstyled primitives. The name "Inset" reflects the design philosophy: components feature inner shadows, smooth animations, and a refined, tactile aesthetic.

## Tech Stack

| Layer                     | Technology               |
| ------------------------- | ------------------------ |
| Runtime & Package Manager | Bun (>=1.3.1)            |
| Monorepo Orchestration    | Turborepo                |
| Framework                 | Next.js 16 (React 19)    |
| Styling                   | Tailwind CSS v4          |
| Primitives                | Base UI (@base-ui/react) |
| Linting/Formatting        | Biome                    |

## Monorepo Structure

```
inset-ui/
├── apps/
│   └── web/                    # Next.js documentation/demo app
│       └── src/
│           ├── app/            # Next.js App Router
│           └── components/     # App-specific components
├── packages/
│   ├── ui/                     # @inset/ui - Component library
│   │   ├── components/         # All reusable components
│   │   ├── lib/                # Utilities (cn, etc.)
│   │   └── styles/             # global.css with design tokens
│   └── typescript-config/      # Shared TypeScript configs
└── turbo.json
```

## Commands

Always use Bun. Never use npm, pnpm, yarn, or Node.js.

```bash
# Install all dependencies
bun install

# Install package in specific workspace (from root)
bun add <package> --cwd apps/web
bun add <package> --cwd packages/ui

# Development
bun dev

# Build
bun build

# Lint
bun lint
```

## Component Architecture

### Compound Component Pattern (REQUIRED)

Every component MUST follow the compound component pattern with strict composition. This means:

1. **Root component** - Container that manages state/context
2. **Sub-components** - Composable parts that work together
3. **No monolithic APIs** - Avoid prop drilling, prefer composition

### Example Pattern

```tsx
"use client";

import { ComponentPrimitive } from "@base-ui/react/component";
import { cn } from "@inset/ui/lib/utils";

// Root component
function Component(props: ComponentPrimitive.Root.Props) {
  return <ComponentPrimitive.Root data-slot="component" {...props} />;
}

// Sub-components
function ComponentItem({ className, ...props }: ComponentPrimitive.Item.Props) {
  return (
    <ComponentPrimitive.Item
      className={cn("base-styles", className)}
      data-slot="component-item"
      {...props}
    />
  );
}

// Named exports for composition
export { Component, ComponentItem };
```

### Component Requirements

1. **"use client"** directive at the top for interactive components
2. **Import from Base UI** - Use `@base-ui/react/<component>` primitives
3. **Use `cn()` utility** - Import from `@inset/ui/lib/utils` for className merging
4. **data-slot attribute** - Add to each component for identification
5. **Spread props** - Always spread remaining props to the primitive
6. **Allow className override** - Merge with `cn(defaultStyles, className)`

## Styling Guidelines

### Design Philosophy

- **Inner shadows (inset)** - The signature style
- **Smooth animations** - Subtle, refined transitions (200ms ease-in-out typical)
- **Tactile feel** - Components should feel physical and responsive

### CSS Requirements

1. **Use global.css tokens** - Never hardcode colors, always use CSS variables
2. **Tailwind classes only** - No inline styles, no CSS modules
3. **Dark mode support** - Use semantic color tokens that adapt automatically

### Available Design Tokens

From `packages/ui/styles/global.css`:

```css
/* Colors - Use these, they adapt to light/dark */
--background, --foreground
--card, --card-foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive, --destructive-foreground
--success, --success-foreground
--warning, --warning-foreground
--info, --info-foreground
--border, --input, --ring

/* Radius */
--radius-sm, --radius-md, --radius-lg, --radius-xl

/* Use in Tailwind as: */
bg-background, text-foreground, border-border, rounded-lg, etc.
```

### Animation Standards

```tsx
// Typical transition classes
"transition-all duration-200 ease-in-out";
"transition-transform duration-200 ease-in-out";
"transition-[height] duration-200 ease-in-out";

// For collapsible/expandable content (Base UI pattern)
"data-ending-style:h-0 data-starting-style:h-0";
```

## File Conventions

| File              | Location                  | Purpose                     |
| ----------------- | ------------------------- | --------------------------- |
| `<component>.tsx` | `packages/ui/components/` | Component implementation    |
| `utils.ts`        | `packages/ui/lib/`        | Shared utilities            |
| `global.css`      | `packages/ui/styles/`     | Design tokens & base styles |

## Import Patterns

### In the UI package

```tsx
import { cn } from "@inset/ui/lib/utils";
import { SomePrimitive } from "@base-ui/react/some-primitive";
```

### In the web app (consuming components)

```tsx
import { Component, ComponentItem } from "@inset/ui/component";
import "@inset/ui/global.css"; // In layout.tsx only
```

## Do's and Don'ts

### ✅ Do

- Use Base UI primitives as the foundation
- Follow compound component architecture
- Use semantic color tokens from global.css
- Add smooth transitions (200ms default)
- Include `data-slot` attributes
- Support className overrides
- Keep components accessible (Base UI handles most of this)

### ❌ Don't

- Create monolithic components with many props
- Hardcode colors or values
- Skip the `cn()` utility for classNames
- Use npm, pnpm, or yarn (use Bun)
- Add unnecessary abstractions
- Ignore dark mode support

## Creating a New Component

1. Create `packages/ui/components/<component-name>.tsx`
2. Import the corresponding Base UI primitive
3. Build compound components following the pattern above
4. Use design tokens from global.css
5. Export all sub-components for composition
6. Test in `apps/web` by importing from `@inset/ui/<component-name>`
