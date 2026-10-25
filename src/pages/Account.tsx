import { Link } from 'react-router-dom'
import { Page } from '@/components/Page'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'

export default function Account() {
  return (
    <Page title="Account">
      <PageHeader
        eyebrow="Your account"
        title="Account"
        trail={[{ label: 'Home', to: '/' }, { label: 'Account' }]}
      />
      <section className="gutter pb-32">
        <div className="max-w-xl border-y border-charcoal/15 py-12">
          <h2 className="heading text-4xl">Accounts are not enabled in this demo.</h2>
          <p className="mt-5 text-charcoal/75">
            No sign-in or password is collected here. Your bag is kept in this browser only, so you
            can shop as a guest. A production build would connect an identity provider and order
            history to this page.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild>
              <Link to="/shop">Continue shopping</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/care#contact">Contact the studio</Link>
            </Button>
          </div>
        </div>
      </section>
    </Page>
  )
}
