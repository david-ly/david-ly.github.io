import { useState, useEffect } from "react"

const colors = ["red", "green", "blue", "white", "black", "yellow", "cyan", "magenta"]

export default function ColorAccuracy() {
  const [currentColor, setCurrentColor] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentColor((prev) => (prev + 1) % colors.length)
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="w-full h-full flex items-center justify-center text-3xl font-bold"
      style={{ backgroundColor: colors[currentColor] }}
    >
      {colors[currentColor]}
    </div>
  )
}

