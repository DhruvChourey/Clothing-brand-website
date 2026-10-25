import { useState, type FormEvent, type ReactNode } from 'react'
import { Reveal } from '@/components/motion'
import { Page } from '@/components/Page'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Care() {
  return (
    <Page title="Customer care">
      <PageHeader
        eyebrow="We’re here to help"
        title="Customer care"
        trail={[{ label: 'Home', to: '/' }, { label: 'Customer care' }]}
      />

      <div className="gutter divide-y divide-charcoal/15 border-t border-charcoal/15 pb-32">
        <Block id="shipping" title="Shipping">
          <p>
            Shipping is complimentary on every order. Pieces are packed in recycled tissue and
            dispatched within two working days.
          </p>
          <ul className="mt-5 space-y-2">
            <li>Europe: 2–4 working days</li>
            <li>United Kingdom and North America: 3–6 working days</li>
            <li>Rest of world: 5–10 working days</li>
          </ul>
          <p className="mt-5 text-mute">
            Customs duties, where applicable, are shown at checkout in a production store.
          </p>
        </Block>

        <Block id="returns" title="Returns">
          <p>
            Returns are complimentary within 30 days of delivery. Pieces should be unworn, unwashed
            and returned with their original tags attached.
          </p>
          <p className="mt-4">
            To begin a return, write to the studio with your order reference and we will send a
            prepaid label.
          </p>
        </Block>

        <Block id="contact" title="Contact">
          <p>
            Write to{' '}
            <a href="mailto:hello@ateliernoir.example" className="link-line">
              hello@ateliernoir.example
            </a>{' '}
            or use the form. The studio replies within one working day, Monday to Friday,
            09:00–17:00 CET.
          </p>
          <ContactForm />
        </Block>

        <Block id="privacy" title="Privacy">
          <p>
            This demonstration site stores only your shopping bag, in your own browser. No
            analytics, cookies or personal data are sent to any server. A production store would
            publish its full privacy policy here.
          </p>
        </Block>

        <Block id="terms" title="Terms">
          <p>
            Sample terms of sale would appear here. No purchases can be made on this demonstration
            site.
          </p>
        </Block>

        <Block id="demo" title="About this demo">
          <p>
            Atelier Noir is a fictional label created to demonstrate design and front-end
            engineering. Names, products, prices and copy are invented. Photography is provided by
            photographers on Unsplash and used under the Unsplash licence. Checkout, newsletter and
            contact forms are simulated until a payment provider and email service are configured.
          </p>
        </Block>
      </div>
    </Page>
  )
}

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-t`}
      className="grid scroll-mt-28 gap-6 py-14 md:grid-cols-12 md:py-20"
    >
      <h2 id={`${id}-t`} className="heading text-4xl md:col-span-4 md:text-5xl">
        {title}
      </h2>
      <Reveal className="max-w-2xl text-charcoal/80 md:col-span-7 md:col-start-6">
        {children}
      </Reveal>
    </section>
  )
}

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const next: Errors = {}
    if (!values.name.trim()) next.name = 'Please tell us your name.'
    if (!EMAIL.test(values.email.trim())) next.email = 'Please enter a valid email address.'
    if (values.message.trim().length < 10) next.message = 'Please write at least a sentence.'
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setSent(true)
      setValues({ name: '', email: '', message: '' })
    }
  }

  const field = (k: keyof typeof values) => ({
    id: `c-${k}`,
    value: values[k],
    'aria-invalid': !!errors[k],
    'aria-describedby': errors[k] ? `c-${k}-err` : undefined,
    onChange: (e: { target: { value: string } }) => {
      setSent(false)
      setValues((v) => ({ ...v, [k]: e.target.value }))
    },
  })

  return (
    <form onSubmit={submit} noValidate className="mt-10 grid gap-7">
      <div>
        <Label htmlFor="c-name">Name</Label>
        <Input autoComplete="name" {...field('name')} />
        <Err id="c-name-err" message={errors.name} />
      </div>
      <div>
        <Label htmlFor="c-email">Email</Label>
        <Input type="email" autoComplete="email" {...field('email')} />
        <Err id="c-email-err" message={errors.email} />
      </div>
      <div>
        <Label htmlFor="c-message">Message</Label>
        <textarea
          rows={4}
          className="w-full resize-y border-0 border-b border-charcoal/30 bg-transparent py-3 text-base transition-colors focus:border-charcoal focus:outline-none aria-[invalid=true]:border-red-800"
          {...field('message')}
        />
        <Err id="c-message-err" message={errors.message} />
      </div>
      <div>
        <Button type="submit">Send message</Button>
        <p role="status" className="mt-4 min-h-6 text-sm">
          {sent &&
            'Thank you. This is a demonstration form — your message was validated but not sent anywhere.'}
        </p>
      </div>
    </form>
  )
}

function Err({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} role="alert" className="mt-1 text-sm text-red-800">
      {message}
    </p>
  ) : null
}
