'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'


import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = () => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 bg-black/0 hover:bg-black/40 backdrop-blur-0 hover:backdrop-blur-md border-b border-transparent hover:border-white/10" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="group">
          <div className="flex items-center gap-3">
            <Logo loading="eager" priority="high" className="w-10 h-10 invert dark:invert-0 opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col">
              <span className="text-white text-2xl font-black uppercase tracking-tighter brand-text-glow leading-none">
                OVODKOV
              </span>
              <span className="text-accent-vivid text-[10px] font-bold tracking-[0.4em] uppercase opacity-60">
                & CO • ТОЛЬКО МЕТАЛЛ
              </span>
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-16">
          {[
            { label: 'Коллекция', href: '/collection' },
            { label: 'О бренде', href: '/about' },
            { label: 'Контакты', href: '/contact' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 hover:text-accent-vivid transition-all duration-500 hover:tracking-[0.5em]"
            >
              {item.label}
            </Link>
          ))}

        </nav>
      </div>
    </header>
  )
}
