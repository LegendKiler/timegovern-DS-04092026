import { useState } from 'react'
import { Share2, Twitter, Facebook, Linkedin, Mail, MessageCircle, Link2, Check } from 'lucide-react'

export default function ShareButtons({ url, title, text, compact }) {
  const [copied, setCopied] = useState(false)
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareText = text || title || 'Check this out'
  const eUrl = encodeURIComponent(shareUrl)
  const eText = encodeURIComponent(shareText)

  const links = [
    { name: 'X',        href: 'https://twitter.com/intent/tweet?text=' + eText + '&url=' + eUrl,                          Icon: Twitter,       hover: 'hover:bg-black hover:text-white' },
    { name: 'Facebook', href: 'https://www.facebook.com/sharer/sharer.php?u=' + eUrl,                                    Icon: Facebook,      hover: 'hover:bg-blue-600 hover:text-white' },
    { name: 'WhatsApp', href: 'https://wa.me/?text=' + eText + '%20' + eUrl,                                             Icon: MessageCircle, hover: 'hover:bg-green-500 hover:text-white' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/sharing/share-offsite/?url=' + eUrl,                               Icon: Linkedin,      hover: 'hover:bg-blue-700 hover:text-white' },
    { name: 'Reddit',   href: 'https://reddit.com/submit?url=' + eUrl + '&title=' + eText,                                Icon: Share2,        hover: 'hover:bg-orange-500 hover:text-white' },
    { name: 'Email',    href: 'mailto:?subject=' + eText + '&body=' + eUrl,                                              Icon: Mail,          hover: 'hover:bg-gray-700 hover:text-white' }
  ]

  const onNativeShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: shareText, text: shareText, url: shareUrl }) } catch (e) {}
    }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {}
  }

  const isMobile = typeof navigator !== 'undefined' && navigator.share

  return (
    <div className={'flex flex-wrap items-center ' + (compact ? 'gap-1.5' : 'gap-2')}>
      {!compact && <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">Share:</span>}
      {isMobile && (
        <button onClick={onNativeShare} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-bold hover:border-indigo-500 transition-colors">
          <Share2 className="h-3.5 w-3.5" /> Share
        </button>
      )}
      {links.map((l) => (
        <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" title={'Share on ' + l.name}
          className={'inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border bg-card text-muted-foreground transition-colors ' + l.hover}>
          <l.Icon className="h-3.5 w-3.5" />
        </a>
      ))}
      <button onClick={copyLink} title="Copy link"
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border bg-card text-muted-foreground hover:border-emerald-500 hover:text-emerald-500 transition-colors">
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Link2 className="h-3.5 w-3.5" />}
      </button>
    </div>
  )
}
