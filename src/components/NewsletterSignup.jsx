import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = () => {
    if (!email) return
    alert('Subscribed to newsletter!')
    setSubscribed(true)
  }

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" /> Newsletter</CardTitle></CardHeader>
      <CardContent>
        <p className="text-sm mb-2">Get updates and time tips.</p>
        <div className="flex gap-2">
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
          <Button onClick={subscribe}>Subscribe</Button>
        </div>
        {subscribed && <p className="text-green-500 mt-2">Thanks for subscribing!</p>}
      </CardContent>
    </Card>
  )
}