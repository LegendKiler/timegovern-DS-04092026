import { useState, useMemo } from 'react'
import { Sun, Moon, Zap, Waves, ArrowLeft, RotateCcw, Clock, Coffee, Brain, Dumbbell } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareButtons from './ShareButtons'
import SaveCalculation from './SaveCalculation'

const QUESTIONS = [
  { q: 'What time do you naturally wake up on a free day?', a: [ { t: 'Before 6:30 AM', s: { lion: 2, bear: 1, wolf: 0, dolphin: 1 } }, { t: '6:30-8:00 AM', s: { lion: 1, bear: 2, wolf: 0, dolphin: 1 } }, { t: '8:00-9:30 AM', s: { lion: 0, bear: 2, wolf: 1, dolphin: 1 } }, { t: 'After 9:30 AM', s: { lion: 0, bear: 0, wolf: 3, dolphin: 0 } } ] },
  { q: 'How do you feel in the first 30 minutes after waking?', a: [ { t: 'Wide awake and ready', s: { lion: 3, bear: 2, wolf: 0, dolphin: 0 } }, { t: 'Slow but functional', s: { lion: 1, bear: 2, wolf: 1, dolphin: 1 } }, { t: 'Groggy for an hour or more', s: { lion: 0, bear: 1, wolf: 3, dolphin: 1 } }, { t: 'I never feel rested', s: { lion: 0, bear: 0, wolf: 1, dolphin: 3 } } ] },
  { q: 'When do you feel most productive?', a: [ { t: 'Early morning (6-10 AM)', s: { lion: 3, bear: 2, wolf: 0, dolphin: 1 } }, { t: 'Late morning (10 AM-1 PM)', s: { lion: 1, bear: 3, wolf: 1, dolphin: 2 } }, { t: 'Afternoon (1-5 PM)', s: { lion: 0, bear: 1, wolf: 2, dolphin: 1 } }, { t: 'Evening or night (after 6 PM)', s: { lion: 0, bear: 0, wolf: 3, dolphin: 1 } } ] },
  { q: 'What is your ideal dinner time?', a: [ { t: 'Before 6 PM', s: { lion: 3, bear: 2, wolf: 0, dolphin: 1 } }, { t: '6-7:30 PM', s: { lion: 1, bear: 3, wolf: 1, dolphin: 1 } }, { t: '7:30-9 PM', s: { lion: 0, bear: 1, wolf: 3, dolphin: 1 } }, { t: 'After 9 PM', s: { lion: 0, bear: 0, wolf: 3, dolphin: 0 } } ] },
  { q: 'How would you describe your energy in the late afternoon?', a: [ { t: 'Still energetic', s: { lion: 2, bear: 1, wolf: 1, dolphin: 0 } }, { t: 'Mild dip', s: { lion: 1, bear: 3, wolf: 1, dolphin: 1 } }, { t: 'Strong crash', s: { lion: 1, bear: 1, wolf: 2, dolphin: 2 } }, { t: 'Just getting started', s: { lion: 0, bear: 0, wolf: 3, dolphin: 1 } } ] },
  { q: 'What time do you naturally feel sleepy in the evening?', a: [ { t: 'Before 9 PM', s: { lion: 3, bear: 1, wolf: 0, dolphin: 1 } }, { t: '9-10:30 PM', s: { lion: 1, bear: 3, wolf: 0, dolphin: 1 } }, { t: '10:30 PM-12 AM', s: { lion: 0, bear: 1, wolf: 3, dolphin: 1 } }, { t: 'After midnight', s: { lion: 0, bear: 0, wolf: 3, dolphin: 0 } } ] },
  { q: 'How is your sleep quality most nights?', a: [ { t: 'Deep and uninterrupted', s: { lion: 2, bear: 3, wolf: 2, dolphin: 0 } }, { t: 'Pretty good, occasional wake-ups', s: { lion: 2, bear: 2, wolf: 1, dolphin: 1 } }, { t: 'Light, wake up often', s: { lion: 1, bear: 0, wolf: 1, dolphin: 3 } }, { t: 'I struggle to fall asleep', s: { lion: 0, bear: 0, wolf: 1, dolphin: 3 } } ] },
  { q: 'Do you use an alarm clock?', a: [ { t: 'No, I wake up naturally', s: { lion: 2, bear: 1, wolf: 0, dolphin: 0 } }, { t: 'Yes, but I wake before it', s: { lion: 2, bear: 2, wolf: 1, dolphin: 1 } }, { t: 'Yes, I need it to wake', s: { lion: 1, bear: 2, wolf: 3, dolphin: 2 } }, { t: 'Multiple alarms', s: { lion: 0, bear: 1, wolf: 3, dolphin: 3 } } ] },
  { q: 'When do you prefer to exercise?', a: [ { t: 'Early morning', s: { lion: 3, bear: 1, wolf: 0, dolphin: 1 } }, { t: 'Mid-morning or lunchtime', s: { lion: 1, bear: 3, wolf: 1, dolphin: 2 } }, { t: 'Late afternoon', s: { lion: 0, bear: 2, wolf: 3, dolphin: 1 } }, { t: 'Evening or night', s: { lion: 0, bear: 0, wolf: 3, dolphin: 0 } } ] },
  { q: 'How do you feel about mornings in general?', a: [ { t: 'Love them - best part of the day', s: { lion: 3, bear: 2, wolf: 0, dolphin: 1 } }, { t: 'They are okay once I am up', s: { lion: 1, bear: 3, wolf: 1, dolphin: 1 } }, { t: 'I dread them', s: { lion: 0, bear: 0, wolf: 3, dolphin: 1 } }, { t: 'They are my worst time', s: { lion: 0, bear: 0, wolf: 2, dolphin: 3 } } ] },
  { q: 'If you could design your perfect day, when would your work hours be?', a: [ { t: '5 AM - 1 PM', s: { lion: 3, bear: 1, wolf: 0, dolphin: 1 } }, { t: '9 AM - 5 PM', s: { lion: 1, bear: 3, wolf: 1, dolphin: 2 } }, { t: '12 PM - 8 PM', s: { lion: 0, bear: 1, wolf: 3, dolphin: 1 } }, { t: '6 PM - 2 AM', s: { lion: 0, bear: 0, wolf: 3, dolphin: 0 } } ] },
  { q: 'How does your mood shift across the day?', a: [ { t: 'Best early, dips in evening', s: { lion: 3, bear: 2, wolf: 0, dolphin: 1 } }, { t: 'Steady with mid-afternoon dip', s: { lion: 1, bear: 3, wolf: 1, dolphin: 1 } }, { t: 'Slow to warm, peaks late', s: { lion: 0, bear: 0, wolf: 3, dolphin: 1 } }, { t: 'Anxious or restless often', s: { lion: 0, bear: 0, wolf: 1, dolphin: 3 } } ] }
]

