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
        className="w-full h-full flex items-center justify-center text-black text-3xl font-bold cursor-pointer"
        style={{backgroundColor: COLORS[cur_col]}}
        onClick={nextColor}
        role="button"
        tabIndex={0}
        aria-label={`Current color: ${COLORS[cur_col]}. Click to change color`}
      >
        {COLORS[cur_col]}
      </div>
    </div>
  )
}
