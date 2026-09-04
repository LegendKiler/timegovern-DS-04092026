import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })
  const [location, setLocation] = useState(null)
  const [loadingLocation, setLoadingLocation] = useState(true)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setLocation(data)
        setLoadingLocation(false)
      })
      .catch(() => setLoadingLocation(false))
  }, [])

  return (
    <UserContext.Provider value={{ theme, setTheme, location, loadingLocation }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)