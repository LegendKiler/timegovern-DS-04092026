// src/hooks/useIframeSize.js
// Detects the size of the containing iframe (or viewport, if not iframed).
// Returns { size, width, height } where size is 'xs' | 'sm' | 'md' | 'lg'.
// Also posts the current height to the parent window for auto-resizing iframes.

import { useEffect, useState } from 'react'

function computeSize(w) {
  if (w < 360) return 'xs'
  if (w < 520) return 'sm'
  if (w < 720) return 'md'
  return 'lg'
}

export default function useIframeSize() {
  const [state, setState] = useState({ size: 'md', width: 720, height: 400 })

  useEffect(() => {
    if (typeof window === 'undefined') return

    function measure() {
      const w = window.innerWidth
      const h = document.body ? document.body.scrollHeight : 0
      setState({ size: computeSize(w), width: w, height: h })
    }

    measure()

    let ro
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure)
      if (document.documentElement) ro.observe(document.documentElement)
      if (document.body) ro.observe(document.body)
    }
    window.addEventListener('resize', measure)
    window.addEventListener('orientationchange', measure)

    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('orientationchange', measure)
    }
  }, [])

  // Report height to parent window so embed hosts can auto-resize their iframe
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.parent === window) return
    try {
      window.parent.postMessage(
        { type: 'tg-embed-height', height: state.height },
        '*'
      )
    } catch {}
  }, [state.height])

  return state
}