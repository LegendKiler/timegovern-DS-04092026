import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUser } from '../context/UserContext'

export default function PremiumPage() {
  const { user } = useUser()
  const isPremium = user?.premium

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <Card>
        <CardHeader><CardTitle>Premium Membership</CardTitle></CardHeader>
        <CardContent>
          {isPremium ? (
            <p>You are a premium member!</p>
          ) : (
            <div>
              <p>Upgrade to premium for ad-free experience, advanced tools, and more.</p>
              <Button className="mt-4" onClick={() => alert('Payment simulation - would integrate Stripe here')}>Upgrade Now</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}