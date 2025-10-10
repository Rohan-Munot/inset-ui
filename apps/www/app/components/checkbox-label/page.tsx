'use client'

import CheckboxLabel from '@/components/demo/checkbox-label-demo'
import CodeBlock from '@/components/code-block'
import InstallTabs from '@/components/demo/install-tabs-demo'
import { createRegistryUrl, createShadcnInstallOptions } from '@/lib/utils'

const registryPath = '/r/checkbox-label.json'

const demos = [
  {
    title: 'Default',
    description:
      'Checkbox with label for better accessibility and user experience.',
    code: '<CheckboxLabel id="terms" text="Accept terms and conditions" />',
    element: <CheckboxLabel id="terms" text="Accept terms and conditions" />,
  },
  {
    title: 'Strike Variant',
    description:
      'Animated strike-through effect when checked for visual feedback.',
    code: '<CheckboxLabel id="completed" text="Mark as completed" variants="strike" />',
    element: (
      <CheckboxLabel
        id="completed"
        text="Mark as completed"
        variants="strike"
      />
    ),
  },
  {
    title: 'Disabled State',
    description: 'Non-interactive state for read-only or unavailable options.',
    code: '<CheckboxLabel id="disabled" text="Cannot be changed" disabled />',
    element: <CheckboxLabel id="disabled" text="Cannot be changed" disabled />,
  },
]

const propsData = [
  {
    name: 'id',
    type: 'string',
    defaultsTo: '—',
    description:
      'Unique identifier for the checkbox, used for accessibility and form submission.',
  },
  {
    name: 'text',
    type: 'string',
    defaultsTo: '—',
    description: 'The label text displayed next to the checkbox.',
  },
  {
    name: 'className',
    type: 'string',
    defaultsTo: '—',
    description:
      'Utility classes for further tweaking appearance, spacing, or layout.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultsTo: 'false',
    description: 'Whether the checkbox is disabled and non-interactive.',
  },
  {
    name: 'variants',
    type: "'strike' | 'default'",
    defaultsTo: 'default',
    description:
      'Visual variant of the label. Strike adds animated strike-through when checked.',
  },
  {
    name: '...labelProps',
    type: 'React.ComponentProps<typeof Label>',
    defaultsTo: '—',
    description: 'Additional props passed to the underlying Label component.',
  },
]

const Page = () => {
  const registryUrl = createRegistryUrl(registryPath)
  const installOptions = createShadcnInstallOptions(registryUrl)

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
                Checkbox Label
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-white/70">
                A checkbox component with integrated label, animated variants,
                and built-in accessibility features for better user experience.
              </p>
            </div>
          </div>
          <div className="relative mt-10 grid place-items-center md:mt-0">
            <div
              aria-hidden
              className="absolute inset-0 rounded-[18px] bg-gradient-to-br from-white/15 via-white/5 to-transparent blur-2xl"
            />
            <div className="relative flex w-full max-w-sm flex-col items-center gap-6 rounded-[18px] border border-white/10 bg-neutral-950/80 p-8 text-center shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)] backdrop-blur">
              <CheckboxLabel id="hero-demo" text="Enable notifications" />
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
            </div>
            <InstallTabs options={installOptions} />
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-white">Usage</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
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
                    <div className="flex items-center justify-center">
                      {demo.element}
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
              Built with internal state management and animated variants for
              enhanced user interaction feedback.
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
