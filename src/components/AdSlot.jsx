// AdSlot — placeholder for ad networks (AdSense, Ezoic, etc.)
// Renders a styled box that matches the ad dimensions.
// Once AdSense is approved, replace inner content with the ad snippet.
import { Info } from 'lucide-react'

const SIZES = {
  leaderboard: { className: 'h-[90px] w-full max-w-[728px]', label: '728 × 90' },
  rectangle:   { className: 'h-[250px] w-[300px]',            label: '300 × 250' },
  halfpage:    { className: 'h-[600px] w-[300px]',            label: '300 × 600' },
  mobile:      { className: 'h-[50px] w-full max-w-[320px]',  label: '320 × 50' },
  inline:      { className: 'h-[90px] w-full',                label: 'Responsive' },
}

export default function AdSlot({ type = 'leaderboard', className = '' }) {
  const size = SIZES[type] || SIZES.leaderboard

  return (
    <div
      data-ad-slot={type}
      className={'mx-auto rounded-xl border-2 border-dashed border-border/60 bg-muted/20 flex items-center justify-center text-xs text-muted-foreground/60 ' + size.className + ' ' + className}
    >
      <div className="flex items-center gap-1.5">
        <Info className="h-3 w-3" />
        <span>Ad space · {size.label}</span>
      </div>
    </div>
  )
}