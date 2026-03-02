'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
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
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-black/0 hover:bg-black/40 backdrop-blur-0 hover:backdrop-blur-md border-b border-transparent hover:border-white/10" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="group">
          <div className="flex items-center gap-3">
            <Logo loading="eager" priority="high" className="w-10 h-10 invert dark:invert-0 opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="text-white text-xs font-medium tracking-[0.3em] uppercase hidden sm:block">
              Industrial Division
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-16">
          {['Коллекция', 'О бренде', 'Контакты'].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 hover:text-accent-vivid transition-all duration-500 hover:tracking-[0.5em]"
            >
              {item}
            </Link>
          ))}

          {/* Hidden Admin Link for Developer Access */}
          <Link
            href="/admin"
            className="opacity-0 hover:opacity-10 text-[8px] text-white/20 uppercase tracking-[0.3em] ml-4 transition-opacity cursor-default hover:cursor-pointer"
          >
            Terminal
          </Link>
        </nav>
      </div>
    </header>
  )
}
