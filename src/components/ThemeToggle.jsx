import { useUser } from '../context/UserContext'
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUser()
  const isDark = theme === 'dark'
  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
