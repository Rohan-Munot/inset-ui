'use client'

import { useMemo, useState } from 'react'
import PinList from '@/components/demo/pin-list/pin-list'
import { initialTaskList } from '@/lib/pin-list-data'
import CodeBlock from '@/components/code-block'

const registryPath = '/r/pin-list.json'

const demos = [
  {
    title: 'Task management',
    description:
      'Interactive task list with pinning functionality and smooth animations.',
    code: `<PinList taskList={taskList} />`,
    element: <PinList taskList={initialTaskList} />,
  },
]

const propsData = [
  {
    name: 'taskList',
    type: 'TaskList',
    defaultsTo: '—',
    description:
      'Object containing the task list data with tasks array and metadata.',
  },
]

const Page = () => {
  const registryDomain = (
    process.env.NEXT_PUBLIC_REGISTRY_DOMAIN || 'https://inset-ui.com'
  ).replace(/\/$/, '')
  const registryUrl = `${registryDomain}${registryPath}`

  const installOptions = useMemo(
    () => [
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
    ],
    [registryUrl]
  )

  const [activeManager, setActiveManager] = useState(
    installOptions[0]?.id ?? 'pnpm'
  )
  const activeCommand =
    installOptions.find((option) => option.id === activeManager)?.command ??
    installOptions[0]?.command ??
    ''

  return (
    <div className="shadow-[inset_0_2px_7px_0_rgba(255,255, 255,0.08)] flex-1 overflow-y-auto rounded-s-xs rounded-e-xl bg-neutral-900 p-8 backdrop-blur-lg [scrollbar-width:none]">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12">
        <header className="relative overflow-hidden rounded-[18px] border border-white/10 bg-gradient-to-br from-neutral-950 via-neutral-900/70 to-neutral-950 px-8 py-10 shadow-[0_24px_70px_-35px_rgba(0,0,0,0.65)] sm:px-12 sm:py-12 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,360px)] md:items-center md:gap-12">
          <div
            aria-hidden
            className="absolute inset-y-0 -right-2 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(150,150,150,0.18),transparent_55%)] md:block"
          />
          <div className="relative flex flex-col gap-6">
            <span className="text-xs tracking-[0.35em] text-white/50 uppercase">
              Component
            </span>
            <div className="space-y-3">
              <h1 className="text-4xl leading-tight font-semibold text-white">
                Pin List
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-white/70">
                A pin-able task list with animated transitions, priority
                management, and team collaboration features.
              </p>
            </div>
          </div>
          <div className="relative mt-10 grid place-items-center md:mt-0">
            <div
              aria-hidden
              className="absolute inset-0 rounded-[18px] bg-gradient-to-br from-white/15 via-white/5 to-transparent blur-2xl"
            />
            <div className="relative flex w-full max-w-sm flex-col items-center gap-6 rounded-[18px] border border-white/10 bg-neutral-950/80 p-8 text-center shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)] backdrop-blur">
              <div className="flex h-max w-full flex-col gap-4 overflow-y-auto">
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
              </div>
            </div>
          </div>
        </header>

        <section className="relative overflow-hidden rounded-[18px] border border-white/10 bg-neutral-950/80 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.7)]">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
          <div className="grid gap-6 p-8 sm:p-10">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-white">
                Installation
              </h2>
              <p className="max-w-2xl text-sm text-white/60">
                Install directly from the registry using your preferred package
                manager.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-1.5">
                {installOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setActiveManager(option.id)}
                    className={`rounded-sm border p-1 px-1.5 text-xs transition-colors ${
                      option.id === activeManager
                        ? 'bg-white/10 text-white shadow-[0_12px_30px_-20px_rgba(167,139,250,0.6)]'
                        : 'border-white/10 bg-white/5 text-white/60 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="rounded-xl border border-white/10 bg-black/60 p-3">
                <CodeBlock language="bash">{activeCommand}</CodeBlock>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-white">Usage</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-1">
            {demos.map((demo) => (
              <div
                key={demo.title}
                className="group relative flex flex-col justify-between gap-5 overflow-hidden rounded-[18px] border border-white/10 bg-neutral-950/80 p-6 shadow-[0_14px_40px_-30px_rgba(0,0,0,0.9)] transition duration-300 ease-in-out hover:shadow-[0_20px_45px_-30px_rgba(69,69,69,1)]"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-medium text-white">
                    {demo.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    {demo.description}
                  </p>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-4">
                    <div className="flex h-96 w-full items-center justify-center overflow-hidden">
                      <div className="h-full w-full max-w-md overflow-y-auto">
                        {demo.element}
                      </div>
                    </div>
                  </div>
                  <CodeBlock language="jsx">{demo.code}</CodeBlock>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-white">Props</h2>
            <p className="text-sm text-white/60">
              Comprehensive task management with pinning, animations, and team
              collaboration features.
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
