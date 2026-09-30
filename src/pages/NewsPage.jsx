import { useEffect } from 'react'
import { Newspaper, Sparkles } from 'lucide-react'
import NewsFeed from '../components/NewsFeed'

export default function NewsPage() {
  useEffect(() => {
    document.title = 'Live News 2026 — Business, Tech, Sports & World | TimeGovern'
    const meta = document.querySelector('meta[name="description"]') || Object.assign(document.createElement('meta'), { name: 'description' })
    meta.content = 'Live news from around the world. Business, technology, sports, health, science, entertainment. Updated in real time.'
    if (!meta.parentNode) document.head.appendChild(meta)
  }, [])

  return (
    <div className="container mx-auto p-4 max-w-7xl">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl mb-8 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950"></div>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(59,130,246,0.6) 0%, transparent 50%)' }}></div>
        <div className="relative z-10 p-8 md:p-14 text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="h-3.5 w-3.5 text-blue-300" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-200">Live feed · Updated in real time</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-[1.05] flex items-center gap-4">
            <Newspaper className="h-10 w-10 md:h-14 md:w-14 text-blue-300" />
            Live News
          </h1>
          <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
            Breaking headlines from trusted sources worldwide — Business, Technology, Sports, Health, Science, and more.
          </p>
        </div>
      </div>

      <NewsFeed />
    </div>
  )
}