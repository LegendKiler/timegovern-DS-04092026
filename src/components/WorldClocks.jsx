import { useState, useEffect } from 'react'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, GripVertical, X, Pencil } from "lucide-react"

// Default groups with labels
const defaultGroups = {
  'Americas': [
    { tz: 'America/New_York', label: 'New York' },
    { tz: 'America/Los_Angeles', label: 'Los Angeles' },
    { tz: 'America/Sao_Paulo', label: 'São Paulo' },
  ],
  'Europe': [
    { tz: 'Europe/London', label: 'London' },
    { tz: 'Europe/Paris', label: 'Paris' },
    { tz: 'Europe/Berlin', label: 'Berlin' },
  ],
  'Asia': [
    { tz: 'Asia/Tokyo', label: 'Tokyo' },
    { tz: 'Asia/Dubai', label: 'Dubai' },
    { tz: 'Asia/Singapore', label: 'Singapore' },
  ],
  'Pacific': [
    { tz: 'Australia/Sydney', label: 'Sydney' },
    { tz: 'Pacific/Auckland', label: 'Auckland' },
  ],
}

// Sortable item with rename support
function SortableItem({ id, item, onRemove, onRename }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="flex items-center justify-between bg-muted/30 rounded p-2 hover:bg-muted/50 transition-colors">
      <span {...attributes} {...listeners} className="cursor-move text-muted-foreground">
        <GripVertical className="h-4 w-4" />
      </span>
      <span className="flex-1 ml-2 font-medium">{item.label || item.tz}</span>
      <span className="font-mono text-sm mr-2">
        {new Date().toLocaleTimeString('en-US', { timeZone: item.tz, hour: '2-digit', minute: '2-digit', hour12: false })}
      </span>
      <button onClick={() => onRename(item.tz)} className="text-blue-500 hover:bg-blue-500/10 rounded p-1 mr-1">
        <Pencil className="h-3 w-3" />
      </button>
      <button onClick={() => onRemove(item.tz)} className="text-red-500 hover:bg-red-500/10 rounded p-1">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export default function WorldClocks() {
  const [groups, setGroups] = useState(defaultGroups)
  const [activeGroup, setActiveGroup] = useState('Americas')
  const [clocks, setClocks] = useState(groups[activeGroup])
  const sensors = useSensors(useSensor(PointerSensor))

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('timegovern_worldclocks_groups')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === 'object') {
          setGroups(parsed)
          setClocks(parsed[activeGroup] || [])
        }
      } catch {}
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('timegovern_worldclocks_groups', JSON.stringify(groups))
  }, [groups])

  const switchGroup = (groupName) => {
    setActiveGroup(groupName)
    setClocks(groups[groupName] || [])
  }

  const removeClock = (tz) => {
    const newGroup = groups[activeGroup].filter(item => item.tz !== tz)
    setGroups({ ...groups, [activeGroup]: newGroup })
    setClocks(newGroup)
  }

  const renameClock = (tz) => {
    const newLabel = prompt(`Enter a new name for ${tz}:`, tz)
    if (newLabel === null || newLabel.trim() === '') return
    const newGroup = groups[activeGroup].map(item =>
      item.tz === tz ? { ...item, label: newLabel.trim() } : item
    )
    setGroups({ ...groups, [activeGroup]: newGroup })
    setClocks(newGroup)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = clocks.findIndex(item => item.tz === active.id)
      const newIndex = clocks.findIndex(item => item.tz === over.id)
      const newClocks = arrayMove(clocks, oldIndex, newIndex)
      setClocks(newClocks)
      setGroups({ ...groups, [activeGroup]: newClocks })
    }
  }

  const addClock = (tz) => {
    if (!groups[activeGroup].some(item => item.tz === tz)) {
      const newItem = { tz, label: tz.replace(/_/g, ' ') }
      const newGroup = [...groups[activeGroup], newItem]
      setGroups({ ...groups, [activeGroup]: newGroup })
      setClocks(newGroup)
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5" /> World Clocks</CardTitle>
        <div className="flex gap-2 mt-2 flex-wrap">
          {Object.keys(groups).map(group => (
            <button
              key={group}
              onClick={() => switchGroup(group)}
              className={`px-3 py-1 rounded-full text-sm ${activeGroup === group ? 'bg-primary text-white' : 'bg-muted'}`}
            >
              {group}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={clocks.map(item => item.tz)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {clocks.map(item => (
                <SortableItem
                  key={item.tz}
                  id={item.tz}
                  item={item}
                  onRemove={removeClock}
                  onRename={renameClock}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <div className="mt-4">
          <select
            onChange={(e) => e.target.value && addClock(e.target.value)}
            className="w-full p-2 border rounded bg-background text-foreground"
            defaultValue=""
          >
            <option value="" disabled>Add timezone...</option>
            {Intl.supportedValuesOf('timeZone').map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
  )
}
