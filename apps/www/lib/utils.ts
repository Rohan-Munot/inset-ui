import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface InstallOption {
  id: string
  label: string
  command: string
}

export function createRegistryUrl(registryPath: string): string {
  const registryDomain = (
    process.env.NEXT_PUBLIC_REGISTRY_DOMAIN as string
  ).replace(/\/$/, '')
  return `${registryDomain}${registryPath}`
}

export function createShadcnInstallOptions(
  registryUrl: string
): InstallOption[] {
  return [
    {
      id: 'pnpm',
      label: 'pnpm',
      command: `pnpm dlx shadcn@latest add ${registryUrl}`,
    },
    {
      id: 'npm',
      label: 'npm',
      command: `npx shadcn@latest add ${registryUrl}`,
    },
    {
      id: 'yarn',
      label: 'yarn',
      command: `yarn shadcn@latest add ${registryUrl}`,
    },
    {
      id: 'bun',
      label: 'bun',
      command: `bunx --bun shadcn@latest add ${registryUrl}`,
    },
  ]
}
