'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { siteConfig } from '@/data/site'

const makerLinks = [
  {
    href: '/rinnai',
    label: 'リンナイ',
    sub: [
      { href: '/rinnai', label: '壁掛型 給湯器' },
      { href: '/category/gas-furo', label: 'ガスふろ給湯器' },
      { href: '/category/eco-jaws', label: 'エコジョーズ' },
    ],
  },
  {
    href: '/noritz',
    label: 'ノーリツ',
    sub: [
      { href: '/noritz', label: '壁掛型 給湯器' },
      { href: '/category/gas-furo', label: 'ガスふろ給湯器' },
      { href: '/category/eco-jaws', label: 'エコジョーズ' },
    ],
  },
  {
    href: '/paloma',
    label: 'パロマ',
    sub: [
      { href: '/paloma', label: '壁掛型 給湯器' },
      { href: '/category/gas-furo', label: 'ガスふろ給湯器' },
    ],
  },
]

const navLinks = [
  { href: '/cases', label: '施工事例' },
  { href: '/area/yokohama', label: '対応エリア' },
  { href: '/guide/full-auto-auto', label: '給湯器の知識' },
  { href: '/blog', label: 'コラム' },
  { href: '/estimate', label: '無料見積もり' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md border-b border-gray-200'
          : 'bg-white border-b border-gray-200'
      }`}
    >
      {/* 上部バー：電話番号 + 営業時間 */}
      <div className="bg-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between text-xs">
          <span className="hidden sm:block text-blue-200">
            横浜市・川崎市・厚木市・海老名市の給湯器交換専門
          </span>
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-blue-200">受付 {siteConfig.hours}</span>
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-1.5 text-white font-black text-base hover:text-yellow-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>

      {/* メインヘッダー */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-[60px] gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt={siteConfig.name}
              width={340}
              height={90}
              priority
              className="h-auto w-[170px] md:w-[210px] lg:w-[240px] object-contain"
            />
          </Link>

          {/* Desktop nav — メーカーリンク */}
          <nav className="hidden lg:flex items-center gap-1 ml-2">
            {makerLinks.map((m) => (
              <div
                key={m.href}
                className="relative"
                onMouseEnter={() => setActiveDropdown(m.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={m.href}
                  className="flex items-center gap-1 text-[13px] text-gray-700 hover:text-brand-700 px-3 py-4 font-bold transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-brand-600"
                >
                  {m.label}
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <AnimatePresence>
                  {activeDropdown === m.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 bg-white border border-gray-200 shadow-lg rounded-md py-2 min-w-[180px] z-50"
                    >
                      {m.sub.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-brand-700 whitespace-nowrap"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] text-gray-700 hover:text-brand-700 px-3 py-4 font-semibold transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-brand-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right CTA */}
          <div className="hidden lg:flex items-center gap-2 ml-auto flex-shrink-0">
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white font-bold text-sm px-4 py-2 rounded transition-colors"
              style={{ backgroundColor: '#00B900' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.07 9.437-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              LINE相談
            </a>
            <Link
              href="/estimate"
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-4 py-2 rounded transition-colors shadow"
            >
              無料見積もり
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 ml-auto lg:hidden">
            <a href={siteConfig.phoneHref} aria-label="電話する" className="text-brand-900">
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
            className="lg:hidden overflow-hidden bg-white border-t border-gray-200"
          >
            <nav className="max-w-7xl mx-auto px-4 py-3">
              {/* メーカー */}
              <div className="mb-2">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-1">メーカーで探す</div>
                <div className="grid grid-cols-3 gap-2">
                  {makerLinks.map((m) => (
                    <Link
                      key={m.href}
                      href={m.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center text-sm font-bold text-brand-900 bg-blue-50 rounded py-2 border border-blue-100"
                    >
                      {m.label}
                    </Link>
                  ))}
                </div>
              </div>
              {/* その他 */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-gray-700 text-sm py-3 border-b border-gray-100 last:border-0"
                >
                  {link.label}
                  <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
              <div className="pt-3 mt-1 flex flex-col gap-2">
                <Link
                  href="/estimate"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 bg-red-600 text-white font-bold text-sm py-3 rounded"
                >
                  無料見積もりを依頼する
                </Link>
                <a
                  href={siteConfig.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 text-white font-bold text-sm py-3 rounded"
                  style={{ backgroundColor: '#00B900' }}
                >
                  LINEで無料相談
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
