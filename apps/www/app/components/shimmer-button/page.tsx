'use client'

import { ShimmerButton } from '@/components/demo/shimmer-button-demo'
import { ArrowBigUp, Camera, Sparkles } from 'lucide-react'
import InstallTabs from '@/components/demo/install-tabs-demo'
import { createRegistryUrl, createShadcnInstallOptions } from '@/lib/utils'
import TopCard from '@/components/top-card'
import InstallSection from '@/components/install-section-card'
import { Demo, PropsData } from '@/lib/types'
import UsageSection from '@/components/usage-section'

const registryPath = '/r/shimmer-button.json'

const demos: Demo[] = [
  {
    title: 'Default',
    description: 'A default button with a looping shimmer.',
    code: '<ShimmerButton>Get Started</ShimmerButton>',
    element: <ShimmerButton>Get Started</ShimmerButton>,
  },
  {
    title: 'With Icon',
    description: 'Pair with an icon for contextuality.',
    code: '<ShimmerButton className="gap-1.5"><Camera className="size-4" />Scan</ShimmerButton>',
    element: (
      <ShimmerButton className="gap-1.5">
        <Camera className="size-4" />
        Scan
      </ShimmerButton>
    ),
  },
  {
    title: 'Icon Only',
    description: "Or just an icon, it's fine too.",
    code: '<ShimmerButton className="gap-1.5"><ArrowBigUp className="size-4" /></ShimmerButton>',
    element: (
      <ShimmerButton className="gap-1.5">
        <ArrowBigUp className="size-4" />
      </ShimmerButton>
    ),
  },
]

const propsData: PropsData[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    defaultsTo: '—',
    description: 'Content rendered inside the button, like text or an icon.',
  },
  {
    name: 'className',
    type: 'string',
    defaultsTo: '—',
    description:
      'Utility classes for custom styles like sizing or color tweaks.',
  },
  {
    name: '...props',
    type: 'MotionProps & ButtonHTMLAttributes',
    defaultsTo: '—',
    description: 'Any extra button or Motion props (e.g., disabled, onClick).',
  },
]

const Page = () => {
  const registryUrl = createRegistryUrl(registryPath)
  const installOptions = createShadcnInstallOptions(registryUrl)

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12">
      <TopCard
        section="Component"
        name="Shimmer Button"
        description="A button component with a looping light sweep, often called as Shimmer Effect."
      >
        <ShimmerButton className="w-full justify-center px-6 py-5 text-base font-semibold">
          <Sparkles className="h-5 w-5" />
          Shimmer Effect
        </ShimmerButton>
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
