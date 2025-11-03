'use client'

import { CheckboxComponent } from '@/components/demo/checkbox-demo'
import InstallTabs from '@/components/demo/install-tabs-demo'
import { createRegistryUrl, createShadcnInstallOptions } from '@/lib/utils'
import TopCard from '@/components/top-card'
import InstallSection from '@/components/install-section-card'
import { Demo, PropsData } from '@/lib/types'
import UsageSection from '@/components/usage-section'

const registryPath = '/r/checkbox.json'

const demos: Demo[] = [
  {
    title: 'Default',
    description: 'Default checkbox behavior.',
    code: '<CheckboxComponent />',
    element: <CheckboxComponent />,
  },
  {
    title: 'With Label',
    description: (
      <>
        Can be paired with a label. Though checkout{' '}
        <a
          href="/components/checkbox-label"
          className="text-sky-400/80 underline transition-colors hover:text-sky-400"
        >
          Checkbox Label
        </a>
        .
      </>
    ),
    code: `<div className="flex items-center space-x-2">
  <CheckboxComponent id="terms" />
  <label htmlFor="terms" className="text-sm text-white/80">
    Accept terms and conditions
  </label>
</div>`,
    element: (
      <div className="flex items-center space-x-2">
        <CheckboxComponent id="terms" />
        <label htmlFor="terms" className="text-sm text-white/80">
          Accept terms and conditions
        </label>
      </div>
    ),
  },
  {
    title: 'Disabled State',
    description: 'Non-interactive state for read-only or unavailable options.',
    code: '<CheckboxComponent disabled />',
    element: <CheckboxComponent disabled />,
  },
]

const propsData: PropsData[] = [
  {
    name: 'className',
    type: 'string',
    defaultsTo: '—',
    description:
      'Utility classes for further tweaking appearance, spacing, or layout.',
  },
  {
    name: '...props',
    type: 'React.ComponentProps<typeof CheckboxPrimitive.Root>',
    defaultsTo: '—',
    description:
      'All props from Radix UI CheckboxPrimitive.Root including checked, disabled, onCheckedChange, etc.',
  },
]

const Page = () => {
  const registryUrl = createRegistryUrl(registryPath)
  const installOptions = createShadcnInstallOptions(registryUrl)

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12">
      <TopCard
        section="Component"
        name="Checkbox"
        description="Accessible checkbox with custom styling, focus states. Built on top of Radix UI primitives."
      >
        <div className="flex items-center space-x-2">
          <CheckboxComponent />
        </div>
      </TopCard>
      <InstallSection>
        <InstallTabs options={installOptions} />
      </InstallSection>
      <UsageSection demos={demos} />

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
    </div>
  )
}

export default Page
