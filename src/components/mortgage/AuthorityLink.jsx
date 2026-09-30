import { Building2, ExternalLink } from 'lucide-react'
import { getAuthorityByCurrency } from '../../data/taxRates'

export default function AuthorityLink({ currency }) {
  const meta = getAuthorityByCurrency(currency)
  if (!meta) return null

  return (
    <div className="rounded-lg p-3 bg-muted/40 border border-border mt-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Building2 className="h-3.5 w-3.5" />
          Official tax authority:
        </span>
        <a
          href={meta.authorityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 hover:underline"
        >
          {meta.authority}
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1.5">
        Rates verified {meta.lastVerified} ({meta.taxYear}). Always confirm with the official source before making decisions.
      </p>
    </div>
  )
}