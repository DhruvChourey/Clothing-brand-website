import { Link } from 'react-router-dom'
import { Page } from '@/components/Page'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <Page title="Not found">
      <section className="gutter grid min-h-[60svh] place-content-center py-24 text-center">
        <p className="label text-mute">Error 404</p>
        <h1 className="display mt-5 text-[clamp(3.5rem,10vw,9rem)]">
          Nothing <em className="font-light italic">here</em>.
        </h1>
        <p className="mx-auto mt-6 max-w-sm text-charcoal/75">
          The page you were looking for has moved, or never existed.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button asChild>
            <Link to="/">Return home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/shop">Shop clothing</Link>
          </Button>
        </div>
      </section>
    </Page>
  )
}
