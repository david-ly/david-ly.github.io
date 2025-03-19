import {useEffect, useState} from 'react'

const COLORS = ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta']

export default function ColorAccuracy() {
  const [cur_col, setCurColor] = useState(0)
  const nextColor = () => setCurColor((cur) => (cur + 1) % COLORS.length)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault()
        nextColor()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="w-full h-full select-none relative">
      <div
        className="w-full h-full flex items-center justify-center text-3xl font-bold cursor-pointer"
        style={{backgroundColor: COLORS[cur_col]}}
        onClick={nextColor}
        role="button"
        tabIndex={0}
        aria-label={`Current color: ${COLORS[cur_col]}. Click to change color`}
      >
        {COLORS[cur_col]}
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center text-lg">
        Click on the color or press <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">SPACE</kbd> to cycle through colors
      </div>
    </div>
  )
}
