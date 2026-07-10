'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // ブラウザ標準の自動スクロール復元を無効化し、遷移制御を一元化
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // ページ遷移（パス変更）ごとに最上部へリセットする。
  // Lenisがスクロールを制御しているため、Next.js標準のスクロールリセットが効かない問題への対処。
  // 別ページ内へのハッシュ（#section）遷移時は、そのアンカー位置を優先してトップ移動しない。
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) return
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return <>{children}</>
}
