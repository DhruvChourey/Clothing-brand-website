import { ArrowRight } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { cn } from '@/lib/utils'

type Status =
  { kind: 'idle' } | { kind: 'error'; message: string } | { kind: 'success'; demo: boolean }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
/** Set VITE_NEWSLETTER_ENDPOINT to a URL that accepts `POST {"email": "..."}` to go live. */
const ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT as string | undefined

export function NewsletterForm({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [busy, setBusy] = useState(false)
  const id = useId()
  const msgId = `${id}-msg`

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const value = email.trim()
    if (!value) return setStatus({ kind: 'error', message: 'Please enter your email address.' })
    if (!EMAIL.test(value))
      return setStatus({ kind: 'error', message: 'That email address doesn’t look right.' })

    setBusy(true)
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: value }),
        })
        if (!res.ok) throw new Error(String(res.status))
        setStatus({ kind: 'success', demo: false })
      } else {
        await new Promise((r) => setTimeout(r, 600))
        setStatus({ kind: 'success', demo: true })
      }
      setEmail('')
    } catch {
      setStatus({
        kind: 'error',
        message: 'We couldn’t subscribe you just now. Please try again shortly.',
      })
    } finally {
      setBusy(false)
    }
  }

  const invalid = status.kind === 'error'
  const ok = status.kind === 'success'

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <label htmlFor={id} className="label">
        Email address
      </label>
      <div
        className={cn(
          'mt-2 flex items-center border-b',
          invalid ? 'border-red-700' : 'border-current/50',
        )}
      >
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status.kind !== 'idle') setStatus({ kind: 'idle' })
          }}
          placeholder="you@example.com"
          aria-invalid={invalid}
          aria-describedby={msgId}
          className={cn(
            'h-14 w-full bg-transparent text-lg focus:outline-none',
            tone === 'dark' ? 'placeholder:text-ivory/40' : 'placeholder:text-charcoal/40',
          )}
        />
        <button
          type="submit"
          disabled={busy}
          aria-label="Subscribe"
          className="label flex h-14 shrink-0 items-center gap-3 pl-4 transition-opacity hover:opacity-60 disabled:opacity-40"
        >
          <span className="hidden sm:inline">{busy ? 'Sending' : 'Subscribe'}</span>
          <ArrowRight className="size-4" strokeWidth={1.25} />
        </button>
      </div>
      <p
        id={msgId}
        role={invalid ? 'alert' : 'status'}
        className={cn(
          'mt-3 min-h-6 text-sm',
          invalid && (tone === 'dark' ? 'text-red-300' : 'text-red-800'),
        )}
      >
        {invalid && status.message}
        {ok &&
          (status.demo
            ? 'Thank you. This is a demonstration site — your address was validated but not stored or sent anywhere.'
            : 'Thank you. You’re on the list.')}
      </p>
    </form>
  )
}
