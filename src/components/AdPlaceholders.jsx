export default function AdPlaceholders({ type }) {
  if (type === 'top') {
    return (
      <div className="w-full h-24 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 mb-6">
        Advertisement (728x90)
      </div>
    )
  }
  return (
    <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400">
      Advertisement (300x250)
    </div>
  )
}