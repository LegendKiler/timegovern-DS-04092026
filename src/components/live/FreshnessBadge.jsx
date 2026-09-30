export default function FreshnessBadge({ status = 'live', label }) {
  const isLive = status === 'live'
  return (
    <span
      className={
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ' +
        (isLive
          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
          : 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30')
      }
    >
      <span
        className={
          'w-1.5 h-1.5 rounded-full ' +
          (isLive ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500')
        }
      ></span>
      {label || (isLive ? 'Live' : 'Hourly')}
    </span>
  )
}