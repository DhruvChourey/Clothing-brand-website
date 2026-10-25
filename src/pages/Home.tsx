import { Page } from '@/components/Page'
import { Campaign } from '@/components/home/Campaign'
import { CollectionEditorial } from '@/components/home/Collection'
import { Hero } from '@/components/home/Hero'
import { JournalSection } from '@/components/home/JournalSection'
import { NewsletterSection } from '@/components/home/NewsletterSection'
import { Philosophy } from '@/components/home/Philosophy'
import { ShopSection } from '@/components/home/ShopSection'

export default function Home() {
  return (
    <Page>
      <Hero />
      <CollectionEditorial />
      <ShopSection />
      <Campaign />
      <Philosophy />
      <JournalSection />
      <NewsletterSection />
    </Page>
  )
}
