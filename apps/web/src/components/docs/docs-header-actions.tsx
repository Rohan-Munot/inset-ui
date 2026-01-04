'use client';

import { useState, useEffect } from 'react';
import { DocsHeaderSearchTrigger, DocsHeaderThemeToggle } from './docs-header';
import { DocsSearch } from './docs-search';
import { useDocsContext } from './docs-layout';

export function DocsHeaderActions() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { tree } = useDocsContext();

  // Handle ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <DocsHeaderSearchTrigger onClick={() => setSearchOpen(true)} />
      <DocsHeaderThemeToggle />
      {searchOpen && <DocsSearch tree={tree} onClose={() => setSearchOpen(false)} />}
    </>
  );
}
