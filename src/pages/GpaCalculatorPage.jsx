import { useEffect } from 'react'
import GpaCalculator from '../components/calculators/GpaCalculator'
import { PageHero, FaqItem, RelatedTools, SeoContent } from '../components/calculators/SeoLayout'
import SaveCalculation from '../components/SaveCalculation'

export default function GpaCalculatorPage() {
  useEffect(() => {
    document.title = 'GPA Calculator — Calculate Grade Point Average (4.0 Scale) | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Calculate your GPA on the 4.0 scale. Add courses, credits, and letter grades to see your cumulative grade point average instantly.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'How is GPA calculated?', a: 'GPA is the credit-weighted average of grade points. Each course contributes (credits × grade points), and the total is divided by the total credits.' },
    { q: 'What grade point values are used?', a: 'Standard US 4.0 scale: A+/A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, F = 0.0.' },
    { q: 'How is a weighted GPA different?', a: 'Weighted GPA gives extra points for Honors (+0.5) or AP/IB (+1.0) courses. This calculator uses the unweighted 4.0 scale.' },
    { q: 'Can I calculate my semester GPA?', a: 'Yes. Enter only the courses from one semester to see the semester GPA. Or enter all courses across multiple terms for the cumulative GPA.' },
    { q: 'How do I raise my GPA?', a: 'Retaking courses with low grades usually helps most — replacing an F or D with an A moves your GPA significantly. Adding high-credit courses with A grades also moves the needle.' },
    { q: 'Does this work for high school and college?', a: 'Yes. The 4.0 unweighted scale applies to both. For weighted high school GPA or specific university systems, adjust the grade point values manually.' },
  ]

  const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  const APP_SCHEMA = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'GPA Calculator', description: 'Calculate grade point average on the 4.0 scale with credits and letter grades.', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', url: 'https://timegovern.com/gpa-calculator', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_SCHEMA) }} />

      <PageHero
        eyebrow="Free Tool"
        title="GPA Calculator"
        subtitle="Calculate your grade point average on the 4.0 scale — add courses with credits and letter grades to see your cumulative GPA instantly."
        gradient="from-blue-500 via-indigo-500 to-violet-500"
      />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="gpa" title="GPA Calculator" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-10">
        <GpaCalculator />
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-border bg-card">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Grade scale (4.0)</div>
            <ul className="text-xs space-y-1 text-muted-foreground font-mono">
              <li>A+/A → 4.0</li>
              <li>A- → 3.7</li>
              <li>B+ → 3.3</li>
              <li>B → 3.0</li>
              <li>B- → 2.7</li>
              <li>C+ → 2.3</li>
              <li>C → 2.0</li>
              <li>D → 1.0</li>
              <li>F → 0.0</li>
            </ul>
          </div>
        </div>
      </div>

      <SeoContent title="How to calculate GPA">
        <p>Grade Point Average (GPA) is the credit-weighted average of your grades. Each course contributes its credits multiplied by its grade point value. Divide the total grade points by the total credits to get your GPA.</p>
        <p>Example: two courses — Course A (3 credits, grade A = 4.0) and Course B (4 credits, grade B = 3.0). Grade points = (3 × 4.0) + (4 × 3.0) = 12 + 12 = 24. Total credits = 7. GPA = 24 / 7 = 3.43.</p>
        <p>This calculator uses the standard US 4.0 unweighted scale. For weighted high school GPA (with Honors and AP bonuses), adjust the grade point values manually before entering.</p>
      </SeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedTools items={[
          { name: 'Percentage Calculator', href: '/percentage-calculator' },
          { name: 'Average Calculator', href: '/average-calculator' },
          { name: 'Standard Deviation', href: '/standard-deviation-calculator' },
          { name: 'All Calculators', href: '/calculators' },
        ]} />
      </section>
    </div>
  )
}