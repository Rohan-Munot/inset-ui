'use client'

import PinList from '@/components/demo/pin-list-demo'
import { initialTaskList } from '@/lib/pin-list-data'
import InstallTabs from '@/components/demo/install-tabs-demo'
import { createRegistryUrl, createShadcnInstallOptions } from '@/lib/utils'
import TopCard from '@/components/top-card'
import InstallSection from '@/components/install-section-card'
import { Demo, PropsData } from '@/lib/types'
import UsageSection from '@/components/usage-section'
import CodeBlock from '@/components/code-block'

const registryPath = '/r/pin-list.json'

const demos: Demo[] = [
  {
    title: 'Task List',
    description:
      'Interactive task list with pinning functionality and smooth animations.',
    code: `<PinList taskList={taskList} />`,
    element: <PinList taskList={initialTaskList} />,
  },
]

const propsData: PropsData[] = [
  {
    name: 'taskList',
    type: 'TaskList',
    defaultsTo: '—',
    description:
      'Object containing the task list data with tasks array and metadata.',
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
          name="Pin List"
          description="A pin-able list with animations."
          className="p-4"
        >
          <PinList
            taskList={{
              id: 'demo-header',
              title: 'Demo Tasks',
              summary: 'Sample tasks for demonstration',
              tasks: [
                {
                  id: 'demo-header-1',
                  title: 'Task-1',
                  description: 'Task description',
                  stage: 'In progress',
                  due: 'Due tomorrow',
                  pinned: true,
                  owner: {
                    name: 'Rohan',
                    role: 'Manager',
                  },
                },
              ],
            }}
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
              Data Structure
            </h2>
            <p className="text-sm text-white/60">
              The TaskList interface defines the structure for task management
              data.
            </p>
          </div>
          <div className="overflow-hidden rounded-[18px] border border-white/10 bg-neutral-950/80 shadow-[0_16px_45px_-35px_rgba(0,0,0,0.75)]">
            <div className="p-6">
              <CodeBlock language="typescript">{`interface TaskList {
  id: string
  title: string
  summary: string
  tasks: Task[]
}

interface Task {
  id: string
  title: string
  description: string
  stage: string
  due: string
  pinned: boolean
  owner?: TaskOwner
}

interface TaskOwner {
  name: string
  initials: string
  role?: string
}`}</CodeBlock>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Page
