import React from 'react'

interface TopCardProps {
  section: string
  name: string
  description: string
  children?: React.ReactNode
}

const TopCard = ({ section, name, description, children }: TopCardProps) => {
  return (
    <header className="relative overflow-hidden rounded-[18px] border border-white/10 bg-gradient-to-br from-neutral-950 via-neutral-900/70 to-neutral-950 px-8 py-10 shadow-[0_24px_70px_-35px_rgba(0,0,0,0.65)] sm:px-12 sm:py-12 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,360px)] md:items-center md:gap-12">
      {children && (
        <div
          aria-hidden
          className="absolute inset-y-0 -right-2 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(150,150,150,0.18),transparent_55%)] md:block"
        />
      )}
      <div className="relative flex flex-col gap-6">
        <span className="text-xs tracking-[0.35em] text-white/50 uppercase">
          {section}
        </span>
        <div className="space-y-3">
          <h1 className="text-4xl leading-tight font-semibold text-white">
            {name}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-white/70">
            {description}
          </p>
        </div>
      </div>
      {children && (
        <div className="relative mt-10 grid place-items-center md:mt-0">
          <div
            aria-hidden
            className="absolute inset-0 rounded-[18px] bg-gradient-to-br from-white/15 via-white/5 to-transparent blur-2xl"
          />
          <div className="relative flex w-full max-w-sm flex-col items-center gap-6 rounded-[18px] border border-white/10 bg-neutral-950/80 p-8 text-center shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)] backdrop-blur">
            {children}
          </div>
        </div>
      )}
    </header>
  )
}

export default TopCard
