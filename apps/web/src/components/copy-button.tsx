'use client';

import * as React from 'react';
import { cn } from '@inset/ui/lib/utils';
import { IconCopy, IconCheck } from '@tabler/icons-react';

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  src?: string;
}

function CopyButton({ value, src, className, ...props }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [value]);

  return (
    <button
      type="button"
      data-slot="copy-button"
      data-copied={copied ? 'true' : 'false'}
      className={cn(
        'bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground border-border absolute top-2 right-2 z-10 flex size-7 items-center justify-center rounded-md border backdrop-blur-sm transition-colors',
        'data-[copied=true]:text-green-500',
        className
      )}
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      {...props}
    >
      {copied ? (
        <IconCheck width={14} height={14} stroke={2} />
      ) : (
        <IconCopy width={14} height={14} stroke={2} />
      )}
    </button>
  );
}

export { CopyButton };
