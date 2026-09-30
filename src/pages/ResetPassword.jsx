import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock, Loader2, AlertCircle, CheckCircle2, Shield, Eye, EyeOff, Check, X } from "lucide-react"

export default function ResetPassword() {
  const navigate = useNavigate()
  const { updatePassword } = useAuth()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Password validation rules
  const rules = [
    { label: 'At least 8 characters', test: (p) => p.length >= 8 },
    { label: 'One uppercase letter (A-Z)', test: (p) => /[A-Z]/.test(p) },
    { label: 'One lowercase letter (a-z)', test: (p) => /[a-z]/.test(p) },
    { label: 'One number (0-9)', test: (p) => /[0-9]/.test(p) },
    { label: 'One special symbol (!@#$%...)', test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|<>?,./`~]/.test(p) },
  ]

  const allValid = rules.every(rule => rule.test(password))

  useEffect(() => {
    // Supabase sends a code in the URL hash; SDK picks it up automatically
    // No action needed — session is established when user lands here
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!allValid) {
      setError('Password does not meet all requirements.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const { error } = await updatePassword(password)
      if (error) throw error
      setSuccess(true)
      setTimeout(() => navigate('/auth'), 3000)
    } catch (err) {
      setError(err.message || 'Failed to reset password. The link may have expired.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
        <Card className="w-full max-w-md border-2 border-green-500/30 shadow-2xl">
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Password Updated!</h2>
            <p className="text-muted-foreground mb-4">
              Your password has been successfully reset. Redirecting to sign in...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/20 via-background to-secondary/20 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/30 rounded-full filter blur-3xl animate-pulse"></div>

      <Card className="w-full max-w-md border-2 border-primary/30 shadow-2xl backdrop-blur-lg bg-card/95 relative z-10">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 p-4 rounded-full bg-gradient-to-br from-primary to-secondary w-fit shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Set New Password
          </CardTitle>
          <CardDescription>Choose a strong password to secure your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-center gap-2 text-sm border border-red-200">
                <AlertCircle className="h-4 w-4 shrink-0" /> {error}
              </div>
            )}

            <div>
              <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
                <Lock className="h-4 w-4 text-muted-foreground" /> New Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter strong password"
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
                <Lock className="h-4 w-4 text-muted-foreground" /> Confirm Password
              </label>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="h-11"
              />
            </div>

            {/* Password strength checklist */}
            <div className="bg-muted/30 p-3 rounded-md">
              <p className="text-xs font-medium mb-2">Password must contain:</p>
              <ul className="space-y-1">
                {rules.map((rule, idx) => {
                  const valid = rule.test(password)
                  return (
                    <li key={idx} className="flex items-center gap-2 text-xs">
                      {valid ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <X className="h-3 w-3 text-muted-foreground" />
                      )}
                      <span className={valid ? 'text-green-600' : 'text-muted-foreground'}>
                        {rule.label}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            <Button
              type="submit"
              disabled={loading || !allValid}
              className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold shadow-lg disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}