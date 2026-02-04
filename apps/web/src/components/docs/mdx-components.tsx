import Image from 'next/image';
import Link from 'next/link';
import type { ComponentProps, HTMLAttributes, ReactNode } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@inset/ui/accordion';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@inset/ui/alert-dialog';
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompleteRow,
  AutocompleteSeparator,
  AutocompleteStatus,
  AutocompleteTrigger,
} from '@inset/ui/autocomplete';
import { Avatar, AvatarFallback, AvatarImage } from '@inset/ui/avatar';
import { Badge } from '@inset/ui/badge';
import { Button } from '@inset/ui/button';
import { Checkbox } from '@inset/ui/checkbox';
import { CheckboxGroup } from '@inset/ui/checkbox-group';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@inset/ui/collapsible';
import {
  Combobox,
  ComboboxChips,
  ComboboxChip,
  ComboboxClear,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxRow,
  ComboboxSeparator,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxValue,
} from '@inset/ui/combobox';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from '@inset/ui/drawer';
import { Input } from '@inset/ui/input';
import { Label } from '@inset/ui/label';
import { ScrollArea, ScrollBar } from '@inset/ui/scroll-area';
import { cn } from '@inset/ui/lib/utils';

import { ComponentPreview } from '@/components/component-preview';

export const mdxComponents = {
  h1: ({ className, ...props }: ComponentProps<'h1'>) => (
    <h1
      className={cn('scroll-m-28 text-3xl font-semibold tracking-tight md:text-4xl', className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ComponentProps<'h2'>) => (
    <h2 className={cn('scroll-m-28 text-xl font-semibold tracking-tight', className)} {...props} />
  ),
  h3: ({ className, ...props }: ComponentProps<'h3'>) => (
    <h3 className={cn('scroll-m-28 text-lg font-semibold tracking-tight', className)} {...props} />
  ),
  h4: ({ className, ...props }: ComponentProps<'h4'>) => (
    <h4 className={cn('scroll-m-28 text-base font-semibold', className)} {...props} />
  ),
  h5: ({ className, ...props }: ComponentProps<'h5'>) => (
    <h5 className={cn('scroll-m-28 text-sm font-semibold', className)} {...props} />
  ),
  h6: ({ className, ...props }: ComponentProps<'h6'>) => (
    <h6 className={cn('scroll-m-28 text-sm font-semibold', className)} {...props} />
  ),
  a: ({ className, ...props }: ComponentProps<'a'>) => (
    <a
      className={cn(
        'decoration-border hover:decoration-foreground font-medium underline underline-offset-4 transition-colors',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentProps<'p'>) => (
    <p className={cn('text-foreground/90 leading-7', className)} {...props} />
  ),
  strong: ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
    <strong className={cn('font-semibold', className)} {...props} />
  ),
  ul: ({ className, ...props }: ComponentProps<'ul'>) => (
    <ul className={cn('my-6 ml-6 list-disc space-y-2', className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentProps<'ol'>) => (
    <ol className={cn('my-6 ml-6 list-decimal space-y-2', className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentProps<'li'>) => (
    <li className={cn('marker:text-foreground/60 pl-2 leading-7', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentProps<'blockquote'>) => (
    <blockquote
      className={cn('border-foreground/60 border-l-2 pl-6 italic', className)}
      {...props}
    />
  ),
  hr: ({ ...props }: ComponentProps<'hr'>) => (
    <hr className="border-border/40 my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: ComponentProps<'table'>) => (
    <div className="border-border my-6 w-full overflow-x-auto rounded-lg border">
      <table
        className={cn('w-full text-sm [&_tbody_tr:last-child]:border-b-0', className)}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: ComponentProps<'tr'>) => (
    <tr className={cn('border-b', className)} {...props} />
  ),
  th: ({ className, ...props }: ComponentProps<'th'>) => (
    <th
      className={cn(
        'px-4 py-2 text-left font-semibold [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentProps<'td'>) => (
    <td
      className={cn(
        'px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentProps<'pre'>) => (
    <pre
      className={cn(
        'no-scrollbar bg-card border-border overflow-x-auto rounded-xl border p-4',
        className
      )}
      {...props}
    />
  ),
  code: ({ className, children, ...props }: ComponentProps<'code'>) => (
    <code
      className={cn(
        'relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.85em] font-medium break-words',
        className
      )}
      {...props}
    >
      {children}
    </code>
  ),
  Image: ({ src, className, width, height, alt, ...props }: ComponentProps<'img'>) => (
    <Image
      alt={alt || ''}
      className={cn('border-border rounded-md border', className)}
      height={Number(height)}
      src={(src as string) || ''}
      width={Number(width)}
      {...props}
    />
  ),
  Link: ({ className, ...props }: ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        'decoration-border hover:decoration-foreground font-medium underline underline-offset-4 transition-colors',
        className
      )}
      {...props}
    />
  ),
  ComponentPreview,
  Button,
  Badge,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
  Autocomplete,
  AutocompleteInput,
  AutocompleteTrigger,
  AutocompleteClear,
  AutocompleteList,
  AutocompletePopup,
  AutocompleteStatus,
  AutocompleteEmpty,
  AutocompleteCollection,
  AutocompleteRow,
  AutocompleteItem,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteSeparator,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Checkbox,
  CheckboxGroup,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Combobox,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxClear,
  ComboboxPopup,
  ComboboxItem,
  ComboboxSeparator,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxEmpty,
  ComboboxList,
  ComboboxValue,
  ComboboxStatus,
  ComboboxRow,
  ComboboxCollection,
  ComboboxChips,
  ComboboxChip,
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerClose,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  Input,
  Label,
  ScrollArea,
  ScrollBar,
};
