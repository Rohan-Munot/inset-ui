'use client'

import LikeSaveCard from '@/components/demo/like-save-card-demo'
import { Camera, Video } from 'lucide-react'
import { ImageIcon } from '@phosphor-icons/react'
import InstallTabs from '@/components/demo/install-tabs-demo'
import { createRegistryUrl, createShadcnInstallOptions } from '@/lib/utils'
import TopCard from '@/components/top-card'
import InstallSection from '@/components/install-section-card'
import { Demo, PropsData } from '@/lib/types'
import UsageSection from '@/components/usage-section'
const registryPath = '/r/like-save-card.json'

const demos: Demo[] = [
  {
    title: 'Default card',
    description:
      'Clean social action card with animated like and save controls.',
    code: `<LikeSaveCard>
  <div className="flex flex-col items-center gap-2 text-muted-foreground">
    <ImageIcon className="size-8" />
    <span className="text-sm">Image placeholder</span>
  </div>
</LikeSaveCard>`,
    element: (
      <LikeSaveCard>
        <div className="text-muted-foreground flex flex-col items-center gap-2">
          <ImageIcon className="size-8" />
          <span className="text-sm">Image placeholder</span>
        </div>
      </LikeSaveCard>
    ),
  },
  {
    title: 'Video content',
    description:
      'Perfect for showcasing video content with engagement metrics.',
    code: `<LikeSaveCard>
  <div className="flex flex-col items-center gap-2 text-muted-foreground">
    <Video className="size-8" />
    <span className="text-sm">Video placeholder</span>
  </div>
</LikeSaveCard>`,
    element: (
      <LikeSaveCard>
        <div className="text-muted-foreground flex flex-col items-center gap-2">
          <Video className="size-8" />
          <span className="text-sm">Video placeholder</span>
        </div>
      </LikeSaveCard>
    ),
  },
]

const propsData: PropsData[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    defaultsTo: '—',
    description:
      'Content displayed in the card area (images, text, icons, etc.).',
  },
  {
    name: 'className',
    type: 'string',
    defaultsTo: '—',
    description: 'Additional className for the card.',
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
          name="Like & Save Card"
          description="A social action card with animated like and save controls."
        >
          <LikeSaveCard className="border-border relative border shadow-[0_20px_40px_-40px_rgba(60,60,60,0.5)] backdrop-blur">
            <div className="text-muted-foreground flex flex-col items-center gap-2">
              <Camera className="size-8" />
              <span className="text-sm">Demo content</span>
            </div>
          </LikeSaveCard>
        </TopCard>
        <InstallSection>
          <InstallTabs options={installOptions} />
        </InstallSection>
        <UsageSection demos={demos} className="grid-cols-1" />

        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-white">Props</h2>
            <p className="text-sm text-white/60">
              Simple props interface with flexible content area for any React
              children.
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
