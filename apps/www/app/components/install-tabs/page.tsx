'use client'

import InstallTabs from '@/components/demo/install-tabs-demo'
import { createRegistryUrl, createShadcnInstallOptions } from '@/lib/utils'
import TopCard from '@/components/top-card'
import InstallSection from '@/components/install-section-card'
import { Demo, PropsData } from '@/lib/types'
import UsageSection from '@/components/usage-section'

const registryPath = '/r/install-tabs.json'

const demos: Demo[] = [
  {
    title: 'Package Manager Selection',
    code: `const installOptions = [
  { id: 'npm', label: 'npm', command: 'npm install ' },
  { id: 'pnpm', label: 'pnpm', command: 'pnpm add ' },
  { id: 'yarn', label: 'yarn', command: 'yarn add ' },
]

<InstallTabs options={installOptions} />`,
    element: (
      <InstallTabs
        options={[
          { id: 'npm', label: 'npm', command: 'npm install ' },
          { id: 'pnpm', label: 'pnpm', command: 'pnpm add ' },
          { id: 'yarn', label: 'yarn', command: 'yarn add ' },
        ]}
      />
    ),
  },
]

const propsData: PropsData[] = [
  {
    name: 'options',
    type: 'InstallOption[]',
    defaultsTo: '—',
    description:
      'Array of installation options with id, label, and command properties.',
  },
]

const installOptionPropsData: PropsData[] = [
  {
    name: 'id',
    type: 'string',
    defaultsTo: '—',
    description:
      'Unique identifier for the option, used for state management and localStorage.',
  },
  {
    name: 'label',
    type: 'string',
    defaultsTo: '—',
    description: 'Display text shown on the tab button.',
  },
  {
    name: 'command',
    type: 'string',
    defaultsTo: '—',
    description:
      'Command string displayed in the code block when the option is active.',
  },
]

const Page = () => {
  const registryUrl = createRegistryUrl(registryPath)
  const installOptions = createShadcnInstallOptions(registryUrl)
  return (
    <div className="flex-1 overflow-y-auto rounded-s-xs rounded-e-xl bg-neutral-900 p-8 shadow-[inset_0_2px_7px_0_rgba(255,255,255,0.08)] backdrop-blur-sm [scrollbar-width:none]">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12">
        <TopCard
          section="Component"
          name="Install Tabs"
          description="Interactive tabs for switching between different installation methods. Also persists the selected option."
        >
          <InstallTabs
            options={[
              {
                id: 'npm',
                label: 'npm',
                command: 'npm install ',
              },
              {
                id: 'pnpm',
                label: 'pnpm',
                command: 'pnpm add ',
              },
            ]}
          />
        </TopCard>
        <InstallSection>
          <InstallTabs options={installOptions} />
        </InstallSection>
        <UsageSection demos={demos} className="grid-cols-1" />

        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-white">Props</h2>
          </div>
          <div className="overflow-hidden rounded-[18px] border border-white/10 bg-neutral-950/80 shadow-[0_16px_45px_-35px_rgba(0,0,0,0.75)]">
            <table className="min-w-full border-collapse text-left text-sm text-white/80">
              <thead className="bg-white/5 text-xs tracking-[0.3em] text-white/50 uppercase">
                <tr>
                  <th className="px-6 py-4 font-medium">Prop</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Default</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {propsData.map((prop) => (
                  <tr key={prop.name} className="align-top">
                    <td className="px-6 py-4 font-mono text-sm text-violet-200">
                      {prop.name}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-sky-200">
                      {prop.type}
                    </td>
                    <td className="px-6 py-4 text-xs tracking-[0.2em] text-white/40 uppercase">
                      {prop.defaultsTo}
                    </td>
                    <td className="px-6 py-4 text-sm leading-relaxed text-white/70">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-white">
              InstallOption Interface
            </h2>
            <p className="text-sm text-white/60">
              Structure for individual installation options within the options
              array.
            </p>
          </div>
          <div className="overflow-hidden rounded-[18px] border border-white/10 bg-neutral-950/80 shadow-[0_16px_45px_-35px_rgba(0,0,0,0.75)]">
            <table className="min-w-full border-collapse text-left text-sm text-white/80">
              <thead className="bg-white/5 text-xs tracking-[0.3em] text-white/50 uppercase">
                <tr>
                  <th className="px-6 py-4 font-medium">Property</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Default</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {installOptionPropsData.map((prop) => (
                  <tr key={prop.name} className="align-top">
                    <td className="px-6 py-4 font-mono text-sm text-violet-200">
                      {prop.name}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-sky-200">
                      {prop.type}
                    </td>
                    <td className="px-6 py-4 text-xs tracking-[0.2em] text-white/40 uppercase">
                      {prop.defaultsTo}
                    </td>
                    <td className="px-6 py-4 text-sm leading-relaxed text-white/70">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Page
