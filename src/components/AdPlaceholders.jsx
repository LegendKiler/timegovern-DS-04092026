import { useUser } from '../context/UserContext'

export default function AdPlaceholders({ type }) {
  const { premium } = useUser()
  if (premium) return null

  if (type === 'top') {
    return (
      <div className="w-full h-24 bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center text-muted-foreground mb-6">
        Advertisement (728x90)
      </div>
    )
  }
  return (
    <div className="w-full h-64 bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center text-muted-foreground mb-6">
      Advertisement (300x250)
    </div>
  )
}
