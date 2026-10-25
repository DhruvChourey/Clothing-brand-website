import type Lenis from 'lenis'

let instance: Lenis | null = null

export const getLenis = () => instance
export const setLenis = (l: Lenis | null) => {
  instance = l
}

/** Pause / resume smooth scrolling while an overlay owns the scroll. */
export const lockScroll = (locked: boolean) => {
  if (!instance) return
  if (locked) instance.stop()
  else instance.start()
}
