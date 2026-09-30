import { Component } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

// Catches two failure modes:
//   1. Chunk load failure (stale tab after deploy) → forces full reload
//   2. Any render error inside a lazy route → shows friendly retry UI
export default class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    const isChunkError =
      error?.name === 'ChunkLoadError' ||
      /Loading chunk .* failed/i.test(error?.message || '') ||
      /Failed to fetch dynamically imported module/i.test(error?.message || '')

    if (isChunkError) {
      // Auto-reload once to fetch fresh chunks
      try {
        const key = 'timegovern_chunk_reload'
        const last = Number(sessionStorage.getItem(key) || 0)
        if (Date.now() - last > 10000) {
          sessionStorage.setItem(key, String(Date.now()))
          window.location.reload()
          return
        }
      } catch {}
    }

    // Log to console for dev awareness
    // eslint-disable-next-line no-console
    console.error('RouteErrorBoundary caught:', error, info)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="text-center max-w-md">
            <div className="inline-flex p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-4">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
            </div>
            <h1 className="text-xl font-black mb-2">Something went wrong</h1>
            <p className="text-sm text-muted-foreground mb-5">
              {this.state.error?.message || 'An unexpected error occurred while loading this page.'}
            </p>
            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition"
            >
              <RefreshCw className="h-4 w-4" />
              Reload page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}