import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, GraduationCap, Lightbulb } from 'lucide-react'
import ShareButtons from '../components/ShareButtons'
import { setPageMeta } from '../lib/seo'

const FAQ = [
  { q: 'How is GPA calculated?', a: 'GPA is the credit-weighted average of your grades. Multiply each course grade point by its credit hours, sum them, then divide by total credits.' },
  { q: 'What is a good GPA?', a: 'On the 4.0 scale: 3.5-4.0 is excellent (top 15%), 3.0-3.5 is good, 2.5-3.0 is average, below 2.5 is at risk. Many graduate programs require 3.0 minimum.' },
  { q: 'What is the difference between weighted and unweighted GPA?', a: 'Unweighted GPA uses the standard 4.0 scale for all courses. Weighted GPA gives extra points for Honors (+0.5) or AP/IB (+1.0) courses, often pushing the max to 5.0.' },
  { q: 'How do I calculate my cumulative GPA?', a: 'Include all courses you have taken so far. Add every (credit × grade point) value together, then divide by total credits. Each course counts once, weighted by its credit hours.' },
  { q: 'Can I raise my GPA after a bad semester?', a: 'Yes. Retaking courses replaces low grades at most universities. Adding high-credit A-graded courses also pulls the average up — the effect depends on total credits accumulated.' },
  { q: 'How do I convert letter grades to grade points?', a: 'On the 4.0 scale: A+/A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, C− = 1.7, D+ = 1.3, D = 1.0, F = 0.0.' },
]

const FAQ_SCHEMA = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
const ARTICLE_SCHEMA = { '@context': 'https://schema.org', '@type': 'Article', headline: 'How to Calculate GPA (4.0 Scale Explained)', datePublished: '2026-10-04', dateModified: '2026-10-04', author: { '@type': 'Organization', name: 'TimeGovern' }, publisher: { '@type': 'Organization', name: 'TimeGovern', logo: { '@type': 'ImageObject', url: 'https://timegovern.com/icon-512.png' } }, image: 'https://timegovern.com/icon-512.png', mainEntityOfPage: 'https://timegovern.com/blog/how-to-calculate-gpa' }
const BREADCRUMB_SCHEMA = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timegovern.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://timegovern.com/blog' }, { '@type': 'ListItem', position: 3, name: 'How to Calculate GPA', item: 'https://timegovern.com/blog/how-to-calculate-gpa' }] }

const GRADE_SCALE = [
  { letter: 'A+', points: 4.0 }, { letter: 'A', points: 4.0 }, { letter: 'A-', points: 3.7 },
  { letter: 'B+', points: 3.3 }, { letter: 'B', points: 3.0 }, { letter: 'B-', points: 2.7 },
  { letter: 'C+', points: 2.3 }, { letter: 'C', points: 2.0 }, { letter: 'C-', points: 1.7 },
  { letter: 'D+', points: 1.3 }, { letter: 'D', points: 1.0 }, { letter: 'F', points: 0.0 },
]

