import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <div className={clsx('flex items-center', className)}>
      <span className="text-white text-2xl font-black uppercase tracking-tighter brand-text-glow leading-none">
        OVODKOV & AI Lab
      </span>
    </div>
  )
}
