import { Link } from 'react-router-dom'
import { Wordmark } from './Wordmark'

const COLS: { title: string; links: { label: string; to: string; external?: boolean }[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', to: '/shop?new=1' },
      { label: 'Clothing', to: '/shop' },
      { label: 'Collections', to: '/collections' },
      { label: 'Journal', to: '/journal' },
    ],
  },
  {
    title: 'Customer care',
    links: [
      { label: 'Shipping', to: '/care#shipping' },
      { label: 'Returns', to: '/care#returns' },
      { label: 'Contact', to: '/care#contact' },
      { label: 'Account', to: '/account' },
    ],
  },
  {
    title: 'Follow',
    links: [
      { label: 'Instagram', to: 'https://www.instagram.com/', external: true },
      { label: 'Pinterest', to: 'https://www.pinterest.com/', external: true },
      { label: 'YouTube', to: 'https://www.youtube.com/', external: true },
    ],
  },
]

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="on-dark bg-ink text-ivory">
      <div className="gutter pb-8 pt-20 md:pt-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label text-ivory/60">Atelier Noir</p>
            <h2 className="heading mt-4 max-w-md text-4xl md:text-5xl">
              Clothing made slowly, for <em className="font-light italic">years</em> of wearing.
            </h2>
            <p className="mt-8 max-w-sm text-ivory/70">
              Questions about a piece, a fitting or an order? Write to the studio — we reply within
              one working day.
            </p>
            <a
              href="mailto:hello@ateliernoir.example"
              className="heading link-line mt-4 inline-block text-2xl"
            >
              hello@ateliernoir.example
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {COLS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="label text-ivory/60">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.external ? (
                        <a
                          href={l.to}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-line"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link to={l.to} className="link-line">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div className="col-span-2 sm:col-span-3">
              <p className="label text-ivory/60">Studio hours</p>
              <p className="mt-5 text-ivory/85">Monday – Friday, 09:00 – 17:00 CET</p>
            </div>
          </div>
        </div>

        <p
          aria-hidden
          className="display mt-24 select-none whitespace-nowrap text-center text-[clamp(2.6rem,10.5vw,12rem)] uppercase tracking-[0.06em] text-ivory/90"
        >
          Atelier Noir
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t border-ivory/15 pt-6 text-sm text-ivory/60 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <Wordmark className="!text-[0.8rem] text-ivory" />
            <span>© {YEAR} Atelier Noir</span>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link to="/care#privacy" className="link-line">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/care#terms" className="link-line">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/care#demo" className="link-line">
                About this demo
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
