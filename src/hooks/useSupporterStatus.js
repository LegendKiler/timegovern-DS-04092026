import { useState, useEffect } from 'react'

// Tier limits
export const TIER_LIMITS = {
  free: 12,
  supporter: 50
}

// Reads supporter status from:
//   1. URL param ?supporter=1 (for demo / testing)
//   2. localStorage key timegovern_supporter (persisted)
//   3. Default: free
//
// REPLACE THIS WITH REAL AUTH LATER:
//   - Real implementation should read from your auth context (UserContext)
//   - Example: const { profile } = useAuth(); const tier = profile?.tier || 'free'

const STORAGE_KEY = 'timegovern_supporter'

function readStatus() {
  try {
    // URL param wins (demo mode)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('supporter') === '1') {
        localStorage.setItem(STORAGE_KEY, 'supporter')
        return 'supporter'
      }
      if (params.get('supporter') === '0') {
        localStorage.removeItem(STORAGE_KEY)
        return 'free'
      }
      // localStorage fallback
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'supporter') return 'supporter'
    }
  } catch {}
  return 'free'
}

export function useSupporterStatus() {
  const [tier, setTier] = useState(readStatus)

  useEffect(() => {
    setTier(readStatus())
  }, [])

  // Manual toggles (for dev use)
  const setSupporter = (v) => {
    try {
      if (v) localStorage.setItem(STORAGE_KEY, 'supporter')
      else localStorage.removeItem(STORAGE_KEY)
    } catch {}
    setTier(v ? 'supporter' : 'free')
  }

  return {
    tier,
    isSupporter: tier === 'supporter',
    limit: TIER_LIMITS[tier] || TIER_LIMITS.free,
    setSupporter
  }
}