import { useUser } from '../context/UserContext'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-md dark:bg-gray-800">
      <div className="container mx-auto flex items-center justify-between p-4">
        <a href="/" className="text-2xl font-bold text-primary">
          time<span className="text-blue-600">govern</span>
        </a>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-4">
            <a href="#clocks" className="hover:text-primary">Clocks</a>
            <a href="#calendar" className="hover:text-primary">Calendar</a>
            <a href="#business" className="hover:text-primary">Calculators</a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}