export default function HowToCalculateGpaPage() {
  useEffect(() => {
    document.title = 'How to Calculate GPA (4.0 Scale Explained with Examples) | TimeGovern'
    let d = document.querySelector('meta[name="description"]')
    if (!d) { d = document.createElement('meta'); d.setAttribute('name', 'description'); document.head.appendChild(d) }
    d.setAttribute('content', 'Learn how to calculate GPA on the 4.0 scale — the formula, weighted vs unweighted, worked examples, and how to raise a low GPA.')
    setPageMeta()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <nav className="text-xs text-muted-foreground mb-4"><Link to="/" className="hover:underline">Home</Link><span className="mx-1">/</span><Link to="/blog" className="hover:underline">Blog</Link><span className="mx-1">/</span><span>How to Calculate GPA</span></nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-blue-500 mb-3"><GraduationCap className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">Guide</span></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">How to Calculate GPA (4.0 Scale Explained)</h1>
        <p className="text-lg text-muted-foreground mb-4">The formula, worked examples, weighted vs unweighted, and how to raise a low GPA.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground"><span>Updated 4 October 2026</span><span>·</span><span>7 min read</span></div>
      </header>

      <ShareButtons title="How to Calculate GPA" />

      <article className="prose prose-sm md:prose-base max-w-none mt-8 space-y-6">
        <section>
          <p>Your GPA (Grade Point Average) is the single number that summarises your entire academic record — scholarships, graduate school admissions, and job applications all look at it first. But many students never learn how it is actually calculated, which makes it hard to know how to improve it.</p>
          <p>This guide explains the formula, shows worked examples, and covers the difference between weighted and unweighted GPA. Use our free <Link to="/gpa-calculator" className="text-emerald-600 font-semibold hover:underline">GPA Calculator</Link> to check yours instantly.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">The formula</h2>
          <p>GPA is the credit-weighted average of your grade points:</p>
          <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-muted/20 my-4">
            <GraduationCap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm font-mono">GPA = (Σ credits × grade points) ÷ (Σ credits)</div>
          </div>
          <p>In plain terms: each course contributes (credits × grade point value). Sum those, then divide by the total credits. That is it.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Grade point scale (4.0)</h2>
          <div className="overflow-x-auto border border-border rounded-lg my-4">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 border-b"><tr><th className="text-left p-3 font-semibold">Letter</th><th className="text-left p-3 font-semibold">Grade points</th></tr></thead>
              <tbody>{GRADE_SCALE.map(g => (<tr key={g.letter} className="border-b last:border-0"><td className="p-3 font-semibold">{g.letter}</td><td className="p-3 tabular-nums">{g.points.toFixed(1)}</td></tr>))}</tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">Some institutions award A+ as 4.3 or do not distinguish A+ from A. Always check your school&apos;s official policy.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Worked example</h2>
          <p>Four courses:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Calculus — 4 credits, grade A (4.0) → 16.0 grade points</li>
            <li>English — 3 credits, grade B+ (3.3) → 9.9</li>
            <li>Biology — 4 credits, grade B (3.0) → 12.0</li>
            <li>History — 3 credits, grade A− (3.7) → 11.1</li>
          </ul>
          <p>Total grade points = 16.0 + 9.9 + 12.0 + 11.1 = <strong>49.0</strong>.<br />Total credits = 4 + 3 + 4 + 3 = <strong>14</strong>.<br />GPA = 49.0 ÷ 14 = <strong>3.50</strong>.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Weighted vs unweighted GPA</h2>
          <p><strong>Unweighted</strong> (standard 4.0 scale) treats every course the same. An A in a regular class is worth 4.0, and an A in AP Calculus is also worth 4.0.</p>
          <p><strong>Weighted</strong> gives bonus points for advanced courses:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Regular: no bonus</li>
            <li>Honors: +0.5 (so A = 4.5)</li>
            <li>AP / IB / Dual Enrollment: +1.0 (so A = 5.0)</li>
          </ul>
          <p>Weighted GPA is more common in high schools. Most colleges recalculate your GPA on an unweighted scale for admissions consistency.</p>
          <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-muted/20 my-4">
            <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm"><strong>Rule of thumb:</strong> a weighted 4.5 is roughly an unweighted 3.75. Strong applicants have both a high unweighted GPA and a heavy AP/Honors load.</div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Semester vs cumulative GPA</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li><strong>Semester GPA</strong> — only courses taken in one term</li>
            <li><strong>Cumulative GPA</strong> — every course you have ever taken, weighted by credits</li>
            <li><strong>Major GPA</strong> — only courses in your major department</li>
          </ul>
          <p>Most applications ask for cumulative GPA. Some graduate programs look at major GPA separately, especially if your overall GPA was pulled down by unrelated first-year courses.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">How to raise a low GPA</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li><strong>Retake courses</strong> where you got a C or below. Many colleges replace the old grade entirely, giving a big boost.</li>
            <li><strong>Target high-credit A grades.</strong> A 4-credit A moves the needle twice as much as a 2-credit A.</li>
            <li><strong>Avoid elective blowoffs.</strong> A B in an easy class hurts the same as a B in a hard class.</li>
            <li><strong>Check pass/fail options.</strong> If a class is going badly, switching to pass/fail removes it from the GPA calculation at some schools.</li>
            <li><strong>Spread difficulty across semesters.</strong> Overloading one term with hard courses can tank the semester GPA and drag the cumulative number.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">What a good GPA looks like</h2>
          <div className="overflow-x-auto border border-border rounded-lg my-4">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 border-b"><tr><th className="text-left p-3 font-semibold">GPA range</th><th className="text-left p-3 font-semibold">Standing</th></tr></thead>
              <tbody>
                <tr className="border-b"><td className="p-3">3.8-4.0</td><td className="p-3">Summa cum laude territory</td></tr>
                <tr className="border-b"><td className="p-3">3.5-3.8</td><td className="p-3">Magna cum laude, top 15%</td></tr>
                <tr className="border-b"><td className="p-3">3.0-3.5</td><td className="p-3">Good standing, most grad programs accept</td></tr>
                <tr className="border-b"><td className="p-3">2.5-3.0</td><td className="p-3">Average — some opportunities limited</td></tr>
                <tr><td className="p-3">Below 2.5</td><td className="p-3">Academic probation risk at many schools</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-8 mb-3">Frequently asked questions</h2>
          <div className="space-y-2 my-4">{FAQ.map(f => (<details key={f.q} className="border border-border rounded-lg p-4"><summary className="font-semibold cursor-pointer text-sm">{f.q}</summary><p className="text-muted-foreground mt-2 text-sm">{f.a}</p></details>))}</div>
        </section>
      </article>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Related tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/gpa-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">GPA Calculator</div><div className="text-xs text-muted-foreground">4.0 scale with credits</div></Link>
          <Link to="/percentage-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Percentage Calculator</div><div className="text-xs text-muted-foreground">All percentage math</div></Link>
          <Link to="/average-calculator" className="border border-border rounded-lg p-4 hover:bg-muted/20 transition"><div className="font-semibold text-sm">Average Calculator</div><div className="text-xs text-muted-foreground">Mean, median, mode</div></Link>
        </div>
      </section>

      <section className="mt-8 text-center"><Link to="/gpa-calculator" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">Calculate your GPA <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  )
}