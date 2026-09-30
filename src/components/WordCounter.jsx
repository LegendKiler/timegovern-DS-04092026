import { useState, useEffect, useMemo } from 'react'
import { Trash2, Copy, Check, Clock, Type, AlignLeft, Hash, Mic, BookOpen, BarChart3 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const STORAGE = 'tg_wordcounter_v1'

const STOPWORDS = new Set(['the','a','an','and','or','but','of','to','in','on','at','by','for','with','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','must','can','this','that','these','those','i','you','he','she','it','we','they','them','his','her','its','our','their','my','your','as','if','so','not','no','than','then','when','where','how','what','which','who','from'])

function countWords(text) {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length
}

function countSentences(text) {
  return text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
}

function countParagraphs(text) {
  return text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
}

function readingTime(words) {
  if (words === 0) return '0 min'
  const m = words / 200
  if (m < 1) return '< 1 min'
  return Math.ceil(m) + ' min'
}

function speakingTime(words) {
  if (words === 0) return '0 min'
  const m = words / 130
  if (m < 1) return '< 1 min'
  return Math.ceil(m) + ' min'
}

function topKeywords(text, n = 10) {
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !STOPWORDS.has(w))
  const freq = {}
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1 })
  return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, n)
}

export default function WordCounter() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE)
      if (raw) setText(raw)
    } catch (e) {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try { localStorage.setItem(STORAGE, text) } catch (e) {}
  }, [text, hydrated])

  const stats = useMemo(() => {
    const words = countWords(text)
    return {
      words,
      chars: text.length,
      charsNoSpaces: text.replace(/\s/g, '').length,
      sentences: countSentences(text),
      paragraphs: countParagraphs(text),
      lines: text.split('\n').length,
      reading: readingTime(words),
      speaking: speakingTime(words),
    }
  }, [text])

  const keywords = useMemo(() => topKeywords(text, 10), [text])

  const copyStats = async () => {
    const s = 'Words: ' + stats.words + '\nCharacters: ' + stats.chars + '\nCharacters (no spaces): ' + stats.charsNoSpaces + '\nSentences: ' + stats.sentences + '\nParagraphs: ' + stats.paragraphs + '\nReading time: ' + stats.reading + '\nSpeaking time: ' + stats.speaking
    try { await navigator.clipboard.writeText(s); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch (e) {}
  }

  const clearAll = () => { setText('') }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <AlignLeft className="h-3.5 w-3.5" /> Your text
            </div>
            <div className="flex items-center gap-2">
              <button onClick={copyStats} title="Copy stats" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/70 text-xs font-bold transition-colors">
                {copied ? <><Check className="h-3.5 w-3.5 text-emerald-500" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy stats</>}
              </button>
              <button onClick={clearAll} title="Clear" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-red-500/10 hover:text-red-500 text-xs font-bold transition-colors">
                <Trash2 className="h-3.5 w-3.5" /> Clear
              </button>
            </div>
          </div>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste or type your text here. Word count, character count, reading time, and top keywords update live." rows={12} className="w-full px-3 py-3 rounded-lg border border-border bg-background text-sm leading-relaxed resize-y min-h-[200px]" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-indigo-500/30">
          <CardContent className="p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Type className="h-3 w-3" /> Words</div>
            <div className="text-3xl font-black tabular-nums">{stats.words}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><Hash className="h-3 w-3" /> Characters</div>
            <div className="text-3xl font-black tabular-nums">{stats.chars}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{stats.charsNoSpaces} without spaces</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><AlignLeft className="h-3 w-3" /> Sentences</div>
            <div className="text-3xl font-black tabular-nums">{stats.sentences}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{stats.paragraphs} paragraphs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><AlignLeft className="h-3 w-3" /> Lines</div>
            <div className="text-3xl font-black tabular-nums">{stats.lines}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="border-emerald-500/30">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <BookOpen className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Reading time</div>
              <div className="text-2xl font-black">{stats.reading}</div>
              <div className="text-[10px] text-muted-foreground">at 200 words/min</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-500/30">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <Mic className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Speaking time</div>
              <div className="text-2xl font-black">{stats.speaking}</div>
              <div className="text-[10px] text-muted-foreground">at 130 words/min</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {keywords.length > 0 && (
        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <BarChart3 className="h-3.5 w-3.5" /> Top keywords
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.map(([word, count]) => (
                <div key={word} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{word}</span>
                  <span className="text-[10px] font-black text-muted-foreground">x{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="rounded-xl bg-muted/40 border border-border p-3 text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2">
        <Clock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
        <span>Your text is saved on your device only - it never leaves your browser. No signup, no tracking, 100% private.</span>
      </div>
    </div>
  )
}