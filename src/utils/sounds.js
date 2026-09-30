// Shared audio utilities — Web Audio API, no external files needed

let audioCtx = null

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioCtx
}

// Single beep
export function playBeep(duration = 0.3, freq = 880, volume = 0.3) {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = freq
    gain.gain.setValueAtTime(volume, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch (e) { console.warn('Audio failed', e) }
}

// Preset alarm patterns
export function playAlarmSound(pattern = 'classic', volume = 0.3) {
  if (pattern === 'none') return

  if (pattern === 'classic') {
    playBeep(0.2, 880, volume)
    setTimeout(() => playBeep(0.2, 880, volume), 300)
    setTimeout(() => playBeep(0.4, 880, volume), 600)
  } else if (pattern === 'digital') {
    for (let i = 0; i < 6; i++) setTimeout(() => playBeep(0.1, 1200, volume), i * 150)
  } else if (pattern === 'soft') {
    playBeep(0.8, 660, volume * 0.7)
    setTimeout(() => playBeep(0.8, 880, volume * 0.7), 1000)
  } else if (pattern === 'urgent') {
    for (let i = 0; i < 10; i++) setTimeout(() => playBeep(0.1, 1500, volume), i * 100)
  } else if (pattern === 'chime') {
    playBeep(0.4, 523, volume)
    setTimeout(() => playBeep(0.4, 659, volume), 400)
    setTimeout(() => playBeep(0.6, 784, volume), 800)
  }
}

// Start a repeating alarm — returns a stop function
export function startRepeatingAlarm(pattern = 'classic', volume = 0.3, intervalMs = 2000) {
  playAlarmSound(pattern, volume)
  const id = setInterval(() => playAlarmSound(pattern, volume), intervalMs)
  return () => clearInterval(id)
}

// Send a browser notification (if allowed)
export function notify(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, { body, icon: '/favicon.ico' })
    } catch (e) { console.warn('Notification failed', e) }
  }
}

// Request notification permission
export async function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    return await Notification.requestPermission()
  }
  return Notification?.permission || 'unsupported'
}

// Sound options for dropdowns
export const SOUND_OPTIONS = [
  { value: 'classic', label: 'Classic (3 beeps)' },
  { value: 'digital', label: 'Digital (fast beeps)' },
  { value: 'soft', label: 'Soft (gentle)' },
  { value: 'urgent', label: 'Urgent (rapid)' },
  { value: 'chime', label: 'Chime (musical)' },
  { value: 'none', label: 'Silent' },
]