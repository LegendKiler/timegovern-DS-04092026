import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from "@/components/ui/input"

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/?q=${encodeURIComponent(query)}`)
      setQuery('')
    }
  }

  return (
    <div className="hidden md:block w-64">
      <Input placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleSearch} />
    </div>
  )
}