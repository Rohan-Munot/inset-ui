'use client';

import type * as PageTree from 'fumadocs-core/page-tree';
import { createContext, useContext, useState, type ReactNode } from 'react';

// Context for sharing state across docs components
interface DocsContextValue {
  tree: PageTree.Root;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const DocsContext = createContext<DocsContextValue | null>(null);

export function useDocsContext() {
  const context = useContext(DocsContext);
  if (!context) throw new Error('useDocsContext must be used within DocsLayout');
  return context;
}

// Props for DocsLayout
interface DocsLayoutProps {
  tree: PageTree.Root;
  children: ReactNode;
}

export function DocsLayout({ tree, children }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DocsContext.Provider value={{ tree, sidebarOpen, setSidebarOpen }}>
      {children}
    </DocsContext.Provider>
  );
}
