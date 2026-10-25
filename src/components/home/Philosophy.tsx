import { DrawLine, MaskImage, Reveal, SplitReveal } from '../motion'

const PRINCIPLES = [
  {
    title: 'Material',
    body: 'We buy cloth from a short list of European mills and return to them each year. Fibres are chosen for how they will age, not how they photograph.',
  },
  {
    title: 'Making',
    body: 'Garments are cut and sewn in small runs by ateliers we visit in person. The inside of a seam is finished as carefully as the outside.',
  },
  {
    title: 'Design',
    body: 'A piece enters the collection only when nothing more can be taken away. Silhouettes change slowly; proportion and cloth do the work.',
  },
  {
    title: 'Longevity',
    body: 'Spare buttons, generous seam allowances and care guidance with every piece — so a garment can be worn for decades rather than seasons.',
  },
]

export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="gutter bg-paper py-24 md:py-40">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="label flex items-center gap-4 text-mute">
                <span>03</span>
                <span className="h-px w-10 bg-gold" />
                <span>Philosophy</span>
              </p>
            </Reveal>
            <SplitReveal as="h2" className="heading mt-6 text-[clamp(3rem,6vw,6rem)]">
              <span id="philosophy-title">
                Made slowly. <em className="font-light italic">Worn for years.</em>
              </span>
            </SplitReveal>
            <div className="mt-12 hidden max-w-[22rem] lg:block">
              <MaskImage
                photo="stackedKnits"
                ratio="aspect-[4/5]"
                sizes="24vw"
                maxWidth={1200}
                parallax={4}
              />
              <p className="label mt-3 text-mute">Cashmere, folded by weight and tone</p>
            </div>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title}>
              <DrawLine />
              <Reveal className="grid grid-cols-[3rem_1fr] gap-4 py-10 md:grid-cols-[4.5rem_1fr] md:py-14">
                <span className="label pt-2 text-mute">0{i + 1}</span>
                <div>
                  <h3 className="heading text-4xl md:text-5xl">{p.title}</h3>
                  <p className="mt-4 max-w-md text-charcoal/75">{p.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
          <li aria-hidden>
            <DrawLine />
          </li>
        </ol>
      </div>
    </section>
  )
}
