'use client'

import SimpleButton from '@/components/demo/button-demo'
import { ArrowRight, Camera, Sparkles } from 'lucide-react'
import InstallTabs from '@/components/demo/install-tabs-demo'
import { createRegistryUrl, createShadcnInstallOptions } from '@/lib/utils'
import TopCard from '@/components/top-card'
import InstallSection from '@/components/install-section-card'
import { Demo, PropsData } from '@/lib/types'
import UsageSection from '@/components/usage-section'

const registryPath = '/r/simple-button.json'

const demos: Demo[] = [
  {
    title: 'Default CTA',
    description: 'Polished gradients and subtle depth for everyday actions.',
    code: '<SimpleButton>Launch</SimpleButton>',
    element: <SimpleButton>Launch</SimpleButton>,
  },
  {
    title: 'Icon with copy',
    description: 'Pair it with an icon for contextual affordance.',
    code: '<SimpleButton className="gap-2"><Camera className="size-4" />Capture</SimpleButton>',
    element: (
      <SimpleButton className="gap-2">
        <Camera className="size-4" />
        Capture
      </SimpleButton>
    ),
  },
  {
    title: 'Icon only',
    description: 'Compact expressive action using the icon size variant.',
    code: '<SimpleButton size="icon"><Sparkles className="size-4" /></SimpleButton>',
    element: (
      <SimpleButton size="icon">
        <Sparkles className="size-4" />
      </SimpleButton>
    ),
  },
]

const propsData: PropsData[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    defaultsTo: '—',
    description:
      'Any content inside the button such as text, icons, or custom elements.',
  },
  {
    name: 'className',
    type: 'string',
    defaultsTo: '—',
    description:
      'Utility classes for further tweaking spacing, color, or layout.',
  },
  {
    name: 'size',
    type: "'default' | 'sm' | 'lg' | 'icon'",
    defaultsTo: 'default',
    description:
      'Preset sizing variants that adjust height, padding, and icon spacing.',
  },
  {
    name: '...props',
    type: 'React.ButtonHTMLAttributes<HTMLButtonElement>',
    defaultsTo: '—',
    description:
      'Native button props such as type, disabled, onClick, and accessibility hooks.',
  },
]

const Page = () => {
  const registryUrl = createRegistryUrl(registryPath)
  const installOptions = createShadcnInstallOptions(registryUrl)
  return (
    <div className="shadow-[inset_0_2px_7px_0_rgba(255,255, 255,0.08)] flex-1 overflow-y-auto rounded-s-xs rounded-e-xl bg-neutral-900 p-8 backdrop-blur-lg [scrollbar-width:none]">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12">
        <TopCard
          section="Component"
          name="Simple Button"
          description="A versatile button with soft gradients, tactile depth, and crisp focus states that adapts to most UI surfaces."
        >
          <SimpleButton className="w-full justify-center px-6 py-5 text-base font-semibold">
            Quick Start
            <ArrowRight className="h-5 w-5" />
          </SimpleButton>
        </TopCard>
        <InstallSection>
          <InstallTabs options={installOptions} />
        </InstallSection>
        <UsageSection demos={demos} />

        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-white">Props</h2>
            <p className="text-sm text-white/60">
              Designed to stay flexible with native button props and the size
              variants you expect.
            </p>
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
    </div>
  )
}

export default Page
