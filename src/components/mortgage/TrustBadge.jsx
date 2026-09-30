import { Calendar, Building2, ExternalLink, ShieldCheck } from 'lucide-react'
import { getTaxMeta } from '../../data/taxRates'

export default function TrustBadge({ country }) {
  const meta = getTaxMeta(country)
  if (!meta) return null

  return (
    <div className="mb-6 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span className="font-semibold text-emerald-700 dark:text-emerald-400">Rates verified</span>
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {meta.lastVerified} ({meta.taxYear})
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Building2 className="h-3.5 w-3.5" />
          {meta.authority}
        </span>
        <a
          href={meta.authorityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-emerald-600 hover:underline font-semibold ml-auto"
        >
          View official rates <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  )
}