'use client';

import * as React from 'react';
import { cn } from '@inset/ui/lib/utils';
import { CopyButton } from './copy-button';

interface CodeBlockCommandProps {
  __npm__: string;
  __yarn__: string;
  __pnpm__: string;
  __bun__: string;
}

type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

const packageManagerLabels: Record<PackageManager, string> = {
  npm: 'npm',
  yarn: 'yarn',
  pnpm: 'pnpm',
  bun: 'bun',
};

function CodeBlockCommand({ __npm__, __yarn__, __pnpm__, __bun__ }: CodeBlockCommandProps) {
  const [activeTab, setActiveTab] = React.useState<PackageManager>('bun');

  const commands: Record<PackageManager, string> = {
    npm: __npm__,
    yarn: __yarn__,
    pnpm: __pnpm__,
    bun: __bun__,
  };

  const currentCommand = commands[activeTab];

  return (
    <div data-slot="code-block-command" className="relative my-4">
      <div className="flex items-center gap-2 border-b border-border px-4 pb-2">
        {(Object.keys(commands) as PackageManager[]).map((pm) => (
          <button
            key={pm}
            type="button"
            onClick={() => setActiveTab(pm)}
            className={cn(
              'text-sm font-medium transition-colors',
              activeTab === pm
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {packageManagerLabels[pm]}
          </button>
        ))}
      </div>
      <div className="relative">
        <CopyButton value={currentCommand} className="right-2 top-2" />
        <pre className="overflow-x-auto bg-muted/50 p-4">
          <code className="text-sm">{currentCommand}</code>
        </pre>
      </div>
    </div>
  );
}

export { CodeBlockCommand };
