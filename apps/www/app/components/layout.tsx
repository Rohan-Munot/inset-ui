import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 overflow-y-auto rounded-s-xs rounded-e-xl bg-neutral-900 p-8 shadow-[inset_0_2px_7px_0_rgba(255,255,255,0.08)] backdrop-blur-sm [scrollbar-width:none]">
      {children}
    </div>
  )
}

export default Layout
