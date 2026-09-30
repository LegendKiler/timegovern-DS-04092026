import { useState } from 'react'
import { HelpCircle } from 'lucide-react'

export default function InfoTooltip({ children, position = 'left' }) {
  const [show, setShow] = useState(false)
  const posClasses = { left: 'right-0', right: 'left-0', center: 'left-1/2 -translate-x-1/2' }

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="w-6 h-6 rounded-full bg-muted hover:bg-primary hover:text-white text-muted-foreground flex items-center justify-center transition-colors"
        aria-label="Help"
      >
        <HelpCircle className="h-3.5 w-3.5" />
      </button>
      {show && (
        <div
          className={'absolute z-50 top-full mt-2 w-72 bg-card border border-border rounded-xl shadow-2xl p-4 text-left ' + posClasses[position]}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {children}
        </div>
      )}
    </div>
  )
}