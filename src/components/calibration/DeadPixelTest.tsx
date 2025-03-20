import {useEffect, useState} from 'react'
import {INTERVAL} from '../../config.ts'

const patterns = [
  {background: 'white', crosshatch: 'black'}
, {background: 'black', crosshatch: 'white'}
, {background: 'red', crosshatch: 'cyan'}
, {background: 'green', crosshatch: 'magenta'}
, {background: 'blue', crosshatch: 'yellow'}
]

export default function DeadPixelTest() {
  const [cur_pattern, setCurrentPattern] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPattern((prev) => (prev + 1) % patterns.length)
    }, INTERVAL)

    return () => clearInterval(timer)
  }, [])

  const {background, crosshatch} = patterns[cur_pattern]
  return (
    <div className="w-full h-full relative">
      <div
        className="w-full h-full absolute"
        style={{
          backgroundColor: background
        , backgroundImage: `
            linear-gradient(45deg, ${crosshatch} 25%, transparent 25%, transparent 75%, ${crosshatch} 75%, ${crosshatch}),
            linear-gradient(45deg, ${crosshatch} 25%, transparent 25%, transparent 75%, ${crosshatch} 75%, ${crosshatch})
          `
        , backgroundSize: '20px 20px'
        , backgroundPosition: '0 0, 10px 10px'
        }}
      />
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
        Background: {background}, Crosshatch: {crosshatch}
      </div>
    </div>
  )
}
