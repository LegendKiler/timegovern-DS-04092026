import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// ============================================================
// SCROLL TO TOP — Resets scroll position on route change
// Standard solution for React Router v6
// Without this, navigating from a long page keeps the scroll position,
// making the new page appear to "open at the bottom"
// ============================================================
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Instant scroll (not smooth) for perceived performance
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}