const TYPES = {
  lion: { name: 'Lion', tagline: 'The Early Riser', gradient: 'from-amber-500 to-orange-600', icon: Sun, iconColor: 'text-amber-500', window: 'Wakes 5-6 AM, peak 8 AM-12 PM, sleeps by 10 PM', strengths: ['Sharp focus in the morning', 'Natural leadership energy', 'Discipline and consistency'], challenges: ['Late social events drain you', 'Evening productivity is low', 'Can feel isolated from night owls'], tips: ['Schedule deep work before noon', 'Protect your 10 PM bedtime fiercely', 'Use evening for light, social tasks only', 'Avoid bright light after 8 PM'] },
  bear: { name: 'Bear', tagline: 'The Solar-Aligned', gradient: 'from-emerald-500 to-teal-600', icon: Zap, iconColor: 'text-emerald-500', window: 'Wakes 7-8 AM, peak 10 AM-2 PM, sleeps by 11 PM', strengths: ['Follows the sun naturally', 'Good all-round energy', 'Most common type (55% of people)'], challenges: ['Post-lunch energy crash', 'Struggles with early starts', 'Needs full 7-9 hours to function'], tips: ['Take a short walk at 2 PM instead of more coffee', 'Avoid long naps - 20 min max', 'Get bright morning light within 30 min of waking', 'Keep consistent bedtime even on weekends'] },
  wolf: { name: 'Wolf', tagline: 'The Night Owl', gradient: 'from-indigo-500 to-purple-600', icon: Moon, iconColor: 'text-indigo-500', window: 'Wakes 8-9 AM, peak 5-9 PM, sleeps after midnight', strengths: ['Creative and innovative in evenings', 'Calm under pressure at night', 'Deep focus when others are tired'], challenges: ['Mornings are brutal', 'Chronic sleep debt risk', 'Social jetlag on weekdays'], tips: ['Shift bedtime 15 min earlier each week', 'Avoid bright screens after 10 PM', 'Get sunlight within 30 min of waking', 'Do not force morning workouts - evenings work better'] },
  dolphin: { name: 'Dolphin', tagline: 'The Light Sleeper', gradient: 'from-sky-500 to-cyan-600', icon: Waves, iconColor: 'text-sky-500', window: 'Wakes 6-7 AM, peak 10 AM-12 PM, restless nights', strengths: ['Highly alert to environment', 'Detail-oriented and careful', 'Often creative and analytical'], challenges: ['Struggles to fall asleep', 'Frequent night waking', 'Anxiety around bedtime'], tips: ['Follow a strict winding-down ritual', 'Keep bedroom cool, dark, and quiet', 'Avoid caffeine after 12 PM', 'Consider sleep meditation or breathing exercises'] }
}

