import React from 'react'

const InstallSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative overflow-hidden rounded-[18px] border border-white/10 bg-neutral-950/80 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.7)]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
      <div className="grid gap-6 p-8 sm:p-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-white">Installation</h2>
        </div>
        {children}
      </div>
    </section>
  )
}

export default InstallSection
