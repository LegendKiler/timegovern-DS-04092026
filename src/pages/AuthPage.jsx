import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Lock, Loader2, AlertCircle, CheckCircle2, Crown, Sparkles, Zap, Shield, Eye, EyeOff, Check, X } from "lucide-react"

export default function AuthPage() {
  const navigate = useNavigate()
  const { signIn, signUp, resetPassword } = useAuth()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const rules = [
    { label: 'At least 8 characters', test: (p) => p.length >= 8 },
    { label: 'One uppercase letter (A-Z)', test: (p) => /[A-Z]/.test(p) },
    { label: 'One lowercase letter (a-z)', test: (p) => /[a-z]/.test(p) },
    { label: 'One number (0-9)', test: (p) => /[0-9]/.test(p) },
    { label: 'One special symbol (!@#$%...)', test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|<>?,./`~]/.test(p) },
  ]
  const allValid = rules.every(rule => rule.test(password))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password)
        if (error) throw error
        navigate('/')
      } else if (mode === 'signup') {
        if (!allValid) throw new Error('Password does not meet all requirements.')
        if (password !== confirmPassword) throw new Error('Passwords do not match.')
        const { error } = await signUp(email, password)
        if (error) throw error
        setSuccess('Account created! Check your email to verify your account.')
        setTimeout(() => navigate('/'), 3000)
      } else if (mode === 'reset') {
        const { error } = await resetPassword(email)
        if (error) throw error
        setSuccess('Password reset link sent to your email. Check your inbox.')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/20 via-background to-secondary/20 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/30 rounded-full filter blur-3xl animate-pulse"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
            <Crown className="h-3 w-3" /> PREMIUM ACCESS
          </div>
        </div>

        <Card className="border-2 border-primary/30 shadow-2xl backdrop-blur-lg bg-card/95">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-3 p-4 rounded-full bg-gradient-to-br from-primary to-secondary w-fit shadow-lg">
              {mode === 'reset' ? <Shield className="h-8 w-8 text-white" /> : mode === 'signup' ? <Sparkles className="h-8 w-8 text-white" /> : <Zap className="h-8 w-8 text-white" />}
            </div>
            <CardTitle className="text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
            </CardTitle>
            <CardDescription>
              {mode === 'login' ? 'Sign in to access your premium features' :
               mode === 'signup' ? 'Join TimeGovern and unlock worldwide tools' :
               'Enter your email to receive a reset link'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-center gap-2 text-sm border border-red-200">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 text-green-700 p-3 rounded-md flex items-center gap-2 text-sm border border-green-200">
                  <CheckCircle2 className="h-4 w-4 shrink-0" /> {success}
                </div>
              )}

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
                  <Mail className="h-4 w-4 text-muted-foreground" /> Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="h-11"
                />
              </div>

              {mode !== 'reset' && (
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
                    <Lock className="h-4 w-4 text-muted-foreground" /> Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
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
              )}

              {mode === 'signup' && (
                <>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p className="text-xs font-medium mb-2">Password must contain:</p>
                    <ul className="space-y-1">
                      {rules.map((rule, idx) => {
                        const valid = rule.test(password)
                        return (
                          <li key={idx} className="flex items-center gap-2 text-xs">
                            {valid ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-muted-foreground" />}
                            <span className={valid ? 'text-green-600' : 'text-muted-foreground'}>{rule.label}</span>
                          </li>
                        )
                      })}
                    </ul>
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
                      required
                      className="h-11"
                    />
                  </div>
                </>
              )}

              <Button
                type="submit"
                disabled={loading || (mode === 'signup' && !allValid)}
                className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold shadow-lg disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {loading ? 'Please wait...' :
                 mode === 'login' ? 'Sign In' :
                 mode === 'signup' ? 'Create Account' :
                 'Send Reset Link'}
              </Button>
            </form>

            <div className="mt-6 space-y-2 text-center text-sm">
              {mode === 'login' && (
                <>
                  <p className="text-muted-foreground">
                    Don't have an account?{' '}
                    <button onClick={() => { setMode('signup'); setError(''); setSuccess('') }} className="text-primary hover:underline font-medium">
                      Sign up free
                    </button>
                  </p>
                  <p>
                    <button onClick={() => { setMode('reset'); setError(''); setSuccess('') }} className="text-muted-foreground hover:text-primary hover:underline text-xs">
                      Forgot password?
                    </button>
                  </p>
                </>
              )}
              {mode === 'signup' && (
                <p className="text-muted-foreground">
                  Already have an account?{' '}
                  <button onClick={() => { setMode('login'); setError(''); setSuccess('') }} className="text-primary hover:underline font-medium">
                    Sign in
                  </button>
                </p>
              )}
              {mode === 'reset' && (
                <p>
                  <button onClick={() => { setMode('login'); setError(''); setSuccess('') }} className="text-primary hover:underline text-sm">
                    ← Back to sign in
                  </button>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  )
}