export default function ChronotypeQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [done, setDone] = useState(false)

  const scores = useMemo(() => {
    const s = { lion: 0, bear: 0, wolf: 0, dolphin: 0 }
    answers.forEach((a, i) => {
      const q = QUESTIONS[i]
      if (!q || a == null) return
      const opt = q.a[a]
      if (!opt) return
      Object.keys(opt.s).forEach((k) => { s[k] += opt.s[k] })
    })
    return s
  }, [answers])

  const winner = useMemo(() => {
    if (!done) return null
    return Object.keys(scores).reduce((best, k) => scores[k] > scores[best] ? k : best, 'bear')
  }, [done, scores])

  const pick = (idx) => {
    const next = answers.slice()
    next[step] = idx
    setAnswers(next)
    if (step + 1 >= QUESTIONS.length) setDone(true)
    else setStep(step + 1)
  }

  const reset = () => { setStep(0); setAnswers([]); setDone(false) }

  if (done && winner) {
    const T = TYPES[winner]
    const Icon = T.icon
    const max = Math.max(...Object.values(scores))
    return (
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <div className={`h-1.5 bg-gradient-to-r ${T.gradient}`} />
          <CardContent className="p-6 md:p-8 text-center space-y-5">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-2">
              <Icon className={`h-10 w-10 ${T.iconColor}`} />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Your Chronotype</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-1">{T.name}</h2>
              <p className={`text-sm font-bold bg-gradient-to-r ${T.gradient} bg-clip-text text-transparent`}>{T.tagline}</p>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">{T.window}</p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              {Object.keys(scores).map((k) => (
                <div key={k} className="rounded-lg bg-muted/40 p-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{TYPES[k].name}</div>
                  <div className="text-lg font-black">{Math.round((scores[k] / max) * 100)}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card><CardContent className="p-5"><h3 className="font-black text-sm mb-3 flex items-center gap-2"><Zap className="h-4 w-4 text-emerald-500" />Strengths</h3><ul className="space-y-1.5 text-xs text-muted-foreground">{T.strengths.map((s, i) => <li key={i}>+ {s}</li>)}</ul></CardContent></Card>
          <Card><CardContent className="p-5"><h3 className="font-black text-sm mb-3 flex items-center gap-2"><Moon className="h-4 w-4 text-orange-500" />Challenges</h3><ul className="space-y-1.5 text-xs text-muted-foreground">{T.challenges.map((s, i) => <li key={i}>- {s}</li>)}</ul></CardContent></Card>
          <Card><CardContent className="p-5"><h3 className="font-black text-sm mb-3 flex items-center gap-2"><Brain className="h-4 w-4 text-indigo-500" />Your Tips</h3><ul className="space-y-1.5 text-xs text-muted-foreground">{T.tips.map((s, i) => <li key={i}>+ {s}</li>)}</ul></CardContent></Card>
        </div>

        <div className="flex justify-end pt-2"><SaveCalculation type="calculation" title="Chronotype Quiz" inputs={{answers}} results={{type: T.name, tagline: T.tagline, scores}} /></div>
        <Card className="bg-indigo-500/5 border-indigo-500/20">
          <CardContent className="p-5 text-center">
            <p className="text-xs text-muted-foreground mb-3">Share your chronotype with friends</p>
            <ShareButtons url={typeof window !== 'undefined' ? window.location.href : 'https://timegovern.com/chronotype-quiz'} title={`I am a ${T.name} - ${T.tagline}. What is your chronotype?`} />
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <button onClick={reset} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-card border border-border hover:border-indigo-400 text-sm font-bold transition-colors"><RotateCcw className="h-4 w-4" /> Retake quiz</button>
        </div>
      </div>
    )
  }

  const q = QUESTIONS[step]
  const progress = Math.round(((step) / QUESTIONS.length) * 100)

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between mb-2 text-xs font-bold">
          <span className="text-muted-foreground">Question {step + 1} of {QUESTIONS.length}</span>
          <span className="text-indigo-500">{progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all" style={{ width: progress + '%' }} />
        </div>
      </div>

      <Card>
        <CardContent className="p-5 md:p-6 space-y-4">
          <h2 className="text-lg md:text-xl font-black tracking-tight">{q.q}</h2>
          <div className="space-y-2">
            {q.a.map((opt, i) => (
              <button key={i} onClick={() => pick(i)} className="w-full text-left px-4 py-3 rounded-xl border border-border bg-card hover:border-indigo-500 hover:bg-indigo-500/5 transition-colors text-sm font-medium">{opt.t}</button>
            ))}
          </div>
        </CardContent>
      </Card>

      {step > 0 && (
        <div className="flex justify-start">
          <button onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="h-3.5 w-3.5" /> Back</button>
        </div>
      )}
    </div>
  )
}
