import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { QrCode, Download, Link as LinkIcon, Wifi, Mail, Phone, MessageSquare, Type } from 'lucide-react'
import QRCodeLib from 'qrcode'

const MODES = [
  { key: 'url',      label: 'URL',      icon: LinkIcon },
  { key: 'text',     label: 'Text',     icon: Type },
  { key: 'wifi',     label: 'WiFi',     icon: Wifi },
  { key: 'email',    label: 'Email',    icon: Mail },
  { key: 'phone',    label: 'Phone',    icon: Phone },
  { key: 'sms',      label: 'SMS',      icon: MessageSquare },
]

const buildPayload = (mode, fields) => {
  if (mode === 'url')   return fields.url || 'https://timegovern.com'
  if (mode === 'text')  return fields.text || 'Hello from TimeGovern'
  if (mode === 'wifi')  return `WIFI:T:${fields.wifiSecurity || 'WPA'};S:${fields.wifiSSID || ''};P:${fields.wifiPassword || ''};;`
  if (mode === 'email') return `mailto:${fields.emailTo || ''}?subject=${encodeURIComponent(fields.emailSubject || '')}&body=${encodeURIComponent(fields.emailBody || '')}`
  if (mode === 'phone') return `tel:${fields.phone || ''}`
  if (mode === 'sms')   return `sms:${fields.smsPhone || ''}?body=${encodeURIComponent(fields.smsMessage || '')}`
  return ''
}

export default function QRCodeGenerator() {
  const [mode, setMode] = useState('url')
  const [fields, setFields] = useState({
    url: 'https://timegovern.com',
    text: '',
    wifiSSID: '', wifiPassword: '', wifiSecurity: 'WPA',
    emailTo: '', emailSubject: '', emailBody: '',
    phone: '',
    smsPhone: '', smsMessage: '',
  })
  const [size, setSize] = useState(256)
  const canvasRef = useRef(null)

  const payload = buildPayload(mode, fields)

  useEffect(() => {
    if (!canvasRef.current || !payload) return
    QRCodeLib.toCanvas(canvasRef.current, payload, {
      width: size,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' },
      errorCorrectionLevel: 'M',
    }).catch(() => {})
  }, [payload, size])

  const download = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = `qr-code-${mode}-${Date.now()}.png`
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  const update = (key, value) => setFields(prev => ({ ...prev, [key]: value }))

  return (
    <Card className="border-border shadow-xl">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-md">
            <QrCode className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black">QR Code Generator</h2>
            <p className="text-xs text-muted-foreground">URLs, WiFi, email, phone, SMS - all offline</p>
          </div>
        </div>

        {/* Mode picker */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
          {MODES.map((m) => {
            const Icon = m.icon
            const active = mode === m.key
            return (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={'flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ' + (active ? 'border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400' : 'border-border hover:border-purple-300')}
              >
                <Icon className="h-4 w-4" />
                <span className="text-[11px] font-bold">{m.label}</span>
              </button>
            )
          })}
        </div>

        {/* Mode-specific fields */}
        <div className="space-y-3 mb-6">
          {mode === 'url' && (
            <div>
              <label className="text-xs font-bold mb-1.5 block">URL</label>
              <Input type="url" value={fields.url} onChange={(e) => update('url', e.target.value)} placeholder="https://example.com" />
            </div>
          )}
          {mode === 'text' && (
            <div>
              <label className="text-xs font-bold mb-1.5 block">Text</label>
              <textarea value={fields.text} onChange={(e) => update('text', e.target.value)} placeholder="Any text..." className="w-full h-24 px-3 py-2 rounded-md border border-input bg-background text-sm resize-none" />
            </div>
          )}
          {mode === 'wifi' && (
            <>
              <div><label className="text-xs font-bold mb-1.5 block">Network name (SSID)</label><Input value={fields.wifiSSID} onChange={(e) => update('wifiSSID', e.target.value)} placeholder="MyWiFiNetwork" /></div>
              <div><label className="text-xs font-bold mb-1.5 block">Password</label><Input value={fields.wifiPassword} onChange={(e) => update('wifiPassword', e.target.value)} placeholder="wifi-password" /></div>
              <div>
                <label className="text-xs font-bold mb-1.5 block">Security</label>
                <select value={fields.wifiSecurity} onChange={(e) => update('wifiSecurity', e.target.value)} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">Open (no password)</option>
                </select>
              </div>
            </>
          )}
          {mode === 'email' && (
            <>
              <div><label className="text-xs font-bold mb-1.5 block">To</label><Input type="email" value={fields.emailTo} onChange={(e) => update('emailTo', e.target.value)} placeholder="hello@example.com" /></div>
              <div><label className="text-xs font-bold mb-1.5 block">Subject</label><Input value={fields.emailSubject} onChange={(e) => update('emailSubject', e.target.value)} /></div>
              <div><label className="text-xs font-bold mb-1.5 block">Body</label><textarea value={fields.emailBody} onChange={(e) => update('emailBody', e.target.value)} className="w-full h-20 px-3 py-2 rounded-md border border-input bg-background text-sm resize-none" /></div>
            </>
          )}
          {mode === 'phone' && (
            <div><label className="text-xs font-bold mb-1.5 block">Phone number</label><Input type="tel" value={fields.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+1 555 123 4567" /></div>
          )}
          {mode === 'sms' && (
            <>
              <div><label className="text-xs font-bold mb-1.5 block">Phone number</label><Input type="tel" value={fields.smsPhone} onChange={(e) => update('smsPhone', e.target.value)} placeholder="+1 555 123 4567" /></div>
              <div><label className="text-xs font-bold mb-1.5 block">Message</label><textarea value={fields.smsMessage} onChange={(e) => update('smsMessage', e.target.value)} className="w-full h-20 px-3 py-2 rounded-md border border-input bg-background text-sm resize-none" /></div>
            </>
          )}
        </div>

        {/* Size */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold">Size</label>
            <span className="text-sm font-black text-purple-500">{size}px</span>
          </div>
          <input type="range" min="128" max="512" step="32" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-purple-500" />
        </div>

        {/* QR preview */}
        <div className="flex flex-col items-center gap-4 p-6 rounded-xl border-2 border-purple-500/20 bg-purple-500/5">
          <canvas ref={canvasRef} className="rounded-lg bg-white p-2" />
          <Button onClick={download} className="bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:opacity-90">
            <Download className="h-4 w-4 mr-2" /> Download PNG
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}