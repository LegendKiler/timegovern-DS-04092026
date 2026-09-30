import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('timegovern_theme') || 'dark'
  })
  const [settings, setSettings] = useState(() => {
    return JSON.parse(localStorage.getItem('timegovern_settings')) || { timeFormat: '24h', language: 'en' }
  })
  const [location, setLocation] = useState(null)
  const [loadingLocation, setLoadingLocation] = useState(true)

  // Apply theme to <html> and save to localStorage
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('timegovern_theme', theme)
  }, [theme])

  // Save settings
  useEffect(() => {
    localStorage.setItem('timegovern_settings', JSON.stringify(settings))
  }, [settings])

  // Detect location on first load
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setLocation(data)
        setLoadingLocation(false)
      })
      .catch(() => setLoadingLocation(false))
  }, [])

  // Stable function references — prevents infinite loops
  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark')
  }, [])

  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }, [])

  const resetTheme = useCallback(() => {
    setThemeState('dark')
    localStorage.setItem('timegovern_theme', 'dark')
  }, [])

  return (
    <UserContext.Provider value={{
      theme, setTheme, toggleTheme, resetTheme,
      settings, updateSettings,
      location, loadingLocation,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)