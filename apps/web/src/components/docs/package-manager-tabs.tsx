'use client';

import { useState, type ReactNode } from 'react';

interface PackageManagerTabsProps {
  npm?: ReactNode;
  yarn?: ReactNode;
  pnpm?: ReactNode;
  bun?: ReactNode;
}

export function PackageManagerTabs({ npm, yarn, pnpm, bun }: PackageManagerTabsProps) {
  const packageManagers = [
    { id: 'npm' as const, label: 'npm', content: npm },
    { id: 'yarn' as const, label: 'Yarn', content: yarn },
    { id: 'pnpm' as const, label: 'pnpm', content: pnpm },
    { id: 'bun' as const, label: 'Bun', content: bun },
  ].filter(
    (pm): pm is { id: 'npm' | 'yarn' | 'pnpm' | 'bun'; label: string; content: ReactNode } =>
      pm.content != null
  );

  const [activeTab, setActiveTab] = useState(packageManagers[0]?.id || 'npm');
  const activeContent = packageManagers.find((pm) => pm.id === activeTab)?.content;

  return (
    <div className="my-4">
      <div className="border-border bg-muted flex items-center gap-1 rounded-t-lg border-x border-t px-2 py-1">
        {packageManagers.map((pm) => (
          <button
            key={pm.id}
            className="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground rounded-md px-3 py-1 text-xs font-medium transition-colors"
            data-active={pm.id === activeTab}
            onClick={() => setActiveTab(pm.id)}
            type="button"
          >
            {pm.label}
          </button>
        ))}
      </div>
      <div className="border-border overflow-hidden rounded-b-lg border [&>figure]:rounded-none [&>figure]:border-none">
        {activeContent}
      </div>
    </div>
  );
}
