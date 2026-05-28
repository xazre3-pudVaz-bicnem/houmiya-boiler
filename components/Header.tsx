'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { href: '#reasons', label: '選ばれる理由' },
  { href: '#products', label: '給湯器を探す' },
  { href: '#cases', label: '施工事例' },
  { href: '#area', label: '対応エリア' },
  { href: '#faq', label: 'よくある質問' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/96 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_20px_rgba(0,0,0,0.06)]'
          : 'bg-white/70 backdrop-blur-sm border-b border-white/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center h-[72px] md:h-[80px]">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 mr-10">
            <Image
              src="/logo.svg"
              alt="株式会社宝宮設備"
              width={340}
              height={90}
              priority
              unoptimized
              className="h-auto w-[180px] md:w-[220px] lg:w-[260px] object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] text-slate-600 hover:text-brand-900 px-4 py-2 transition-colors duration-200 whitespace-nowrap font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right: estimate CTA + phone */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
            <Link
              href="/estimate"
              className="hidden lg:flex items-center gap-1.5 bg-brand-900 hover:bg-brand-800 text-white font-bold text-[12px] px-5 py-2.5 rounded transition-colors tracking-wide"
            >
              無料見積もり
            </Link>
            <a href="tel:046-205-4558" className="flex items-center gap-3 group">
              <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <div>
                <div className="text-[10px] text-slate-400 leading-none">受付 9:00–18:00（年中無休）</div>
                <div className="font-black text-[17px] text-brand-900 group-hover:text-coral-600 transition-colors duration-200 leading-tight tracking-wide">
                  046-205-4558
                </div>
              </div>
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 ml-auto md:hidden">
            <a href="tel:046-205-4558" aria-label="電話する" className="text-coral-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
              className="p-1 text-brand-900"
            >
              {isOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white border-t border-slate-100"
          >
            <nav className="max-w-7xl mx-auto px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-slate-700 text-sm py-3.5 border-b border-slate-50 last:border-0 font-medium"
                >
                  {link.label}
                  <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
              <div className="pt-4 mt-2 flex flex-col gap-3">
                <Link
                  href="/estimate"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 bg-brand-900 text-white font-bold text-sm py-3 rounded"
                >
                  無料スピード見積もり
                </Link>
                <a href="tel:046-205-4558" className="flex items-center gap-2 text-brand-900 font-bold text-sm">
                  <svg className="w-4 h-4 text-coral-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  046-205-4558
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
