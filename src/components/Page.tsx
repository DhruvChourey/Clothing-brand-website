import { useEffect, useRef, type ReactNode } from 'react'
import { DUR, EASE, gsap, ScrollTrigger, useMotion } from '@/lib/motion'

/** Route wrapper: sets the document title, fades the page in and refreshes scroll triggers. */
export function Page({
  title,
  children,
  className,
}: {
  title?: string
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = title ? `${title} — Atelier Noir` : 'Atelier Noir — Form, in its purest state'
  }, [title])

  useMotion(
    () => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: DUR.base, ease: EASE.soft, clearProps: 'transform,opacity' },
      )
    },
    { scope: ref },
  )

  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 150)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
