import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useUser } from '../context/UserContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User, Mail, Lock, Crown, Bell, Palette, Globe, Clock, Shield, Trash2, Save, Loader2, CheckCircle2, AlertCircle, Download, Camera, Upload } from "lucide-react"

export default function SettingsPage() {
  const navigate = useNavigate()
  const { user, profile, updateProfile, updatePassword, updateEmail, uploadAvatar, downloadUserData, premiumTier } = useAuth()
  const { setTheme: applyTheme } = useUser()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [exportingData, setExportingData] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const fileInputRef = useRef(null)

  const [fullName, setFullName] = useState('')
  const [timezone, setTimezone] = useState('UTC')
  const [language, setLanguage] = useState('en')
  const [theme, setTheme] = useState('dark')
  const [timeFormat, setTimeFormat] = useState('24h')
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [flightNotifs, setFlightNotifs] = useState(true)
  const [newsletter, setNewsletter] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newEmail, setNewEmail] = useState('')

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '')
      setTimezone(profile.timezone || 'UTC')
      setLanguage(profile.language || 'en')
      setTheme(profile.theme || 'dark')
      setTimeFormat(profile.time_format || '24h')
      setEmailNotifs(profile.email_notifications ?? true)
      setFlightNotifs(profile.flight_notifications ?? true)
      setNewsletter(profile.newsletter_subscribed ?? false)
    }
  }, [profile])

  if (!user) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <Card className="text-center p-8">
          <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold mb-2">Please Sign In</h2>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </Card>
      </div>
    )
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 5000)
  }

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'User'
  const avatarUrl = profile?.avatar_url
  const initial = (displayName || 'U').charAt(0).toUpperCase()

  const handleAvatarClick = () => fileInputRef.current?.click()

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingAvatar(true)
    const { error } = await uploadAvatar(file)
    setUploadingAvatar(false)
    if (error) showMessage('error', 'Upload failed: ' + error.message)
    else showMessage('success', 'Avatar updated successfully!')
    e.target.value = ''
  }

  const handleDataExport = async () => {
    setExportingData(true)
    const { error } = await downloadUserData()
    setExportingData(false)
    if (error) showMessage('error', error.message)
    else showMessage('success', 'Your data has been downloaded as JSON')
  }

  const saveProfile = async () => {
    setLoading(true)
    const { error } = await updateProfile({ full_name: fullName })
    setLoading(false)
    if (error) showMessage('error', error.message)
    else showMessage('success', 'Profile updated Ã¢€\u201d check your name in the header')
  }

  const savePreferences = async () => {
    setLoading(true)
    const { error } = await updateProfile({ timezone, language, theme, time_format: timeFormat })
    setLoading(false)
    if (error) showMessage('error', error.message)
    else showMessage('success', 'Preferences saved')
  }

  const saveNotifications = async () => {
    setLoading(true)
    const { error } = await updateProfile({
      email_notifications: emailNotifs,
      flight_notifications: flightNotifs,
      newsletter_subscribed: newsletter
    })
    setLoading(false)
    if (error) showMessage('error', error.message)
    else showMessage('success', 'Notification preferences saved')
  }

  const changePassword = async () => {
    if (newPassword.length < 8) return showMessage('error', 'Password must be at least 8 characters')
    if (newPassword !== confirmPassword) return showMessage('error', 'Passwords do not match')
    setLoading(true)
    const { error } = await updatePassword(newPassword)
    setLoading(false)
    if (error) showMessage('error', error.message)
    else {
      showMessage('success', 'Password updated successfully')
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  const changeEmail = async () => {
    if (!newEmail || !newEmail.includes('@')) return showMessage('error', 'Please enter a valid email')
    setLoading(true)
    const { error } = await updateEmail(newEmail)
    setLoading(false)
    if (error) showMessage('error', error.message)
    else {
      showMessage('success', 'Confirmation email sent. Please verify.')
      setNewEmail('')
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account & Security', icon: Shield },
    { id: 'subscription', label: 'Subscription', icon: Crown },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'danger', label: 'Danger Zone', icon: Trash2 },
  ]

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Premium Profile Banner */}
      <Card className="mb-6 overflow-hidden border-0 shadow-xl">
        <div className="h-32 bg-gradient-to-br from-primary via-secondary to-primary relative">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 30%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        <CardContent className="relative pt-0 pb-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 -mt-16 md:-mt-12">
            <div className="relative group">
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-background shadow-xl bg-muted" />
              ) : (
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-4xl font-bold border-4 border-background shadow-xl">
                  {initial}
                </div>
              )}
              <button
                onClick={handleAvatarClick}
                disabled={uploadingAvatar}
                className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer disabled:cursor-wait px-4 text-center"
              >
                {uploadingAvatar ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    <Camera className="h-6 w-6 mb-1" />
                    <span className="text-[10px] font-medium leading-tight">JPG, PNG, WEBP<br/>Max 5 MB</span>
                  </>
                )}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </div>

            <div className="flex-1 text-center md:text-left pb-2">
              <h1 className="text-2xl font-bold">{displayName}</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <span className={'inline-block mt-2 text-[10px] font-bold px-3 py-1 rounded-full ' + (premiumTier === 'free' ? 'bg-muted text-muted-foreground' : 'bg-gradient-to-r from-amber-500 to-yellow-400 text-white')}>
                {premiumTier.toUpperCase()} PLAN
              </span>
            </div>

            <div className="pb-2 flex flex-col items-center md:items-end gap-2">
              <Button variant="outline" onClick={handleAvatarClick} disabled={uploadingAvatar}>
                {uploadingAvatar ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                {uploadingAvatar ? 'Uploading...' : 'Change Photo'}
              </Button>
              
            </div>
          </div>
        </CardContent>
      </Card>

      {message.text && (
        <div className={'mb-4 p-3 rounded-md flex items-center gap-2 text-sm border ' + (message.type === 'error' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-700 border-green-200')}>
          {message.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
          <Card className="p-2 sticky top-20">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all ' + (activeTab === tab.id ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md' : 'hover:bg-muted')}
              >
                <tab.icon className="h-4 w-4" /> {tab.label}
              </button>
            ))}
          </Card>
        </aside>

        <div className="md:col-span-3 space-y-4">
          {activeTab === 'profile' && (
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Full Name</label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g., Nadeem Khan" className="h-11" />
                  <p className="text-xs text-muted-foreground mt-1">This name appears on your profile and in the header</p>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Email Address</label>
                  <Input value={user.email} disabled className="h-11 bg-muted/50" />
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-3 text-xs text-blue-700 dark:text-blue-300">
                  <p className="font-semibold mb-1">Profile Photo</p>
                  <p>JPG, PNG, WEBP or GIF. Max 5 MB. Square image, 400x400 px or larger recommended.</p>
                </div>
                <Button onClick={saveProfile} disabled={loading} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'account' && (
            <>
              <Card className="border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5 text-primary" /> Change Password</CardTitle>
                  <CardDescription>Use a strong password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password (min 8 chars)" className="h-11" />
                  <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" className="h-11" />
                  <Button onClick={changePassword} disabled={loading || !newPassword} className="bg-gradient-to-r from-primary to-secondary text-white">Update Password</Button>
                </CardContent>
              </Card>

              <Card className="border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5 text-primary" /> Change Email</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="newemail@example.com" className="h-11" />
                  <Button onClick={changeEmail} disabled={loading || !newEmail} className="bg-gradient-to-r from-primary to-secondary text-white">Update Email</Button>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'subscription' && (
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Crown className="h-5 w-5 text-amber-500" /> Subscription & Billing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 border border-border rounded-xl p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Current Plan</p>
                  <p className="text-3xl font-bold mt-1">{premiumTier === 'free' ? 'Free' : premiumTier === 'pro' ? 'Pro' : 'Premium'}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {premiumTier === 'free' ? 'AU$0 / forever' : premiumTier === 'pro' ? 'AU$4.99 / month' : 'AU$9.99 / month'}
                  </p>
                </div>
                {premiumTier === 'free' ? (
                  <Button onClick={() => navigate('/pricing')} className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:opacity-90 text-white h-11">
                    <Crown className="h-4 w-4 mr-2" /> View Upgrade Plans
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full h-11">Manage Billing via Stripe</Button>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === 'preferences' && (
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5 text-primary" /> Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <label className="text-sm font-semibold mb-2 flex items-center gap-2"><Globe className="h-4 w-4" /> Timezone</label>
                  <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground h-11">
                    <option value="UTC">UTC</option>
                    <option value="Australia/Melbourne">Australia/Melbourne</option>
                    <option value="Australia/Sydney">Australia/Sydney</option>
                    <option value="America/New_York">America/New_York</option>
                    <option value="Europe/London">Europe/London</option>
                    <option value="Asia/Tokyo">Asia/Tokyo</option>
                    <option value="Asia/Singapore">Asia/Singapore</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Language</label>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground h-11">
                    <option value="en">English</option>
                    <option value="fr">FranÃƒ§ais</option>
                    <option value="de">Deutsch</option>
                    <option value="es">EspaÃƒ±ol</option>
                    <option value="hi">\u00e0¤¹\u00e0¤¿\u00e0¤¨\u00e0¥\u00e0¤¦\u00e0¥€</option>
                    <option value="ur">Ã˜§Ã˜±Ã˜¯Ã™Ë†</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 flex items-center gap-2"><Clock className="h-4 w-4" /> Time Format</label>
                  <select value={timeFormat} onChange={(e) => setTimeFormat(e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground h-11">
                    <option value="24h">24-hour (14:30)</option>
                    <option value="12h">12-hour (2:30 PM)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Theme</label>
                  <select value={theme} onChange={(e) => { setTheme(e.target.value); applyTheme(e.target.value) }} className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground h-11">
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="system">System</option>
                  </select>
                </div>
                <Button onClick={savePreferences} disabled={loading} className="bg-gradient-to-r from-primary to-secondary text-white">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-primary" /> Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
                  <div>
                    <p className="font-medium text-sm">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Account and security updates</p>
                  </div>
                  <input type="checkbox" checked={emailNotifs} onChange={(e) => setEmailNotifs(e.target.checked)} className="h-5 w-5 accent-primary" />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
                  <div>
                    <p className="font-medium text-sm">Flight Alerts</p>
                    <p className="text-xs text-muted-foreground">Delays, gate changes, and status</p>
                  </div>
                  <input type="checkbox" checked={flightNotifs} onChange={(e) => setFlightNotifs(e.target.checked)} className="h-5 w-5 accent-primary" />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
                  <div>
                    <p className="font-medium text-sm">Newsletter</p>
                    <p className="text-xs text-muted-foreground">Weekly time & astronomy digest</p>
                  </div>
                  <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} className="h-5 w-5 accent-primary" />
                </div>
                <Button onClick={saveNotifications} disabled={loading} className="bg-gradient-to-r from-primary to-secondary text-white">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Notifications
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'danger' && (
            <>
              <Card className="border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Download className="h-5 w-5 text-primary" /> Download Your Data</CardTitle>
                  <CardDescription>Export everything stored on your account as JSON (GDPR / Privacy Act compliant)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Includes: account details, profile, flight searches, saved events, custom clocks, and preferences.
                  </p>
                  <Button onClick={handleDataExport} disabled={exportingData} className="bg-gradient-to-r from-primary to-secondary text-white">
                    {exportingData ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Download className="h-4 w-4 mr-2" />}
                    {exportingData ? 'Preparing...' : 'Download My Data (JSON)'}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-red-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600"><Trash2 className="h-5 w-5" /> Delete Account</CardTitle>
                  <CardDescription>Once deleted, your account cannot be recovered</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    This will permanently delete your account, saved flights, preferences, and subscription. This action cannot be undone.
                  </p>
                  <Button variant="destructive" onClick={() => showMessage('error', 'Please contact support@timegovern.com to delete your account')} className="h-11">
                    Delete My Account
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}