import { prefersReducedMotion } from './utils'

/**
 * Coordinates the first-visit reveal with the hero timeline. The loader plays once per session,
 * on the home page only; otherwise the hero starts immediately.
 */
const KEY = 'an-intro-seen'

const seen = () => {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export const shouldPlayIntro =
  typeof window !== 'undefined' &&
  window.location.pathname === '/' &&
  !seen() &&
  !prefersReducedMotion()

let done = !shouldPlayIntro
const waiting = new Set<() => void>()

export function finishIntro() {
  done = true
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    /* storage unavailable — the intro simply replays next visit */
  }
  waiting.forEach((cb) => cb())
  waiting.clear()
}

/** Run `cb` once the loader has lifted (immediately if it already has). Returns a canceller. */
export function whenIntroDone(cb: () => void) {
  if (done) {
    cb()
    return () => {}
  }
  waiting.add(cb)
  return () => waiting.delete(cb)
}

// Failsafe: never leave the hero waiting if the loader timeline is interrupted.
if (shouldPlayIntro) window.setTimeout(finishIntro, 6000)
