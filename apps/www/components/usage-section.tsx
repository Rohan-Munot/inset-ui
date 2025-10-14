import React from 'react'
import CodeBlock from './code-block'
import { Demo } from '@/lib/types'
import { cn } from '@/lib/utils'

const UsageSection = ({
  demos,
  className,
}: {
  demos: Demo[]
  className?: string
}) => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-white">Usage</h2>
      </div>
      <div className={cn('grid grid-cols-3 gap-6', className)}>
        {demos.map((demo) => (
          <div
            key={demo.title}
            className="group relative flex flex-col justify-between gap-5 overflow-hidden rounded-[18px] border border-white/10 bg-neutral-950/80 p-6 shadow-[0_14px_40px_-30px_rgba(0,0,0,0.9)] transition duration-300 ease-in-out hover:shadow-[0_20px_45px_-30px_rgba(69,69,69,1)]"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium text-white">{demo.title}</h3>
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
  )
}

export default UsageSection
