'use client'
import { usePathname } from 'next/navigation'
import React from 'react'

const NotFound = () => {
  const pathname = usePathname()
  return (
    <div className="flex-1 rounded-s-xs rounded-e-2xl bg-neutral-900 p-4 shadow-[inset_0_2px_7px_0_rgba(255,255,255,0.08)]">
      Not Found {pathname}
    </div>
  )
}

export default NotFound
