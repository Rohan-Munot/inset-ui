'use client'

import { useState, useEffect } from 'react'
import StatefulButton from '@/components/demo/stateful-button-demo'
import InstallTabs from '@/components/demo/install-tabs-demo'
import { createRegistryUrl, createShadcnInstallOptions } from '@/lib/utils'
import TopCard from '@/components/top-card'
import InstallSection from '@/components/install-section-card'
import { Demo, PropsData } from '@/lib/types'
import UsageSection from '@/components/usage-section'

const registryPath = '/r/stateful-button.json'

const demos: Demo[] = [
  {
    title: 'Default',
    description: 'Default behavior of the button',
    code: '<StatefulButton>Deploy</StatefulButton>',
    element: <StatefulButton>Deploy</StatefulButton>,
  },
  {
    title: 'Loading',
    description: 'Progress feedback using loading state.',
    code: '<StatefulButton state="loading" loadingText="Processing" />',
    element: (
      <StatefulButton state="loading" loadingText="Processing"></StatefulButton>
    ),
  },
  {
    title: 'Success',
    description: 'Success feedback using success state.',
    code: '<StatefulButton state="success" successText="Done" />',
    element: (
      <StatefulButton state="success" successText="Done"></StatefulButton>
    ),
  },
  {
    title: 'Error',
    description: 'Error feedback using error state.',
    code: '<StatefulButton state="error" errorText="Error" />',
    element: <StatefulButton state="error" errorText="Error"></StatefulButton>,
  },
  {
    title: 'Warning',
    description: 'Warning feedback using warning state.',
    code: '<StatefulButton state="warning" warningText="Warning" />',
    element: (
      <StatefulButton state="warning" warningText="Warning"></StatefulButton>
    ),
  },
]

const propsData: PropsData[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    defaultsTo: '—',
    description: 'Content rendered in the default state (text, icons, etc.).',
  },
  {
    name: 'className',
    type: 'string',
    defaultsTo: '—',
    description: 'Utility classes for fine-tuning spacing, color, or layout.',
  },
  {
    name: 'size',
    type: "'default' | 'sm' | 'lg' | 'icon'",
    defaultsTo: 'default',
    description: 'Preset size variants that adjust height, padding, and gap.',
  },
  {
    name: 'state',
    type: "'default' | 'loading' | 'success' | 'error' | 'disabled' | 'warning'",
    defaultsTo: 'default',
    description:
      'Controls gradient theme, motion feedback, and overrides button content.',
  },
  {
    name: 'loadingText',
    type: 'string',
    defaultsTo: 'Loading',
    description: 'Message displayed while in the loading state.',
  },
  {
    name: 'successText',
    type: 'string',
    defaultsTo: 'Success',
    description: 'Message displayed while in the success state.',
  },
  {
    name: 'errorText',
    type: 'string',
    defaultsTo: 'Error',
    description: 'Message displayed while in the error state.',
  },
  {
    name: 'warningText',
    type: 'string',
    defaultsTo: 'Warning',
    description: 'Message displayed while in the warning state.',
  },
  {
    name: '...props',
    type: 'MotionProps & React.ButtonHTMLAttributes<HTMLButtonElement>',
    defaultsTo: '—',
    description:
      'All extra motion and native button attributes, including disabled.',
  },
]

const Page = () => {
  const registryUrl = createRegistryUrl(registryPath)
  const installOptions = createShadcnInstallOptions(registryUrl)

  // State cycling for main demo button
  const [currentDemoState, setCurrentDemoState] = useState<
    'default' | 'loading' | 'success' | 'error' | 'warning'
  >('default')
  const states: Array<'default' | 'loading' | 'success' | 'error' | 'warning'> =
    ['default', 'loading', 'success', 'error', 'warning']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemoState((prev) => {
        const currentIndex = states.indexOf(prev)
        const nextIndex = (currentIndex + 1) % states.length
        return states[nextIndex]
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex-1 overflow-y-auto rounded-s-xs rounded-e-xl bg-neutral-900 p-8 shadow-[inset_0_2px_7px_0_rgba(255,255,255,0.08)] backdrop-blur-sm [scrollbar-width:none]">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12">
        <TopCard
          section="Component"
          name="Stateful Button"
          description="Button component with built-in state visualizations."
        >
          <StatefulButton
            className="justify-center text-base font-semibold"
            state={currentDemoState}
            loadingText="Processing"
            successText="Success"
            errorText="Error"
            warningText="Warning"
          >
            Deploy
          </StatefulButton>
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
    </div>
  )
}

export default Page
