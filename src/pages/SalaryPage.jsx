import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SalaryCalculator from '../components/mortgage/SalaryCalculator'
import SaveCalculation from '../components/SaveCalculation'
import { MortgageHero, FaqItem, RelatedMortgageTools, MortgageSeoContent, MortgageBreadcrumb } from '../components/mortgage/MortgageLayout'

export default function SalaryPage() {
  useEffect(() => {
    document.title = 'Salary Calculator 2026 — Take Home Pay After Tax (10 Countries) | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Free salary calculator for 10 countries. See your take-home pay after income tax and social contributions. Includes official tax authority links.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  const faqs = [
    { q: 'How is take-home pay calculated?', a: 'Take-home pay = gross salary minus income tax minus social contributions (Medicare, FICA, NI, CPP, etc.) minus any pre-tax deductions. Our calculator applies the current progressive tax brackets for your country.' },
    { q: 'Why does my country show a different result than my payslip?', a: 'Payslips may include employer-specific deductions (health insurance, retirement contributions, union dues) that we cannot model. We calculate the statutory minimum. Always verify with your payroll department.' },
    { q: 'Are the tax rates current?', a: 'Yes — we update rates annually after each country\'s budget. The tax year is shown at the top of the calculator. Always confirm with the official authority linked at the bottom of the page.' },
    { q: 'Which countries are supported?', a: 'Australia, USA, UK, Canada, India, Germany, France, Japan, Singapore, and New Zealand. More countries coming soon.' },
    { q: 'Does this include state or provincial tax?', a: 'Not in version 1. We calculate federal/national tax only. US state tax, Canadian provincial tax, and Swiss cantonal tax will be added in a future update.' },
    { q: 'Is my data saved?', a: 'You can save calculations to your account (free) and compare them side by side. We never share your data.' },
  ]

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <MortgageBreadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Salary', href: null },
      ]} />

      <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:border-primary hover:text-primary transition-all text-sm font-semibold mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <MortgageHero
        eyebrow="Salary Tool"
        title="Salary Calculator"
        subtitle="See your take-home pay after income tax and social contributions for 10 countries. Includes official tax authority links."
        gradient="from-emerald-500 via-teal-500 to-cyan-500"
        meta={<>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">10 countries</span>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">2024-25 rates</span>
          <span className="bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full font-medium">Official sources</span>
        </>}
      />

      <div className="mb-6 flex justify-end">
        <SaveCalculation type="salary" title="Salary Calculation" />
      </div>

      <div className="mb-10">
        <SalaryCalculator defaultCountry="australia" />
      </div>

      <MortgageSeoContent title="How to use this salary calculator">
        <p>Select your country from the dropdown, enter your annual gross salary, and press nothing — the result updates instantly. You can add a bonus or pre-tax deductions (like salary sacrifice or 401k contributions) for a more accurate number.</p>
        <p>Your take-home pay is broken down into income tax brackets, social contributions, and total deductions, so you can see exactly where your money goes.</p>
        <p>We link to the official tax authority for each country at the bottom of the calculator so you can verify the rates yourself.</p>
      </MortgageSeoContent>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map((f, i) => <FaqItem key={i} {...f} />)}</div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Country-specific calculators</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <Link to="/salary/australia" className="p-3 rounded-xl border border-border bg-card hover:border-primary transition-all text-center">
            <div className="font-bold text-sm">Australia</div>
          </Link>
          <Link to="/salary/usa" className="p-3 rounded-xl border border-border bg-card hover:border-primary transition-all text-center">
            <div className="font-bold text-sm">USA</div>
          </Link>
          <Link to="/salary/uk" className="p-3 rounded-xl border border-border bg-card hover:border-primary transition-all text-center">
            <div className="font-bold text-sm">UK</div>
          </Link>
          <Link to="/salary/canada" className="p-3 rounded-xl border border-border bg-card hover:border-primary transition-all text-center">
            <div className="font-bold text-sm">Canada</div>
          </Link>
          <Link to="/salary/india" className="p-3 rounded-xl border border-border bg-card hover:border-primary transition-all text-center">
            <div className="font-bold text-sm">India</div>
          </Link>
          <Link to="/salary/germany" className="p-3 rounded-xl border border-border bg-card hover:border-primary transition-all text-center">
            <div className="font-bold text-sm">Germany</div>
          </Link>
          <Link to="/salary/france" className="p-3 rounded-xl border border-border bg-card hover:border-primary transition-all text-center">
            <div className="font-bold text-sm">France</div>
          </Link>
          <Link to="/salary/japan" className="p-3 rounded-xl border border-border bg-card hover:border-primary transition-all text-center">
            <div className="font-bold text-sm">Japan</div>
          </Link>
          <Link to="/salary/singapore" className="p-3 rounded-xl border border-border bg-card hover:border-primary transition-all text-center">
            <div className="font-bold text-sm">Singapore</div>
          </Link>
          <Link to="/salary/new-zealand" className="p-3 rounded-xl border border-border bg-card hover:border-primary transition-all text-center">
            <div className="font-bold text-sm">New Zealand</div>
          </Link>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-black tracking-tight mb-5">Related tools</h2>
        <RelatedMortgageTools items={[
          { name: 'Mortgage Calculator', href: '/mortgage' },
          { name: 'Home Equity', href: '/mortgage/australia/home-equity' },
          { name: 'Age Calculator', href: '/age-calculator' },
          { name: 'Percentage Calculator', href: '/percentage-calculator' },
          { name: 'All Calculators', href: '/calculators' },
        ]} />
      </section>
    </div>
  )
}