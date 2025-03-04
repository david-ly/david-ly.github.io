"use client"

import { useState, useEffect } from "react"

const patterns = [
  { background: "white", crosshatchColor: "black" },
  { background: "black", crosshatchColor: "white" },
  { background: "red", crosshatchColor: "cyan" },
  { background: "green", crosshatchColor: "magenta" },
  { background: "blue", crosshatchColor: "yellow" },
]

export default function DeadPixelTest() {
  const [currentPattern, setCurrentPattern] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPattern((prev) => (prev + 1) % patterns.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const { background, crosshatchColor } = patterns[currentPattern]

  return (
    <div className="w-full h-full relative">
      <div
        className="w-full h-full absolute"
        style={{
          backgroundColor: background,
          backgroundImage: `
            linear-gradient(45deg, ${crosshatchColor} 25%, transparent 25%, transparent 75%, ${crosshatchColor} 75%, ${crosshatchColor}),
            linear-gradient(45deg, ${crosshatchColor} 25%, transparent 25%, transparent 75%, ${crosshatchColor} 75%, ${crosshatchColor})
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      />
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
        Background: {background}, Crosshatch: {crosshatchColor}
      </div>
    </div>
  )
}

