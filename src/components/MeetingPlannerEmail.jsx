import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function MeetingPlannerEmail() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const sendInvite = () => {
    if (!email) return
    // Simulate sending email
    alert(`Invitation sent to ${email}`)
    setSent(true)
  }

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" /> Email Invite</CardTitle></CardHeader>
      <CardContent>
        <p className="text-sm mb-2">Send meeting invite to participants.</p>
        <div className="flex gap-2">
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email address" />
          <Button onClick={sendInvite}>Send</Button>
        </div>
        {sent && <p className="text-green-500 mt-2">Invite sent!</p>}
      </CardContent>
    </Card>
  )
}