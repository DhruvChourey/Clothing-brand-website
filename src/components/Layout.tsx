import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { SmoothScroll } from '@/lib/lenis'
import { Footer } from './Footer'
import { AnnouncementBar, Header } from './Header'
import { Overlays } from './Overlays'
import { Preloader } from './Preloader'

export function Layout() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <a
        href="#main"
        className="label fixed left-4 top-4 z-[300] -translate-y-24 bg-charcoal px-4 py-3 text-ivory focus:translate-y-0"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<div className="min-h-[70svh]" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Overlays />
    </>
  )
}
