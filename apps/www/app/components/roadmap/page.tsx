'use client'

import Roadmap from '@/components/demo/roadmap-demo'
import { Target, Zap, Shield } from 'lucide-react'
import InstallTabs from '@/components/demo/install-tabs-demo'
import { createRegistryUrl, createShadcnInstallOptions } from '@/lib/utils'
import TopCard from '@/components/top-card'
import InstallSection from '@/components/install-section-card'
import { Demo, PropsData } from '@/lib/types'
import UsageSection from '@/components/usage-section'
import CodeBlock from '@/components/code-block'

const registryPath = '/r/roadmap.json'

const sampleRoadmapSteps = [
  {
    title: 'Foundation',
    text_1: 'Q1 2024',
    text_2: 'Planning',
    card_contents: (
      <div className="bg-muted/30 rounded-b-xl p-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="size-4 text-blue-500" />
            <span className="text-xs font-medium">Project Setup</span>
          </div>
          <p className="text-muted-foreground text-xs">
            Establish infrastructure for the product development cycle.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'Development',
    text_1: 'Q2 2024',
    text_2: 'Building',
    card_contents: (
      <div className="bg-muted/30 rounded-b-xl p-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-green-500" />
            <span className="text-xs font-medium">Core Features</span>
          </div>
          <p className="text-muted-foreground text-xs">
            Implement essential functionality and user interface components.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'Testing',
    text_1: 'Q3 2024',
    text_2: 'Quality',
    card_contents: (
      <div className="bg-muted/30 rounded-b-xl p-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-purple-500" />
            <span className="text-xs font-medium">QA Process</span>
          </div>
          <p className="text-muted-foreground text-xs">
            Comprehensive testing and bug fixes to ensure product stability.
          </p>
        </div>
      </div>
    ),
  },
]

const demos: Demo[] = [
  {
    title: 'Product roadmap',
    description:
      'Interactive timeline showing project phases with expandable details.',
    code: `<Roadmap roadmapSteps={roadmapSteps} />`,
    element: <Roadmap roadmapSteps={sampleRoadmapSteps} />,
  },
]

const propsData: PropsData[] = [
  {
    name: 'roadmapSteps',
    type: 'Array<RoadmapStep>',
    defaultsTo: '—',
    description:
      'Array of roadmap step objects containing title, text, and content.',
  },
]

const Page = () => {
  const registryUrl = createRegistryUrl(registryPath)
  const installOptions = createShadcnInstallOptions(registryUrl)

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12">
      <TopCard
        section="Component"
        name="Roadmap"
        description="An interactive roadmap timeline with expandable cards."
      ></TopCard>
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
          <h2 className="text-2xl font-semibold text-white">Data Structure</h2>
          <p className="text-sm text-white/60">
            The RoadmapStep interface defines the structure for timeline data.
          </p>
        </div>
        <div className="overflow-hidden rounded-[18px] border border-white/10 bg-neutral-950/80 shadow-[0_16px_45px_-35px_rgba(0,0,0,0.75)]">
          <div className="p-6">
            <CodeBlock language="typescript">{`interface RoadmapStep {
  title: string
  text_1: string
  text_2: string
  card_contents: React.ReactNode
}

interface RoadmapProps {
  roadmapSteps: RoadmapStep[]
}`}</CodeBlock>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page
